import { fetchClient } from "./fetchClient";

export function getPeerInfo(blockchain: string) {
  return fetchClient<any[]>(`/api/v1/${blockchain}/nodes/peers/info`, {
    cache: "no-store",
  });
}
