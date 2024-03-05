import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAddressTxidsParams = {
  queryKey: [string, string, { address: string; blockchain: string }];
};

export function getAddressTxidsQuery(params: GetAddressTxidsParams) {
  const [, , { address, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/addresses/${address}/txids?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetAddressTxidsQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  address: string;
  blockchain: string;
};

export function useGetAddressTxidsQuery(params: GetAddressTxidsQueryProps) {
  const { address, blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["addresses", "txids", { blockchain, address }],
    // @ts-ignore
    queryFn: getAddressTxidsQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
