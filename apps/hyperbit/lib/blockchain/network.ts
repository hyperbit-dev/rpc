import { Networks, chains } from "@hyperbitjs/chains";

type GetNetworkResponse = {
  network: Networks;
  name: string;
};

export function getNetwork(blockchain: string): GetNetworkResponse | undefined {
  const baseName = getBaseName(blockchain);
  if (baseName) {
    return {
      network: chains[baseName],
      name: chains[baseName].mainnet.name,
    };
  }
}

export function getBaseName(blockchain: string) {
  return chains?.[blockchain]
    ? blockchain
    : chains?.[blockchain.slice(1, blockchain.length)]
    ? blockchain.slice(1, blockchain.length)
    : undefined;
}
