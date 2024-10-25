import { ApiAddressBalance } from "@/app/api/v1/explorer/addresses";
import { fetchClient } from "../fetchClient";
import {
  QueryFunction,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

type GetAddressBalanceParams = {
  address: string;
  blockchain: string;
};

const getAddressBalanceQueryFn: QueryFunction<
  ApiAddressBalance,
  [string, string, GetAddressBalanceParams]
> = ({ queryKey }) => {
  const [, , { address, blockchain }] = queryKey;
  const searchParams = new URLSearchParams();
  searchParams.set("blockchain", blockchain);
  const url = `/api/v1/explorer/addresses/${address}/balance?${searchParams.toString()}`;

  return fetchClient<ApiAddressBalance>(url);
};

type GetAddressBalanceQueryProps = Omit<UseQueryOptions, "queryKey"> & {
  address: string;
  blockchain: string;
};

export function useGetAddressBalanceQuery(
  variables: GetAddressBalanceQueryProps,
  options?: UseQueryOptions<ApiAddressBalance, Error, ApiAddressBalance>,
): UseQueryResult<ApiAddressBalance, Error> {
  return useQuery({
    ...options,
    queryKey: [
      "addresses",
      "balance",
      { blockchain: variables.blockchain, address: variables.address },
    ],
    // @ts-ignore
    queryFn: getAddressBalanceQueryFn,
  });
}
