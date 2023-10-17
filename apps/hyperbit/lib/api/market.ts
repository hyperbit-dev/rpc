import { MarketLatest } from "@/types/api";
import { api } from "../api";

export function getMarketData(blockchain: string) {
  return api<any>(`/api/v1/${blockchain}/market`, {
    cache: "no-store",
  });
}

export function getMarketLatest(blockchain: string) {
  return api<MarketLatest>(`/api/v1/${blockchain}/market/latest`, {
    cache: "no-store",
  });
}

export function getMarketChart(blockchain: string) {
  return api<any>(`/api/v1/${blockchain}/market/chart`, {
    cache: "no-store",
  });
}
