import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ApiBlock } from "@/app/api/v1/explorer/blocks";
import { fetchServer } from "../fetchServer";

type GetBlockHeightParams = {
  queryKey: [
    string,
    string,
    {
      height: string;
      blockchain: string;
    },
  ];
};

export function getBlockHeight({
  queryKey,
}: GetBlockHeightParams): Promise<any> {
  const [, , { height, blockchain }] = queryKey;
  return fetchServer<any>(
    `/api/v1/explorer/blocks/height/${height}?blockchain=${blockchain}`,
    {
      cache: "no-store",
    },
  );
}

type GetBlockHeightQueryProps = {
  height: string;
  blockchain: string;
};

export function useGetBlockHeightQuery(
  { height, blockchain }: GetBlockHeightQueryProps,
  options?: UseQueryOptions<ApiBlock, Error>,
) {
  return useQuery<any, Error, any>({
    queryKey: ["blocks", "height", { height, blockchain }],
    // @ts-ignore
    queryFn: getBlockHeight,
    ...options,
    staleTime: 5 * 60 * 1000,
  });
}
