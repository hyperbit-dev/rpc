import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

type GetFaucetBalanceParams = {
  queryKey: [string, string, { address: string; blockchain: string }];
};

export function getFaucetBalanceQuery(params: GetFaucetBalanceParams) {
  const [, , { blockchain }] = params.queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/faucet/balance?${searchParams.toString()}`;

  return fetchClient<any>(url);
}

type GetFaucetBalanceQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  blockchain: string;
};

export function useGetFaucetBalanceQuery(params: GetFaucetBalanceQueryProps) {
  const { blockchain, ...options } = params;
  return useQuery<any, Error, any>({
    queryKey: ["faucet", "balance", { blockchain }],
    // @ts-ignore
    queryFn: getFaucetBalanceQuery,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
