import { Client } from "@hyperbitjs/rpc";
import { EventEmitter } from "events";
import http from "http";
import { Daemon as DaemonCommon, StratumError } from "./types";

type Daemon = DaemonCommon & {
  index?: number;
};

export class DaemonInterface extends EventEmitter {
  private _daemons: Daemon[];
  private _logger: any;

  constructor(daemons: Daemon[], logger: any) {
    super();

    for (let i = 0; i < daemons.length; i++) {
      (daemons[i] as Daemon)["index"] = i;
    }

    this._daemons = daemons;
    this._logger = logger;
  }

  init() {
    this.isOnline((online: boolean) => {
      if (online) {
        this.emit("online");
      }
    });
  }

  isOnline(callback: (_online: boolean) => void) {
    this.cmd("getinfo", [], (results: any) => {
      const allOnline = Array.isArray(results)
        ? results.every((x) => !x.code)
        : results.code !== 500;
      callback(allOnline);
      if (!allOnline) {
        this.emit("connectionFailed", results);
      }
    });
  }

  performHttpRequest(instance: Daemon, jsonData: string, callback: any) {
    let options = {
      hostname:
        typeof instance.host === "undefined" ? "127.0.0.1" : instance.host,
      port: instance.port,
      method: "POST",
      auth: instance.username + ":" + instance.password,
      headers: {
        "Content-Length": jsonData.length,
      },
    };

    const parseJson = (res: http.IncomingMessage, data: string | any) => {
      let dataJson;
      if (res.statusCode === 401) {
        this.logger(
          "error",
          "Unauthorized RPC access - invalid RPC username or password"
        );
        return;
      }

      try {
        dataJson = JSON.parse(data);
      } catch (e) {
        if (data.indexOf(":-nan") !== -1) {
          data = data.replace(/:-nan,/g, ":0");
          parseJson(res, data);
          return;
        }
        this.logger(
          "error",
          "Could not parse rpc data from daemon instance  " +
            instance.index +
            "\nRequest Data: " +
            jsonData.substr(0, 200) +
            "\nResponse Data: " +
            data.substr(0, 200)
        );
      }
      if (dataJson && callback) {
        callback(dataJson.error, dataJson, data);
      }
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        parseJson(res, data);
      });
    });

    req.on("error", (e: StratumError) => {
      if (e.code === "ECONNREFUSED") {
        callback({ type: "offline", message: e.message }, null);
      } else {
        callback({ type: "request error", message: e.message }, null);
      }
    });

    req.end(jsonData);
  }

  batchCmd(cmdArray: any[], callback: any) {
    const promises = [];

    if (this._daemons[0]) {
      const client = new Client({
        url:
          this._daemons[0].url ||
          `${this._daemons[0].host}:${this._daemons[0].port}`,
        username: this._daemons[0].username,
        password: this._daemons[0].password,
        headers: this._daemons[0].headers ?? undefined,
      });

      for (var i = 0; i < cmdArray.length; i++) {
        const method = cmdArray[i][0];
        const params = cmdArray[i][1];
        promises.push(client.request(method, params));
      }

      Promise.all(promises).then((res) => {
        callback(res);
      });
    }
  }

  cmd(
    method: string,
    params: any,
    callback: any,
    // @ts-ignore
    _streamResults?: any,
    // @ts-ignore
    _returnRawData?: any
  ) {
    if (this._daemons.length > 1) {
      const results: any[] = [];
      this._daemons.forEach(async (daemon) => {
        const client = new Client({
          url: daemon.url || `${daemon.host}:${daemon.port}`,
          username: daemon.username,
          password: daemon.password,
          headers: daemon.headers ?? undefined,
        });
        const res = await client.request(method, params);
        results.push(res);
      });
      callback(results);
    } else {
      if (this._daemons[0]) {
        const client = new Client({
          url:
            this._daemons[0].url ||
            `${this._daemons[0].host}:${this._daemons[0].port}`,
          username: this._daemons[0].username,
          password: this._daemons[0].password,
          headers: this._daemons[0].headers ?? undefined,
        });
        client
          .request(method, params)
          .then((res: any) => {
            callback(res);
          })
          .catch((err: any) => {
            callback(err);
          });
      }
    }
  }

  logger(severity: string, message: string) {
    if (this._logger) {
      return this._logger(severity, message);
    }
  }
}
