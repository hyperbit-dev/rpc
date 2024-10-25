import { useQuery } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import * as keys from "../keys";

type ListWalletQueryKey = ReturnType<typeof keys.singleWalletQuery>;

function getWalletQuery({ queryKey }: { queryKey: ListWalletQueryKey }) {
  const { walletId } = keys.singleWalletQueryParams(queryKey);
  const url = `/api/v1/wallets/${walletId}`;
  return fetchNexus<any>(url, {
    method: "GET",
  });
}

export function useGetWalletQuery(
  variables: ReturnType<typeof keys.singleWalletQueryParams>,
) {
  return useQuery({
    queryKey: keys.singleWalletQuery(variables),
    queryFn: getWalletQuery,
  });
}
