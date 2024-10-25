import { ApiRawMempool } from "@/app/api/v1/explorer/mempool";
import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetRawMempoolParams = {
  queryKey: [string, { blockchain: string }];
};

export function getRawMempoolQuery(params: GetRawMempoolParams) {
  const [, { blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  // searchParams.set("raw", "true");
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/mempool?${searchParams.toString()}`;

  return fetchClient<ApiRawMempool>(url);
}

type GetRawMempoolQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
};

export function useGetRawMempoolQuery(params: GetRawMempoolQueryProps) {
  const { blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["raw-mempool"],
    // @ts-ignore
    queryFn: getRawMempoolQuery,
    staleTime: 10 * 1000,
    ...options,
  });
}
