import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient";

type GetBlocksParams = {
  queryKey: [string, { blockchain: string; offset: string; limit: string }];
};

export function getBlocksQuery(params: GetBlocksParams) {
  const [, { blockchain, offset, limit }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  searchParams.set("offset", offset.toString());
  searchParams.set("limit", limit.toString());
  const url = `/api/v1/explorer/blocks?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetBlocksQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
  offset: string;
  limit: string;
};

export function useGetBlocksQuery(params: GetBlocksQueryProps) {
  const { blockchain, offset = "0", limit = "10", ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["blocks", { blockchain, offset, limit }],
    // @ts-ignore
    queryFn: getBlocksQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
