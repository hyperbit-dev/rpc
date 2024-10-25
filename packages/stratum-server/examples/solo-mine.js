// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createPool } = require('../dist/index');

function main() {
  const pool = createPool(
    {
      address: '<testnet_address>',
      // api,
      // banning,
      blockRefreshInterval: 400,
      coin: {
        algorithm: 'kawpow', // kawpow | KAW
        name: 'ravencoin',
        reward: 'POW',
        symbol: 'RVN',
      },
      connectionTimeout: 600,
      daemons: [
        {
          host: process.env.HOST,
          port: process.env.PORT,
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
        },
      ],
      feePercent: 0,
      jobRebroadcastTimeout: 25,
      // kawpow_validator,
      // kawpow_wrapper_host,
      // kawpow_wrapper_port,
      p2p: {
        enabled: false,
        host: '127.0.0.1',
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
    authorizeFn
  );
  pool.start();
}

function authorizeFn(
  remoteAddress,
  localPort,
  address,
  workerPassword,
  extraNonce1,
  version,
  callback
) {
  console.log('remoteAddress', remoteAddress);
  console.log('localPort', localPort);
  console.log('address', address);
  console.log('workerPassword', workerPassword);
  console.log('extraNonce1', extraNonce1);
  console.log('version', version);
  callback({
    error: null,
    authorized: true,
    disconnect: false,
  });
}

main();
