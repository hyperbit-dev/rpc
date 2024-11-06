import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAssetAddressParams = {
  queryKey: [
    string,
    string,
    { asset: string; blockchain: string; start: string; count: string },
  ];
};

export function getAssetAddressesQuery(params: GetAssetAddressParams) {
  const [, , { asset, blockchain, start, count }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  searchParams.set("asset", asset);
  searchParams.set("start", start);
  searchParams.set("count", count);
  const url = `/api/v1/explorer/assets/${asset}/addresses?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetAssetAddressesQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  asset: string;
  blockchain: string;
  start: string;
  count: string;
};

export function useGetAssetAddressesQuery(params: GetAssetAddressesQueryProps) {
  const { asset, blockchain, start = "0", count = "25", ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["assets", "addresses", { blockchain, asset, start, count }],
    // @ts-ignore
    queryFn: getAssetAddressesQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
