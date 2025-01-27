import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "~/utils/fetch-client";
import * as keys from "../keys";
import { NexusWallet } from "../types";

type ListWalletQueryKey = ReturnType<typeof keys.singleWalletQuery>;

function getWalletQuery({ queryKey }: { queryKey: ListWalletQueryKey }) {
  const { walletId } = keys.singleWalletQueryParams(queryKey);
  const url = `/api/v1/wallets/${walletId}`;
  return fetchClient<NexusWallet>(url, {
    method: "GET",
  });
}

export function useGetWalletQuery(
  variables: ReturnType<typeof keys.singleWalletQueryParams>
) {
  return useQuery({
    queryKey: keys.singleWalletQuery(variables),
    queryFn: getWalletQuery,
  });
}
