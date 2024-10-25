import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAddressAssetBalancesParams = {
  queryKey: [string, string, { address: string; blockchain: string }];
};

export function getAddressAssetBalancesQuery(
  params: GetAddressAssetBalancesParams,
) {
  const [, , { address, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/addresses/${address}/assets?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetAddressAssetBalancesQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  address: string;
  blockchain: string;
};

export function useGetAddressAssetBalancesQuery(
  params: GetAddressAssetBalancesQueryProps,
) {
  const { address, blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["addresses", "asset-balances", { blockchain, address }],
    // @ts-ignore
    queryFn: getAddressAssetBalancesQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
