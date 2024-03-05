import { ApiRawTransaction } from "@/app/(server)/api/v1/explorer/transactions/[id]/types";
import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetRawTransactionParams = {
  queryKey: [string, { id: string; blockchain: string }];
};

export function getRawTransactionQuery(params: GetRawTransactionParams) {
  const [, { id, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  // searchParams.set("raw", "true");
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/transactions/${id}?${searchParams.toString()}`;

  return fetchClient<ApiRawTransaction>(url);
}

type GetRawTransactionQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  id: string;
  blockchain: string;
};

export function useGetRawTransactionQuery(params: GetRawTransactionQueryProps) {
  const { id, blockchain, ...options } = params;
  return useQuery<ApiRawTransaction, Error, ApiRawTransaction>({
    queryKey: ["transaction", { blockchain, id }],
    // @ts-ignore
    queryFn: getRawTransactionQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
