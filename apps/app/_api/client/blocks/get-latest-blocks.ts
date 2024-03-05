import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetLatestBlocksParams = {
  queryKey: [
    string,
    string,
    {
      blockchain: string;
    },
  ];
};

export function getLatestBlocksQuery(params: GetLatestBlocksParams) {
  const [, , { blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/blocks/latest?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetLatestBlocksQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
};

export function useGetLatestBlocksQuery(params: GetLatestBlocksQueryProps) {
  const { blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["blocks", "latest", { blockchain }],
    // @ts-ignore
    queryFn: getLatestBlocksQuery,
    staleTime: 30 * 1000,
    ...options,
  });
}
