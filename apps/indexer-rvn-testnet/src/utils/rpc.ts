import { Client } from "@hyperbitjs/rpc";

const globalForRpcClient = global as unknown as {
  rpcClient: Client;
};

export const rpcClient = new Client({
  url: process.env.RPC_URL as string,
  username: process.env.RPC_USER as string,
  password: process.env.RPC_PASSWORD as string,
});

if (process.env.NODE_ENV !== "production")
  globalForRpcClient.rpcClient = rpcClient;

export default rpcClient;
