import { createClientFromEnv, Client } from '../dist/index.mjs';

const rpc = createClientFromEnv();
const result = await rpc.request('getblockcount');

if (Client.isRpcError(result)) {
  console.error('[rpc:error]', result.type, result.message);
  process.exitCode = 1;
} else {
  console.log(JSON.stringify(result, null, 2));
}
