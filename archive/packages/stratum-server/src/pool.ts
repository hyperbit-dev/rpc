import async from "async";
import { EventEmitter } from "node:events";
import { algorithms } from "./algorithms";
import { DaemonInterface } from "./daemon";
import { JobManager } from "./job-manager";
import { StratumClient, StratumServer } from "./stratum";
import {
  AuthorizeFn,
  Config,
  PoolOnSubmit,
  PoolOptions,
  Port,
  Recipient,
  RelinquishMinersStratumClient,
  RpcData,
  VarDiffOptions,
} from "./types";
import {
  addressToScript,
  getReadableHashRateString,
} from "@hyperbit-private/utils";
import { VarDiff } from "./var-diff";
import { Algorithm } from "./algorithms/types";

import "dotenv/config";

export class Pool extends EventEmitter {
  // @ts-ignore
  private _options: PoolOptions;
  private _algorithm: Algorithm;
  // @ts-ignore
  private _authorizeFn: AuthorizeFn;
  blockPollingIntervalId?: NodeJS.Timer;
  daemon?: DaemonInterface;
  progpow_wrapper: null = null;
  jobManagerLastSubmitBlockHex?: string;
  jobManager?: JobManager;
  stratumServer?: StratumServer;
  varDiff: Record<string, VarDiff> = {};

  constructor(options: Config, authorizeFn: AuthorizeFn) {
    super();

    if (!(options.coin.algorithm in algorithms)) {
      this.emitErrorLog(
        "The " +
          options.coin.algorithm +
          " hashing algorithm is not supported.",
      );
      throw new Error();
    }

    this._options = this.parseOptions(options);
    this._algorithm = algorithms[this._options.coin.algorithm] as Algorithm;

    this._authorizeFn = authorizeFn;
    this.jobManager = new JobManager(this._options);
  }

  parseOptions(options: Config): PoolOptions {
    const parsedOptions: PoolOptions = {
      ...options,
      hasSubmitMethod: false,
      poolAddressScript: () => {},
      initStats: {
        connections: 0,
        difficulty: 0,
        networkHashRate: 0,
        stratumPorts: [],
      },
      protocolVersion: 0,
      recipients: [],
      testnet: options?.testnet || false,
    };
    return parsedOptions;
  }

  emitLog(text: string): void {
    this.emit("log", "debug", text);
  }

  emitWarningLog(text: string): void {
    this.emit("log", "warning", text);
  }

  emitErrorLog(text: string): void {
    this.emit("log", "error", text);
  }

  emitSpecialLog(text: string): void {
    this.emit("log", "special", text);
  }

