import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetExplorerSummaryParams = {
  queryKey: [string, { blockchain: string }];
};

export function getExplorerSummaryQuery(params: GetExplorerSummaryParams) {
  const [, { blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("verbosity", "2");
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/summary?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetExplorerSummaryQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
};

export function useGetExplorerSummaryQuery(
  params: GetExplorerSummaryQueryProps
) {
  const { blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["explorer", { blockchain }],
    // @ts-ignore
    queryFn: getExplorerSummaryQuery,
    staleTime: 30 * 1000,
    ...options,
  });
}
