import { GetRawTransactionResponse } from "@/types/api/v1/transactions";
import { api } from "../api";

export const getRawTransaction = (id: string | number, blockchain: string) => {
  return api<Promise<GetRawTransactionResponse>>(
    `/api/v1/${blockchain}/transactions/${id}`,
    {
      cache: "no-store",
    }
  );
};
