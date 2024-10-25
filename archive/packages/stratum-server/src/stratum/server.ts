import { EventEmitter } from "events";
import net from "net";
import tls from "tls";
import { AuthorizeFn, JobParams, PoolOptions, Port } from "../types";
import { StratumClient } from "./client";
import { SubscriptionCounter } from "./common";

let TLSoptions: any;

export class StratumServer extends EventEmitter {
  private _bannedMS: number | null;
  private _stratumClients: Record<string, StratumClient> = {};
  private _subscriptionCounter = new SubscriptionCounter();
  private _rebroadcastTimeout?: any;
  private _bannedIPs: Record<string, number> = {};
  private _authorizeFn: AuthorizeFn;
  private _options: PoolOptions;

  constructor(options: PoolOptions, authorizeFn: AuthorizeFn) {
    super();
    this._options = options;
    this._authorizeFn = authorizeFn;
    this._bannedMS = options.banning ? options.banning.time * 1000 : null;
    this.init();
  }

  init() {
    if (this._options.banning && this._options.banning.enabled) {
      setInterval(() => {
        for (let ip in this._bannedIPs) {
          let banTime = this._bannedIPs[ip] ?? 0;
          if (Date.now() - banTime > this._options.banning!.time)
            delete this._bannedIPs[ip];
        }
      }, 1000 * this._options.banning!.purgeInterval);
    }

    let serversStarted = 0;

    Object.keys(this._options.ports).forEach((port: string) => {
      const p = this._options.ports[port] as Port;
      if (p.tls) {
        tls
          .createServer(TLSoptions, (socket: tls.TLSSocket) => {
            this.handleNewClient(socket);
          })
          .listen(parseInt(port), () => {
            serversStarted++;
            if (serversStarted === Object.keys(this._options.ports).length)
              this.emit("started");
          });
      } else {
        net
          .createServer({ allowHalfOpen: false }, (socket: net.Socket) => {
            this.handleNewClient(socket);
          })
          .listen(parseInt(port), () => {
            serversStarted++;
            if (serversStarted === Object.keys(this._options.ports).length)
              this.emit("started");
          });
      }
    });
  }

  checkBan(client: StratumClient): void {
    if (
      this._options.banning &&
      this._options.banning.enabled &&
      client.remoteAddress in this._bannedIPs
    ) {
      let bannedTime = this._bannedIPs[client.remoteAddress] ?? 0;
      let bannedTimeAgo = Date.now() - bannedTime;
      let timeLeft = (this._bannedMS || 0) - bannedTimeAgo;
      if (timeLeft > 0) {
        client.socket.destroy();
        client.emit("kickedBannedIP", (timeLeft / 1000) | 0);
      } else {
        delete this._bannedIPs[client.remoteAddress];
        client.emit("forgaveBannedIP");
      }
    }
  }

  handleNewClient(socket: tls.TLSSocket | net.Socket): string {
    socket.setKeepAlive(true);

    let subscriptionId = this._subscriptionCounter.next();
    let client = new StratumClient({
      coin: this._options.coin,
      subscriptionId: subscriptionId,
      authorizeFn: this._authorizeFn,
      socket: socket,
      banning: this._options.banning,
      connectionTimeout: this._options.connectionTimeout,
      tcpProxyProtocol: this._options.tcpProxyProtocol,
    });

    this._stratumClients[subscriptionId] = client;
    this.emit("client.connected", client);

    client
      .on("socketDisconnect", () => {
        this.removeStratumClientBySubId(subscriptionId);
        this.emit("client.disconnected", client);
      })
      .on("checkBan", () => {
        this.checkBan(client);
      })
      .on("triggerBan", () => {
        this.addBannedIP(client.remoteAddress);
      })
      .init();
    return subscriptionId;
  }

  removeStratumClientBySubId(subscriptionId: string): void {
    delete this._stratumClients[subscriptionId];
  }

  addBannedIP(ipAddress: string): void {
    this._bannedIPs[ipAddress] = Date.now();
  }

  broadcastMiningJobs(jobParams: JobParams) {
    for (let clientId in this._stratumClients) {
      let client = this._stratumClients[clientId]!;
      client.sendMiningJob(jobParams);
    }
    clearTimeout(this._rebroadcastTimeout);
    this._rebroadcastTimeout = setTimeout(() => {
      this.emit("broadcastTimeout");
    }, this._options.jobRebroadcastTimeout * 1000);
  }

  getStratumClients() {
    return this._stratumClients;
  }

  manuallyAddStratumClient(client: StratumClient) {
    let subId = this.handleNewClient(client.socket);
    if (subId != null) {
      this._stratumClients[subId]!.manuallyAuthClient(
        client.workerName!,
        client.workerPass!,
      );
      this._stratumClients[subId]!.manuallySetValues(client);
    }
  }
}
