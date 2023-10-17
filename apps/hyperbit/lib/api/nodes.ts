import { GetPeerInfoResponse } from "@/types/api";
import { api } from "../api";

export function getPeerInfo(blockchain: string) {
  return api<GetPeerInfoResponse[]>(`/api/v1/${blockchain}/nodes/peers/info`, {
    cache: "no-store",
  });
}
