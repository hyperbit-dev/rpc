import { ApiMarketLatest } from "@/app/api/v1/market/latest/route";
import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetLatestMarketParams = {
  queryKey: [string, string, { blockchain: string }];
};

export function getLatestMarketQuery(params: GetLatestMarketParams) {
  const [, , { blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/market/latest?${searchParams.toString()}`;

  return fetchClient<ApiMarketLatest>(url);
}

type GetLatestMarketQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
};

export function useGetLatestMarketQuery(params: GetLatestMarketQueryProps) {
  const { blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["market", "latest", { blockchain }],
    // @ts-ignore
    queryFn: getLatestMarketQuery,
    staleTime: 30 * 1000,
    ...options,
  });
}
