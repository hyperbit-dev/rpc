import {
  GetBlockchainInfoResponse,
  GetChainTxStatsResponse,
} from "@/types/api";
import { api } from "../api";

export function getBlockchainInfo(blockchain: string) {
  return api<GetBlockchainInfoResponse>(
    `/api/v1/${blockchain}/blockchain/info`,
    {
      cache: "no-store",
    }
  );
}

export function getBlockchainTxStats(blockchain: string) {
  return api<GetChainTxStatsResponse>(
    `/api/v1/${blockchain}/blockchain/tx/stats`,
    {
      cache: "no-store",
    }
  );
}
