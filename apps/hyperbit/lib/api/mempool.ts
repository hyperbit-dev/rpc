import { GetRawMempoolResponse } from "@/types/api";
import { api } from "../api";

export function getRawMempool(blockchain: string) {
  return api<GetRawMempoolResponse[] | string[]>(
    `/api/v1/${blockchain}/mempool/raw`,
    {
      cache: "no-store",
    }
  );
}
