import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAssetsCacheParams = {
  queryKey: [string, string, { blockchain: string }];
};

export function getAssetsCacheQuery(params: GetAssetsCacheParams) {
  const [, , { blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/assets/cache?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetAssetsCacheQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
};

export function useGetAssetsCacheQuery(params: GetAssetsCacheQueryProps) {
  const { blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["assets", "cache", { blockchain }],
    // @ts-ignore
    queryFn: getAssetsCacheQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
