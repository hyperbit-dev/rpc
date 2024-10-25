import { fetchClient } from "./fetchClient";

export function getBlockchainInfo(blockchain: string) {
  return fetchClient<any>(`/api/v1/${blockchain}/blockchain/info`, {
    cache: "no-store",
  });
}

export function getBlockchainTxStats(blockchain: string) {
  return fetchClient<any>(`/api/v1/${blockchain}/blockchain/tx/stats`, {
    cache: "no-store",
  });
}
