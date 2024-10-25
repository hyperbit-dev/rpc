import { AuthorizeFnCallback, createPool } from "../src";

function main() {
  console.log("start");
  const pool = createPool(
    {
      address: "n4C4BbMZrnT3Drx8cpJrU6XAaCV7mUzRK6",
      // api,
      // banning,
      blockRefreshInterval: 400,
      coin: {
        chainId: "C5546570-CE22-49CD-9F03-F55285B1D659",
        algorithm: "kawpow", // kawpow | KAW
        name: "ravencoin",
        reward: "POW",
        symbol: "RVN",
      },
      connectionTimeout: 600,
      daemons: [
        {
          host: "http://127.0.0.1",
          port: 8768,
          // port: mewc.testnet.portRpc,
          username: "rpcuser",
          password: "rpcpassword",
        },
      ],
      feePercent: 0,
      jobRebroadcastTimeout: 25,
      // kawpow_validator,
      // kawpow_wrapper_host,
      // kawpow_wrapper_port,
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
