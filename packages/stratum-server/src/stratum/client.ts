import { Buffer } from "node:buffer";
import { EventEmitter } from "node:events";
import net from "node:net";
import tls from "node:tls";
import { AuthorizeFn, Banning, ClientHandleSubmit, JobParams } from "../types";
import { algorithms } from "../algorithms";
import type { Algorithm } from "../algorithms/types";

type Options = {
  coin: any;
  subscriptionId: string;
  authorizeFn: AuthorizeFn;
  socket: tls.TLSSocket | net.Socket;
  banning?: Banning;
  connectionTimeout: number;
  tcpProxyProtocol: boolean;
};

type Shares = {
  valid: number;
  invalid: number;
};

type Username = string;
type Password = string;

type HandleAuthorize = {
  id: number;
  params: [Username, Password];
};

export class StratumClient extends EventEmitter {
  authorized: boolean = false;
  difficulty: number = 8;
  extraNonce1: string | null = null;
  lastActivity: number = Date.now();
  private _options: Options;
  private _algorithm: Algorithm;
  pendingDifficulty: number | null = null;
  previousDifficulty: number | null = null;
  remoteAddress: string;
  requestedSubscriptionBeforeAuth: boolean = false;
  socket: tls.TLSSocket | net.Socket;
  shares: Shares = {
    valid: 0,
    invalid: 0,
  };
  version: string | number | null = null;
  workerName: string = "";
  workerPass: string = "";

  constructor(options: Options) {
    super();
    this._options = options;
    this._algorithm = algorithms[options.coin.algorithm] as Algorithm;

    this.socket = options.socket;
    this.remoteAddress = options.socket.remoteAddress!;
  }

  init() {
    this.setupSocket();
  }

  considerBan(shareValid: boolean): boolean {
    if (shareValid === true) {
      this.shares.valid++;
    } else {
      this.shares.invalid++;
    }

    let totalShares = this.shares.valid + this.shares.invalid;

    if (
      this._options.banning &&
      totalShares >= this._options.banning.checkThreshold
    ) {
      let percentBad = (this.shares.invalid / totalShares) * 100;
      if (percentBad < this._options.banning.invalidPercent) {
        this.shares = { valid: 0, invalid: 0 };
      } else {
        this.emit(
          "triggerBan",
          this.shares.invalid +
            " out of the last " +
            totalShares +
            " shares were invalid"
        );
        this.socket.destroy();
        return true;
      }
    }
    return false;
  }

  handleMessage(message: any) {
    switch (message.method) {
      case "mining.subscribe":
        this.handleSubscribe(message);
        break;
      case "mining.authorize":
        this.handleAuthorize(message);
        break;
      case "mining.submit":
        this.lastActivity = Date.now();
        this.handleSubmit(message);
        break;
      case "mining.get_transactions":
        this.sendJson({
          id: null,
          result: [],
          error: true,
        });
        break;
      case "mining.extranonce.subscribe":
        this.sendJson({
          id: message.id,
          result: false,
          error: [20, "Not supported.", null],
        });
        break;
      case "mining.eth_submitHashrate":
      case "eth_submitHashrate":
        this.handleEthSubmitHashrate(message);
        break;
      case "mining.hashrate":
      case "hashrate":
        this.handleHashrate(message);
        break;
      default:
        this.emit("unknownStratumMethod", message);
        break;
    }
  }

  handleEthSubmitHashrate(message: {
    id: number;
    method: "eth_submitHashrate" | "mining.eth_submitHashrate";
    params: [string, string];
    jsonrpc: "2.0";
  }) {
    console.log("handleEthSubmitHashrate message", message);
  }

  handleHashrate(message: any) {
    console.log("handleHashrate message", message);
  }

  handleSubscribe(message: any) {
    if (!this.authorized) {
      this.requestedSubscriptionBeforeAuth = true;
    }
    this.emit(
      "subscription",
      {},
      // @ts-ignore
      (error: Error, extraNonce0?: string, extraNonce1: string) => {
        if (error) {
          this.sendJson({
            id: message.id,
            result: null,
            error: error,
          });
          return;
        }
        this.extraNonce1 = extraNonce1;

        this.sendJson({
          id: message.id,
          result: [null, extraNonce1],
          error: null,
        });
      }
    );
  }

  getSafeString(s: number | string) {
    return s.toString().replace(/[^a-zA-Z0-9._]+/g, "");
  }

  getSafeWorkerString(raw: string): string {
    let s = this.getSafeString(raw).split(".");
    let addr = s[0];
    let wname = s[1] ?? "noname";
    return addr + "." + wname;
  }

  handleAuthorize(message: HandleAuthorize) {
    this.workerName = this.getSafeWorkerString(message.params[0]);
    this.workerPass = message.params[1];
    const publicAddress = this.workerName.split(".")[0];
    if (!publicAddress) {
      throw new Error("missing worker name");
    }

    this._options.authorizeFn(
      this.remoteAddress,
      this.socket.localPort,
      publicAddress,
      this.workerPass,
      this.extraNonce1,
      this.version,
      ({ error, authorized, disconnect }) => {
        this.authorized = !error && authorized;
        this.sendJson({
          id: message.id,
          result: this.authorized,
          error: error,
        });
        this.emit("authorization", {
          authorized: this.authorized,
          remoteAddress: this.remoteAddress,
          localPort: this.socket.localPort,
          publicAddress,
          workerPass: this.workerPass,
          extraNonce1: this.extraNonce1,
          version: this.version,
        });
        if (disconnect === true) {
          this.socket.destroy();
        }
      }
    );
  }

