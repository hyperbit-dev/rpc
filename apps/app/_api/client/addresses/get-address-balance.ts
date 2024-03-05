import { ApiAddressBalance } from "@/app/(server)/api/v1/explorer/addresses";
import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetAddressBalanceParams = {
  queryKey: [string, string, { address: string; blockchain: string }];
};

export function getAddressBalanceQuery(params: GetAddressBalanceParams) {
  const [, , { address, blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/addresses/${address}/balance?${searchParams.toString()}`;

  return fetchClient<ApiAddressBalance>(url);
}

type GetAddressBalanceQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  address: string;
  blockchain: string;
};

export function useGetAddressBalanceQuery(params: GetAddressBalanceQueryProps) {
  const { address, blockchain, ...options } = params;
  return useQuery<ApiAddressBalance, Error, ApiAddressBalance>({
    queryKey: ["addresses", "balance", { blockchain, address }],
    // @ts-ignore
    queryFn: getAddressBalanceQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
