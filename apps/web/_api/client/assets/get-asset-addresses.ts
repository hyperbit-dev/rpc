import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAssetAddressParams = {
  queryKey: [string, string, { asset: string; blockchain: string }];
};

export function getAssetAddressesQuery(params: GetAssetAddressParams) {
  const [, , { asset, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/assets/${asset}/addresses?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetAssetAddressesQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  asset: string;
  blockchain: string;
};

export function useGetAssetAddressesQuery(params: GetAssetAddressesQueryProps) {
  const { asset, blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["assets", "addresses", { blockchain, asset }],
    // @ts-ignore
    queryFn: getAssetAddressesQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
