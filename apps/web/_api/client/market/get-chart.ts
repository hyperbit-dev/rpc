import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetMarketChartParams = {
  queryKey: [string, string, { blockchain: string }];
};

export function getMarketChartQuery(params: GetMarketChartParams) {
  const [, , { blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/market/chart?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetMarketChartQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
};

export function useGetMarketChartQuery(params: GetMarketChartQueryProps) {
  const { blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["market", "chart", { blockchain }],
    // @ts-ignore
    queryFn: getMarketChartQuery,
    staleTime: 30 * 1000,
    ...options,
  });
}
