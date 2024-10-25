// https://github.com/EvrmoreOrg/meowcoin-personal-stratum-server/commit/851365862320ce41436331d58e08ca9aa7e4929c
import { AuthorizeFnCallback, createPool } from "../src";

function main() {
  const pool = createPool(
    {
      address: "kyafg8sJd4YV3AjuQZwvdaNMfLWbRZ3Tyo",
      // api,
      // banning,
      blockRefreshInterval: 400,
      coin: {
        chainId: "457C71FE-A732-4208-A469-22FD6107EE8C",
        algorithm: "meowpow", // meowpow | KAW
        name: "meowcoin",
        reward: "POW",
        symbol: "MEWC",
      },
      connectionTimeout: 600,
      daemons: [
        {
          host: "http://165.232.139.28",
          port: 18766,
          // port: mewc.testnet.portRpc,
          username: "Emperor3918",
          password: "rR47KZUMmt94",
        },
      ],
      feePercent: 0,
      jobRebroadcastTimeout: 25,
      // meowpow_validator,
      // meowpow_wrapper_host,
      // meowpow_wrapper_port,
      p2p: {
        enabled: false,
        host: "127.0.0.1",
        port: 8767,
        disableTransactions: true,
      },
      ports: {
        10008: {
          diff: 0.05,
          varDiff: {
            maxDiff: 1024,
            maxJump: 25,
            minDiff: 0.025,
            retargetTime: 60,
            targetTime: 10,
            variancePercent: 30,
          },
        },
        10016: {
          diff: 0.1,
          varDiff: {
            maxDiff: 1024,
            maxJump: 25,
            minDiff: 0.05,
            retargetTime: 60,
            targetTime: 10,
            variancePercent: 30,
          },
        },
        10032: {
          diff: 0.2,
          varDiff: {
            maxDiff: 1024,
            maxJump: 50,
            minDiff: 0.1,
            retargetTime: 60,
            targetTime: 10,
            variancePercent: 30,
          },
        },
        10256: {
          diff: 1024000000,
          varDiff: {
            maxDiff: 20480000000,
            maxJump: 25,
            minDiff: 1024000000,
            retargetTime: 60,
            targetTime: 10,
            variancePercent: 30,
          },
        },
      },
      rewardRecipients: {
        // <testnet_address>: 0.5,
      },
      tcpProxyProtocol: false,
      testnet: true,
    },
    authorizeFn,
  );
  pool.start();
}

function authorizeFn(
  remoteAddress: string | undefined, // ip address
  localPort: number | undefined,
  address: string, // workerName xxxxxxxxx.x
  workerPassword: string,
  extraNonce1: string | null,
  version: number | string | null,
  callback: AuthorizeFnCallback,
) {
  console.log("remoteAddress", remoteAddress);
  console.log("localPort", localPort);
  console.log("address", address);
  console.log("workerPassword", workerPassword);
  console.log("extraNonce1", extraNonce1);
  console.log("version", version);
  callback({
    error: null,
    authorized: true,
    disconnect: false,
  });
}

main();