  async start() {
    try {
      console.log("Starting Var Diff");
      this.setupVarDiff();
      console.log("Setting up API");
      this.setupApi();
      console.log("Setting up Daemon Interfaces");
      await this.setupDaemonInterface();
      console.log("Detecting Coin Data");
      await this.detectCoinData();
      console.log("Setting up Recipients");
      this.setupRecipients();
      console.log("Setting up Job Manager");
      this.setupJobManager();
      console.log("Checking Blockchain Sync");
      this.onBlockchainSynced(() => {
        console.log("Getting First Job");
        this.getFirstJob(() => {
          console.log("Setting up Block Polling");
          this.setupBlockPolling();
          console.log("Starting Stratum Server");
          this.startStratumServer(() => {
            console.log("Outputting Pool Info");
            this.outputPoolInfo();
            this.emit("started");
          });
        });
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  getFirstJob(finishedCallback: any) {
    this.getBlockTemplate(
      (
        error: string | null,
        // @ts-ignore
        result: any,
      ) => {
        if (error) {
          this.emitErrorLog(
            "Error with getblocktemplate on creating first job, server cannot start",
          );
          return;
        }
        const portWarnings: string[] = [];
        const networkDiffAdjusted = this._options.initStats.difficulty;

        Object.keys(this._options.ports).forEach((port: string) => {
          const p = this._options.ports[port] as Port;
          const portDiff = p.diff;
          if (networkDiffAdjusted < portDiff)
            portWarnings.push("port " + port + " w/ diff " + portDiff);
        });

        if (
          portWarnings.length > 0 &&
          (!process.env.forkId || process.env.forkId === "0")
        ) {
          const warnMessage =
            "Network diff of " +
            networkDiffAdjusted +
            " is lower than " +
            portWarnings.join(" and ");
          this.emitWarningLog(warnMessage);
        }
        finishedCallback();
      },
    );
  }

  outputPoolInfo() {
    const startMessage =
      "Stratum Pool Server Started for " +
      this._options.coin.name +
      " [" +
      this._options.coin.symbol.toUpperCase() +
      "] {" +
      this._options.coin.algorithm +
      "}";
    if (process.env.forkId && process.env.forkId !== "0") {
      this.emitLog(startMessage);
      return;
    }
    const infoLines = [
      startMessage,
      "Network Connected:\t" + (this._options.testnet ? "Testnet" : "Mainnet"),
      "Detected Reward Type:\t" + this._options.coin.reward,
      // @ts-ignore
      "Current Block Height:\t" + this.jobManager!.currentJob!.rpcData.height,
      // @ts-ignore
      "Current Block Diff:\t" +
        this.jobManager!.currentJob!.difficulty * this._algorithm.multiplier!,
      "Current Connect Peers:\t" + this._options.initStats.connections,
      "Network Hash Rate:\t" +
        getReadableHashRateString(this._options.initStats.networkHashRate),
      "Stratum Port(s):\t" +
        this._options.initStats?.stratumPorts?.join(", ") || "",
    ];
    if (
      typeof this._options.blockRefreshInterval === "number" &&
      this._options.blockRefreshInterval > 0
    )
      infoLines.push(
        "Block polling every:\t" + this._options.blockRefreshInterval + " ms",
      );
    console.log(infoLines.join("\n\t\t\t\t\t\t"));
    this.emitSpecialLog(infoLines.join("\n\t\t\t\t\t\t"));
  }

  onBlockchainSynced(syncedCallback: any) {
    const checkSynced = (displayNotSynced: any) => {
      this.daemon!.cmd(
        "getblocktemplate",
        [
          {
            capabilities: ["coinbasetxn", "workid", "coinbase/append"],
            rules: ["segwit"],
          },
        ],
        (results: any) => {
          const synced = Array.isArray(results)
            ? results.every((x) => x.code !== 500 && x.code !== -10)
            : results.code !== 500 && results.code !== -10;
          if (synced) {
            syncedCallback();
          } else {
            if (displayNotSynced) {
              displayNotSynced();
            }
            setTimeout(checkSynced, 5000);

            if (!process.env.forkId || process.env.forkId === "0") {
              generateProgress();
            }
          }
        },
      );
    };

    checkSynced(() => {
      if (!process.env.forkId || process.env.forkId === "0") {
        const err =
          "Daemon is still syncing with network (download blockchain) - server will be started once synced";
        this.emitErrorLog(err);
      }
    });

    const generateProgress = () => {
      this.daemon!.cmd("getinfo", [], (results: any) => {
        const res = Array.isArray(results) ? results : [results];
        let blockCount = res.sort((a: any, b: any) => {
          return b.blocks - a.blocks;
        })[0].blocks;
        this.daemon!.cmd("getpeerinfo", [], (results: any) => {
          const peers = Array.isArray(results) ? results : [results];
          let totalBlocks = peers.sort(
            (a: any, b: any) => b.startingheight - a.startingheight,
          )[0].startingheight;
          let percent = ((blockCount / totalBlocks) * 100).toFixed(2);
          this.emitWarningLog(
            "Downloaded " +
              percent +
              "% of blockchain from " +
              peers.length +
              " peers",
          );
        });
      });
    };
  }

  setupApi() {
    if (
      typeof this._options.api !== "object" ||
      typeof this._options.api.start !== "function"
    ) {
    } else {
      this._options.api.start(this);
    }
  }

  setupVarDiff() {
    this.varDiff = {};
    Object.keys(this._options.ports).forEach((port) => {
      const p = this._options.ports[port] as Port;
      if (p.varDiff) {
        this.setVarDiff(port, p.varDiff);
      }
    });
  }

  submitBlock(blockHex: string, callback: any) {
    let rpcCommand: string, rpcArgs: any[];
    if (this._options.hasSubmitMethod) {
      rpcCommand = "submitblock";
      rpcArgs = [blockHex];
    } else {
      rpcCommand = "getblocktemplate";
      rpcArgs = [{ mode: "submit", data: blockHex }];
    }

    this.daemon!.cmd(rpcCommand, rpcArgs, (results: any) => {
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        if (result.error || result.response === "invalid-progpow") {
          this.emitErrorLog(
            "rpc error with daemon instance " +
              result.instance.index +
              " when submitting block with " +
              rpcCommand +
              " " +
              JSON.stringify(
                result.error + "  result.response=" + result.response,
              ),
          );
          return;
        } else if (result.response === "rejected") {
          this.emitErrorLog(
            "Daemon instance " +
              result.instance.index +
              " rejected a supposedly valid block",
          );
          return;
        }
      }
      this.emitLog(
        "Submitted Block using " +
          rpcCommand +
          " successfully to daemon instance(s)",
      );
      callback();
    });
  }

  setupRecipients() {
    const recipients: Recipient[] = [];
    this._options.feePercent = 0;
    this._options.rewardRecipients = this._options.rewardRecipients || {};
    Object.keys(this._options.rewardRecipients).forEach((address) => {
      const percent = this._options.rewardRecipients[address] ?? 0;
      this._options.feePercent += percent;
      recipients.push({
        address,
        percent,
      });
    });
    this._options.recipients = recipients;
  }

  setupJobManager() {
    this.jobManager = new JobManager(this._options);
    this.jobManager
      .on("newBlock", (blockTemplate) => {
        if (this.stratumServer) {
          this.stratumServer.broadcastMiningJobs(blockTemplate.getJobParams());
        }
      })
      .on("updatedBlock", (blockTemplate) => {
        if (this.stratumServer) {
          const job = blockTemplate.getJobParams();
          job[4] = false;

          this.stratumServer.broadcastMiningJobs(job);
        }
      })
      .on("share", (shareData: any, blockHex: string) => {
        let isValidShare = !shareData.error;
        let isValidBlock = !!blockHex;
        const emitShare = () => {
          this.emit("share", isValidShare, isValidBlock, shareData);
        };
        if (!isValidBlock) {
          emitShare();
        } else {
          if (this.jobManagerLastSubmitBlockHex === blockHex) {
            this.emitWarningLog("Warning, ignored duplicate submit block");
          } else {
            this.jobManagerLastSubmitBlockHex = blockHex;
            this.submitBlock(blockHex, () => {
              this.checkBlockAccepted(
                shareData.blockHash,
                (isAccepted: boolean, tx: any) => {
                  isValidBlock = isAccepted === true;
                  if (isValidBlock === true) {
                    shareData.txHash = tx;
                  } else {
                    shareData.error = tx;
                  }
                  emitShare();
                  this.getBlockTemplate(
                    (
                      // @ts-ignore
                      error: string | null,
                      // @ts-ignore
                      result: any,
                      foundNewBlock: boolean,
                    ) => {
                      if (foundNewBlock) {
                        this.emitLog(
                          "Block notification via RPC after block submission",
                        );
                      }
                    },
                  );
                },
              );
            });
          }
        }
      })
      .on("log", (severity, message) => {
        this.emit("log", severity, message);
      });
  }

  async setupDaemonInterface() {
    return new Promise<void>((resolve, reject) => {
      if (
        !Array.isArray(this._options.daemons) ||
        this._options.daemons.length < 1
      ) {
        this.emitErrorLog(
          "No daemons have been configured - pool cannot start",
        );
        return;
      }
      this.daemon = new DaemonInterface(
        this._options.daemons,
        (severity: string, message: string) => {
          this.emit("log", severity, message);
        },
      );
      this.daemon
        .once("online", () => {
          resolve();
        })
        .on("connectionFailed", (error) => {
          this.emitErrorLog(
            "Failed to connect daemon(s): " + JSON.stringify(error),
          );
          reject();
        })
        .on("error", (message) => {
          this.emitErrorLog(message);
          reject();
        });
      this.daemon.init();
    });
  }

  async detectCoinData() {
    return new Promise<void>((resolve, reject) => {
      const batchRpcCalls = [
        ["validateaddress", [this._options.address]],
        ["getdifficulty", []],
        ["getinfo", []],
        ["getmininginfo", []],
        ["submitblock", ["dummy"]],
      ];
      this.daemon!.batchCmd(batchRpcCalls, (results: any[]) => {
        if (!results) {
          this.emitErrorLog(
            "Could not start pool, error with init batch RPC call",
          );
          return reject();
        }

        const rpcResults: Record<string, any> = {};

        for (let i = 0; i < results.length; i++) {
          const rpcCall: any = batchRpcCalls[i]![0];
          rpcResults[rpcCall] = results[i];
          if (rpcCall !== "submitblock" && results[i].code === 500) {
            console.log("Could not start pool, error with init RPC");
            this.emitErrorLog(
              "Could not start pool, error with init RPC " +
                rpcCall +
                " - " +
                JSON.stringify(results[i].message),
            );
            return reject();
          }
        }

        if (!rpcResults.validateaddress.isvalid) {
          console.log("Daemon reports address is not valid");
          this.emitErrorLog("Daemon reports address is not valid");
          return reject();
        }
        if (
          isNaN(rpcResults.getdifficulty) &&
          "proof-of-stake" in rpcResults.getdifficulty
        ) {
          this._options.coin.reward = "POS";
        } else {
          this._options.coin.reward = "POW";
        }
        if (
          this._options.coin.reward === "POS" &&
          typeof rpcResults.validateaddress.pubkey === "undefined"
        ) {
          console.log(
            "The address provided is not from the daemon wallet - this is required for POS coins.",
          );
          this.emitErrorLog(
            "The address provided is not from the daemon wallet - this is required for POS coins.",
          );
          return reject();
        }
        this._options.poolAddressScript = (() => {
          return addressToScript(rpcResults.validateaddress.address);
        })();
        this._options.testnet = rpcResults.getinfo.testnet;
        this._options.protocolVersion = rpcResults.getinfo.protocolversion;
        this._options.initStats = {
          connections: rpcResults.getinfo.connections,
          difficulty:
            rpcResults.getinfo.difficulty * this._algorithm.multiplier!,
          networkHashRate: rpcResults.getmininginfo.networkhashps,
        };
        if (rpcResults.submitblock.message === "Method not found") {
          this._options.hasSubmitMethod = false;
        } else if (
          rpcResults.submitblock.code === -1 ||
          rpcResults.submitblock.message === "Block decode failed"
        ) {
          this._options.hasSubmitMethod = true;
        } else {
          this.emitErrorLog(
            "Could not detect block submission RPC method, " +
              JSON.stringify(results),
          );
          return reject();
        }
        resolve();
      });
    });
  }

  startStratumServer(finishedCallback: any) {
    const _this = this;
    this.stratumServer = new StratumServer(this._options, this._authorizeFn);
    this.stratumServer
      .on("started", () => {
        this._options.initStats.stratumPorts = Object.keys(
          this._options.ports,
        ).map((x) => Number(x));
        this.stratumServer!.broadcastMiningJobs(
          this.jobManager!.currentJob!.getJobParams(),
        );
        finishedCallback();
      })
      .on("broadcastTimeout", () => {
        this.emitLog(
          "No new blocks for " +
            this._options.jobRebroadcastTimeout +
            " seconds - updating transactions & rebroadcasting work",
        );
        this.getBlockTemplate(
          async (
            error: string | null,
            rpcData: RpcData,
            processedBlock: boolean,
          ) => {
            if (error || processedBlock) {
              return;
            }
            await this.jobManager!.updateCurrentJob(rpcData);
          },
        );
      })
      .on("client.connected", (client) => {
        if (typeof this.varDiff[client.socket.localPort] !== "undefined") {
          this.varDiff[client.socket.localPort]!.manageClient(client);
        }
        client
          .on("difficultyChanged", (diff: number) => {
            this.emit("difficultyUpdate", client.workerName, diff);
          })
          .on(
            "subscription",
            (
              // @ts-ignore
              params,
              resultCallback: any,
            ) => {
              let extraNonce = _this.jobManager!.extraNonceCounter.next();
              resultCallback(null, extraNonce, extraNonce);
              if (
                typeof _this._options.ports[client.socket.localPort] !==
                  "undefined" &&
                _this._options.ports[client.socket.localPort]!.diff
              ) {
                client.sendDifficulty(
                  _this._options.ports[client.socket.localPort]!.diff,
                );
              } else {
                client.sendDifficulty(8);
              }
              client.sendMiningJob(
                _this.jobManager!.currentJob!.getJobParams(),
              );
            },
          )
          .on("authorization", (params: any) => {
            console.log("worker authorized", params.publicAddress);
          })
          .on("submit", (params: PoolOnSubmit, resultCallback: any) => {
            this.jobManager!.processShare(
              params.jobId,
              client.previousDifficulty,
              client.difficulty,
              params.extraNonce2,
              client.remoteAddress,
              client.socket.localPort,
              params.workerName,
              params.nTime,
              params.nOnce,
              client.extraNonce1,
              (result: any) => {
                resultCallback(result.error, result.result ? true : null);
              },
            );
          })
          .on("malformedMessage", (message: string) => {
            this.emitWarningLog(
              "Malformed message from " + client.getLabel() + ": " + message,
            );
          })
          .on("socketError", (err: Error) => {
            this.emitWarningLog(
              "Socket error from " +
                client.getLabel() +
                ": " +
                JSON.stringify(err),
            );
          })
          .on("socketTimeout", (reason: string) => {
            this.emitWarningLog(
              "Connected timed out for " + client.getLabel() + ": " + reason,
            );
          })
          .on("socketDisconnect", () => {})
          .on("kickedBannedIP", (remainingBanTime: string) => {
            this.emitLog(
              "Rejected incoming connection from " +
                client.remoteAddress +
                " banned for " +
                remainingBanTime +
                " more seconds",
            );
          })
          .on("forgaveBannedIP", () => {
            this.emitLog("Forgave banned IP " + client.remoteAddress);
          })
          .on("unknownStratumMethod", (fullMessage: any) => {
            this.emitLog(
              "Unknown stratum method from " +
                client.getLabel() +
                ": " +
                fullMessage.method,
            );
          })
          .on("socketFlooded", () => {
            this.emitWarningLog(
              "Detected socket flooding from " + client.getLabel(),
            );
          })
          .on("tcpProxyError", (data: string) => {
            this.emitErrorLog(
              "Client IP detection failed, tcpProxyProtocol is enabled yet did not receive proxy protocol message, instead got data: " +
                data,
            );
          })
          .on("bootedBannedWorker", () => {
            this.emitWarningLog(
              "Booted worker " +
                client.getLabel() +
                " who was connected from an IP address that was just banned",
            );
          })
          .on("triggerBan", (reason: string) => {
            this.emitWarningLog(
              "Banned triggered for " + client.getLabel() + ": " + reason,
            );
            this.emit("banIP", client.remoteAddress, client.workerName);
          });
      });
  }

  setupBlockPolling() {
    if (
      typeof this._options.blockRefreshInterval !== "number" ||
      this._options.blockRefreshInterval <= 0
    ) {
      this.emitLog("Block template polling has been disabled");
      return;
    }
    const pollingInterval = this._options.blockRefreshInterval;
    this.blockPollingIntervalId = setInterval(() => {
      this.getBlockTemplate(
        (
          // @ts-ignore
          error: string | null,
          // @ts-ignore
          result: any,
          foundNewBlock: boolean,
        ) => {
          if (foundNewBlock) {
            this.emitLog("Block notification via RPC polling");
          }
        },
      );
    }, pollingInterval);
  }

  getBlockTemplate(callback: any) {
    this.daemon!.cmd(
      "getblocktemplate",
      [
        {
          capabilities: ["coinbasetxn", "workid", "coinbase/append"],
          rules: ["segwit"],
        },
      ],
      async (result: any) => {
        if (result.code === 500) {
          this.emitLog("result.error = %s " + result.message);
          this.emitErrorLog(
            "getblocktemplate call failed for daemon instance " +
              result?.instance?.index +
              " with error " +
              JSON.stringify(result.error),
          );
          callback(result.message);
        } else {
          const processedNewBlock =
            await this.jobManager!.processTemplate(result);
          callback(null, result, processedNewBlock);
          callback = () => {};
        }
      },
      true,
    );
  }

  checkBlockAccepted(blockHash: string, callback: any) {
    this.daemon!.cmd("getblock", [blockHash], (results: any) => {
      const res = Array.isArray(results) ? results : [results];
      const validResults = res.filter((result: any) => {
        return result && result.hash === blockHash;
      });
      if (validResults.length >= 1) {
        if (validResults[0].confirmations >= 0) {
          callback(true, validResults[0].tx[0]);
        } else {
          callback(false, {
            confirmations: validResults[0].confirmations,
          });
        }
        return;
      }
      callback(false, { unknown: "check coin daemon logs" });
    });
  }

  processBlockNotify(blockHash: string, sourceTrigger: string): void {
    this.emitLog("Block notification via " + sourceTrigger);
    if (typeof this.jobManager !== "undefined") {
      if (
        typeof this.jobManager.currentJob !== "undefined" &&
        blockHash !== this.jobManager.currentJob.rpcData.previousblockhash
      ) {
        this.getBlockTemplate(
          (
            error: any,
            // @ts-ignore
            result: any,
          ) => {
            if (error) {
              this.emitErrorLog(
                "Block notify error getting block template for " +
                  this._options.coin.name,
              );
            }
          },
        );
      }
    }
  }

  relinquishMiners(filterFn: any, resultCback: any) {
    const _this = this;
    const origStratumClients = this.stratumServer!.getStratumClients();
    const stratumClients: RelinquishMinersStratumClient[] = [];
    Object.keys(origStratumClients).forEach((subId) => {
      stratumClients.push({
        subId: subId,
        client: origStratumClients[subId] as StratumClient,
      });
    });
    async.filter(stratumClients, filterFn, function (clientsToRelinquish: any) {
      clientsToRelinquish.forEach((cObj: RelinquishMinersStratumClient) => {
        cObj.client.removeAllListeners();
        _this.stratumServer!.removeStratumClientBySubId(cObj.subId);
      });
      process.nextTick(() => {
        resultCback(
          clientsToRelinquish.map((item: RelinquishMinersStratumClient) => {
            return item.client;
          }),
        );
      });
    });
  }

  attachMiners(miners: StratumClient[]) {
    miners.forEach((clientObj) => {
      this.stratumServer!.manuallyAddStratumClient(clientObj);
    });
    this.stratumServer!.broadcastMiningJobs(
      this.jobManager!.currentJob!.getJobParams(),
    );
  }

  getStratumServer() {
    return this.stratumServer;
  }

  setVarDiff(port: string, varDiffConfig: VarDiffOptions): void {
    if (typeof this.varDiff[port] !== "undefined") {
      this.varDiff[port]!.removeAllListeners();
    }
    this.varDiff[port] = new VarDiff(port, varDiffConfig);
    this.varDiff[port]!.on("newDifficulty", (client, newDiff) => {
      client.enqueueNextDifficulty(newDiff);
    });
  }
}
