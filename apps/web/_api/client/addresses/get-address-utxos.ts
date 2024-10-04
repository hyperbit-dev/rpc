import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAddressUtxosParams = {
  queryKey: [string, string, { address: string; blockchain: string }];
};

export function getAddressUtxosQuery(params: GetAddressUtxosParams) {
  const [, , { address, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/addresses/${address}/utxos?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetAddressUtxosQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  address: string;
  blockchain: string;
};

export function useGetAddressUtxosQuery(params: GetAddressUtxosQueryProps) {
  const { address, blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["addresses", "utxos", { blockchain, address }],
    // @ts-ignore
    queryFn: getAddressUtxosQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
