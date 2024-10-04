import { fetchClient } from "./fetchClient";

export function getRawMempool(blockchain: string) {
  return fetchClient<any[] | string[]>(
    `/api/v1/${blockchain}/mempool/raw`,
    {
      cache: "no-store",
    }
  );
}
