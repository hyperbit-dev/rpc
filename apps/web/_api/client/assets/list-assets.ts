import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type ListAssetAddressParams = {
  queryKey: [
    string,
    string,
    {
      asset: string;
      blockchain: string;
      count?: number;
      start?: number;
      verbose?: string;
    },
  ];
};

export function geAssetsQuery(params: ListAssetAddressParams) {
  const [, , { asset, blockchain, count, start, verbose }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  searchParams.set("count", count?.toString() ?? "25");
  searchParams.set("start", start?.toString() ?? "0");
  searchParams.set("verbose", verbose?.toString() ?? "true");
  const url = `/api/v1/explorer/assets?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type ListAssetsQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  asset: string;
  blockchain: string;
  count?: number;
  start?: number;
  verbose?: string;
};

export function useListAssetsQuery(params: ListAssetsQueryProps) {
  const { asset, blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["assets", "list", { blockchain, asset }],
    // @ts-ignore
    queryFn: geAssetsQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
