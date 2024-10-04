import { ApiBlock } from "@/app/(server)/api/v1/explorer/blocks";
import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetBlockParams = {
  queryKey: [string, { blockhash: string; blockchain: string }];
};

export function getBlockQuery(params: GetBlockParams) {
  const [, { blockhash, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("verbosity", "2");
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/blocks/${blockhash}?${searchParams.toString()}`;

  return fetchClient<ApiBlock>(url);
}

type GetBlockQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockhash: string;
  blockchain: string;
};

export function useGetBlockQuery(params: GetBlockQueryProps) {
  const { blockhash, blockchain, ...options } = params;
  return useQuery<ApiBlock, Error, ApiBlock>({
    queryKey: ["blocks", { blockchain, blockhash }],
    // @ts-ignore
    queryFn: getBlockQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
