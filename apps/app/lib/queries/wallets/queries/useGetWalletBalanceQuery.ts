import { useQuery } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import * as keys from "../keys";

type ListWalletQueryKey = ReturnType<typeof keys.getWalletBalanceQuery>;

function getWalletBalanceQuery({ queryKey }: { queryKey: ListWalletQueryKey }) {
  const { walletId } = keys.getWalletBalanceQueryParams(queryKey);
  const url = `/api/v1/wallets/${walletId}/balance`;
  return fetchNexus<any>(url, {
    method: "GET",
  });
}

export function useGetWalletBalanceQuery(
  variables: ReturnType<typeof keys.getWalletBalanceQueryParams>,
) {
  return useQuery({
    queryKey: keys.getWalletBalanceQuery(variables),
    queryFn: getWalletBalanceQuery,
  });
}
