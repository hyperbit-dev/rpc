import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetchClient } from "../fetchClient";

type ListAssetsParams = {
  queryKey: [
    string,
    { blockchain: string; name?: string; start: string; count: string },
  ];
};

export function getAssetsQuery(params: ListAssetsParams) {
  const [, { blockchain, name = "*", start, count }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  searchParams.set("start", start.toString());
  searchParams.set("count", count.toString());
  searchParams.set("name", name);
  const url = `/api/v1/explorer/assets?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type ListAssetsQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
  name?: string;
  start: string;
  count: string;
};

export function useListAssetsQuery(params: ListAssetsQueryProps) {
  const {
    blockchain,
    name = "*",
    start = "0",
    count = "10",
    ...options
  } = params;
  return useQuery<any, Error, any>({
    queryKey: ["assets", { blockchain, start, count, name }],
    // @ts-ignore
    queryFn: getAssetsQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
