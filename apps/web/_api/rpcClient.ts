import { Client } from "@hyperbitjs/rpc";
import { config } from "~/_config";

const globalForRpcClient = global as unknown as {
  rpcClients: Record<string, Client>;
};

export function getRpcCredentials(chain: Record<string, string>) {
  return {
    url: chain.rpcUrl,
    username: chain.rpcUser,
    password: chain.rpcPassword,
  };
}

function setupClients() {
  const clients: Record<string, Client> = {};
  Object.keys(config.blockchains.chains).forEach((chain) => {
    clients[chain] = new Client(
      getRpcCredentials(config.blockchains.chains[chain]),
    );
  });
  return clients;
}

export const rpcClients = globalForRpcClient.rpcClients || setupClients();

if (process.env.NODE_ENV !== "production")
  globalForRpcClient.rpcClients = rpcClients;

export default rpcClients;
