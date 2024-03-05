import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAssetParams = {
  queryKey: [string, { asset: string; blockchain: string }];
};

export function getAssetQuery(params: GetAssetParams) {
  const [, { asset, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/assets/${asset}?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetAssetQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  asset: string;
  blockchain: string;
};

export function useGetAssetQuery(params: GetAssetQueryProps) {
  const { asset, blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["assets", { blockchain, asset }],
    // @ts-ignore
    queryFn: getAssetQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
