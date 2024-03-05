import { chains } from "@hyperbitjs/chains";

export function getNetwork(chainId: string) {
  const networks = Object.values(chains).filter(
    // @ts-ignore
    (chain) => Object.values(chain).find((x) => x.id === chainId)
  )?.[0];
  return Object.values(networks).find((x) => x.id === chainId);
}
