import { api } from "../api";
import { config } from "../config";

export function getMasternodes(blockchain: string) {
  const chain = config.chains[blockchain];
  if (chain.features.masternodesEnabled) {
    return api(`/api/v1/${blockchain}/masternodes`, {
      cache: "no-store",
    });
  } else {
    return Promise.reject();
  }
}