  handleSubmit(message: ClientHandleSubmit) {
    if (!this.workerName) {
      if (!message.params[0]) {
        throw new Error("missing worker name");
      }
      this.workerName = this.getSafeWorkerString(message.params[0]);
    }
    if (this.authorized === false) {
      this.sendJson({
        id: message.id,
        result: null,
        error: [24, "unauthorized worker", null],
      });
      this.considerBan(false);
      return;
    }
    if (!this.extraNonce1) {
      this.sendJson({
        id: message.id,
        result: null,
        error: [25, "not subscribed", null],
      });
      this.considerBan(false);
      return;
    }
    this.emit(
      "submit",
      {
        workerName: this.workerName,
        jobId: message.params[1],
        extraNonce2: message.params[2]!.substr(2),
        nTime: message.params[3]!.substr(2),
        nOnce: message.params[4]!.substr(2),
      },
      (error: Error, result: any) => {
        this.sendJson({
          id: message.id,
          result: result,
          error: error,
        });
      }
    );
  }

  sendJson(...params: any) {
    let response = "";
    for (let i = 0; i < params.length; i++) {
      response += JSON.stringify(params[i]) + "\n";
    }
    this.socket.write(response);
  }

  setupSocket(): void {
    let dataBuffer = "";

    this.socket.setEncoding("utf8");
    if (this._options.tcpProxyProtocol === true) {
      this.socket.once("data", (d: string) => {
        if (d.indexOf("PROXY") === 0) {
          this.remoteAddress = d.split(" ")[2]!;
        } else {
          this.emit("tcpProxyError", d);
        }
        this.emit("checkBan");
      });
    } else {
      this.emit("checkBan");
    }
    this.socket.on("data", (d: string) => {
      dataBuffer += d;
      if (Buffer.byteLength(dataBuffer, "utf8") > 10240) {
        dataBuffer = "";
        this.emit("socketFlooded");
        this.socket.destroy();
        return;
      }
      if (dataBuffer.indexOf("\n") !== -1) {
        let messages: string[] = dataBuffer.split("\n");
        let incomplete: string =
          dataBuffer.slice(-1) === "\n" ? "" : messages.pop()!;
        messages.forEach((message) => {
          if (message.length < 1) return;
          let messageJson;
          try {
            messageJson = JSON.parse(message);
          } catch (e) {
            if (
              this._options.tcpProxyProtocol !== true ||
              d.indexOf("PROXY") !== 0
            ) {
              this.emit("malformedMessage", message);
              this.socket.destroy();
            }
            return;
          }
          if (messageJson) {
            this.handleMessage(messageJson);
          }
        });
        dataBuffer = incomplete;
      }
    });
    this.socket.on("close", () => {
      this.emit("socketDisconnect");
    });
    this.socket.on("error", (err) => {
      if (err.code !== "ECONNRESET") {
        this.emit("socketError", err);
      }
    });
  }

  getLabel(): string {
    return (
      (this.workerName || "(unauthorized)") + " [" + this.remoteAddress + "]"
    );
  }

  enqueueNextDifficulty(requestedNewDifficulty: number): boolean {
    this.pendingDifficulty = requestedNewDifficulty;
    return true;
  }

  sendDifficulty(difficulty: number): boolean {
    if (difficulty === this.difficulty) {
      return false;
    }

    this.previousDifficulty = this.difficulty;
    this.difficulty = difficulty;
    let powLimit = this._algorithm.diff;
    let adjPow = powLimit / difficulty;
    let zeroPad = "";

    if (64 - adjPow.toString(16).length !== 0) {
      zeroPad = "0";
      zeroPad = zeroPad.repeat(64 - adjPow.toString(16).length);
    }
    let target = (zeroPad + adjPow.toString(16)).substr(0, 64);
    this.sendJson({
      id: null,
      method: "mining.set_target",
      params: [target],
    });
    return true;
  }

  sendMiningJob(jobParams: JobParams): void {
    let lastActivityAgo = Date.now() - this.lastActivity;
    if (lastActivityAgo > this._options.connectionTimeout * 1000) {
      this.socket.destroy();
      return;
    }
    if (this.pendingDifficulty !== null) {
      let result = this.sendDifficulty(this.pendingDifficulty);
      this.pendingDifficulty = null;
      if (result) {
        this.emit("difficultyChanged", this.difficulty);
      }
    }
    let personal_jobParams = jobParams;
    let powLimit = this._algorithm.diff;
    let adjPow = powLimit / this.difficulty;
    let zeroPad = "";
    if (64 - adjPow.toString(16).length !== 0) {
      zeroPad = "0";
      zeroPad = zeroPad.repeat(64 - adjPow.toString(16).length);
    }
    personal_jobParams[3] = (zeroPad + adjPow.toString(16)).substr(0, 64);
    this.sendJson({
      id: null,
      method: "mining.notify",
      params: personal_jobParams,
    });
  }

  manuallyAuthClient(username: string, password: string): void {
    // @ts-ignore
    this.handleAuthorize({ id: 1, params: [username, password] }, false);
  }

  manuallySetValues(otherClient: StratumClient) {
    this.extraNonce1 = otherClient.extraNonce1;
    this.previousDifficulty = otherClient.previousDifficulty;
    this.difficulty = otherClient.difficulty;
  }
}
