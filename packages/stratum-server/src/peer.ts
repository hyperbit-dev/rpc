import { EventEmitter } from "node:events";
import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import net from "node:net";
import { PoolOptions, StratumError } from "./types";
import { varStringBuffer, packUInt32LE, packInt64LE, sha256d } from "@hyperbit-private/utils";

type InvCodes = {
  error: number;
  tx: number;
  block: number;
};

type Commands = {
  version: Buffer;
  inv: Buffer;
  verack: Buffer;
  addr: Buffer;
  getblocks: Buffer;
};

export class Peer extends EventEmitter {
  private _options: PoolOptions;
  client?: net.Socket;
  magic: Buffer;
  magicInt: number;
  verack: boolean = false;
  validConnectionConfig: boolean = true;
  invCodes: InvCodes = {
    error: 0,
    tx: 1,
    block: 2,
  };
  networkServices: Buffer = Buffer.from("0100000000000000", "hex"); // //NODE_NETWORK services (value 1 packed as uint64)
  emptyNetAddress: Buffer = Buffer.from(
    "010000000000000000000000000000000000ffff000000000000",
    "hex"
  );
  userAgent: Buffer = varStringBuffer("/node-stratum/");
  blockStartHeight: Buffer = Buffer.from("00000000", "hex"); //block start_height, can be empty
  relayTransactions: Buffer;
  commands: Commands;

  constructor(options: PoolOptions) {
    super();

    this._options = options;
    this.magic = Buffer.from(
      options.testnet
        ? options.coin.peerMagicTestnet!
        : options.coin.peerMagic!,
      "hex"
    );
    this.magicInt = this.magic.readUInt32LE(0);

    this.relayTransactions =
      options?.p2p?.disableTransactions === true
        ? Buffer.from([0])
        : Buffer.from([]);

    this.commands = {
      version: this.commandStringBuffer("version"),
      inv: this.commandStringBuffer("inv"),
      verack: this.commandStringBuffer("verack"),
      addr: this.commandStringBuffer("addr"),
      getblocks: this.commandStringBuffer("getblocks"),
    };

    this.init();
  }

  init() {
    this.connect();
  }

  connect() {
    this.client = net.connect(
      {
        host: this._options.p2p.host,
        port: this._options.p2p.port,
      },
      () => {
        this.sendVersion();
      }
    );

    this.client.on("close", () => {
      if (this.verack) {
        this.emit("disconnected");
        this.verack = false;
        this.connect();
      } else if (this.validConnectionConfig) {
        this.emit("connectionRejected");
      }
    });

    this.client.on("error", (e: StratumError) => {
      if (e.code === "ECONNREFUSED") {
        this.validConnectionConfig = false;
        this.emit("connectionFailed");
      } else {
        this.emit("socketError", e);
      }
    });

    this.setupMessageParser(this.client);
  }

  sendVersion(): void {
    const payload = Buffer.concat([
      packUInt32LE(this._options.protocolVersion),
      this.networkServices,
      packInt64LE((Date.now() / 1000) | 0),
      this.emptyNetAddress,
      this.emptyNetAddress,
      crypto.pseudoRandomBytes(8),
      this.userAgent,
      this.blockStartHeight,
      this.relayTransactions,
    ]);
    this.sendMessage(this.commands.version, payload);
  }

  sendMessage(command: Buffer, payload: Buffer): void {
    const message = Buffer.concat([
      this.magic,
      command,
      packUInt32LE(payload.length),
      sha256d(payload).slice(0, 4),
      payload,
    ]);
    this.client!.write(message);
    this.emit("sentMessage", message);
  }

  setupMessageParser(client: net.Socket) {
    const beginReadingMessage = (preRead: Buffer | null) => {
      this.readFlowingBytes(
        client,
        24,
        preRead,
        (header: Buffer, lopped: boolean | null) => {
          const msgMagic = header.readUInt32LE(0);
          if (msgMagic !== this.magicInt) {
            this.emit("error", "bad magic number from peer");
            while (
              header.readUInt32LE(0) !== this.magicInt &&
              header.length >= 4
            ) {
              header = header.slice(1);
            }
            if (header.readUInt32LE(0) === this.magicInt) {
              beginReadingMessage(header);
            } else {
              beginReadingMessage(Buffer.from([]));
            }
            return;
          }
          const msgCommand = header.slice(4, 16).toString();
          const msgLength = header.readUInt32LE(16);
          const msgChecksum = header.readUInt32LE(20);
          this.readFlowingBytes(
            client,
            msgLength,
            lopped,
            (payload: Buffer, lopped: Buffer | null) => {
              if (sha256d(payload).readUInt32LE(0) !== msgChecksum) {
                this.emit("error", "bad payload - failed checksum");
                beginReadingMessage(null);
                return;
              }
              this.handleMessage(msgCommand, payload);
              beginReadingMessage(lopped);
            }
          );
        }
      );
    };
    beginReadingMessage(null);
  }

  handleMessage(command: string, payload: Buffer) {
    this.emit("peerMessage", { command: command, payload: payload });
    switch (command) {
      case this.commands.inv.toString():
        this.handleInv(payload);
        break;
      case this.commands.verack.toString():
        if (!this.verack) {
          this.verack = true;
          this.emit("connected");
        }
        break;
      default:
        break;
    }
  }

  handleInv(payload: Buffer): void {
    let count = payload.readUInt8(0);
    payload = payload.slice(1);

    if (count >= 0xfd) {
      count = payload.readUInt16LE(0);
      payload = payload.slice(2);
    }

    while (count--) {
      switch (payload.readUInt32LE(0)) {
        case this.invCodes.error:
          break;
        case this.invCodes.tx:
          // const tx = payload.slice(4, 36).toString('hex');
          break;
        case this.invCodes.block: {
          const block = payload.slice(4, 36).toString("hex");
          this.emit("blockFound", block);
          break;
        }
      }
      payload = payload.slice(36);
    }
  }

  commandStringBuffer(s: string): Buffer {
    return this.fixedLenStringBuffer(s, 12);
  }

  fixedLenStringBuffer(s: string, len: number): Buffer {
    const buff = Buffer.alloc(len);
    buff.fill(0);
    buff.write(s);
    return buff;
  }

  readFlowingBytes(
    stream: net.Socket,
    amount: number,
    preRead: Buffer | any,
    callback: any
  ): void {
    let buff = preRead ? preRead : Buffer.from([]);

    const readData = (data: Buffer) => {
      buff = Buffer.concat([buff, data]);
      if (buff.length >= amount) {
        const returnData = buff.slice(0, amount);
        const lopped = buff.length > amount ? buff.slice(amount) : null;
        callback(returnData, lopped);
      } else {
        stream.once("data", readData);
      }
    };

    readData(Buffer.from([]));
  }
}
