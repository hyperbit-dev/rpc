import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ApiBlock } from "@/app/(server)/api/v1/explorer/blocks";

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
}: GetBlockHeightParams): Promise<string> {
  const [, , { height, blockchain }] = queryKey;
  return fetchClient<string>(
    `/api/v1/explorer/blocks/height/${height}?blockchain=${blockchain}`,
    {
      cache: "no-store",
    }
  );
}

type GetBlockHeightQueryProps = {
  height: string;
  blockchain: string;
};

export function useGetBlockHeightQuery(
  { height, blockchain }: GetBlockHeightQueryProps,
  options?: UseQueryOptions<ApiBlock, Error>
) {
  return useQuery<string, Error, string>({
    queryKey: ["blocks", "height", { height, blockchain }],
    // @ts-ignore
    queryFn: getBlockHeight,
    ...options,
    staleTime: 5 * 60 * 1000,
  });
}
