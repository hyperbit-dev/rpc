import { api } from "../api";

export function getExplorerSummary(blockchain: string) {
  return api<any>(`/api/v1/${blockchain}/explorer/summary`, {
    cache: "no-store",
    next: { revalidate: 1 }
  });
}
