import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient";

type GetTransactionsParams = {
  queryKey: [string, { blockchain: string; count: string; skip: string }];
};

export function getTransactionsQuery(params: GetTransactionsParams) {
  const [, { blockchain, count, skip }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  searchParams.set("count", count.toString());
  searchParams.set("skip", skip.toString());
  const url = `/api/v1/explorer/transactions?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetTransactionsQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
  count: string;
  skip: string;
};

export function useGetTransactionsQuery(params: GetTransactionsQueryProps) {
  const { blockchain, count = "0", skip = "10", ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["transactions", { blockchain, count, skip }],
    // @ts-ignore
    queryFn: getTransactionsQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
