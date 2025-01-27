import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "~/utils/fetch-client";
import * as keys from "../keys";
import { NexusWalletAddress } from "../types";

type ListReceiveAddressQueryKey = ReturnType<typeof keys.getReceiveAddressQuery>;

function getReceiveAddressQuery({ queryKey }: { queryKey: ListReceiveAddressQueryKey }) {
  const { walletId } = keys.getReceiveAddressQueryParams(queryKey);
  const url = `/api/v1/addresses/receive?walletId=${walletId}`;
  return fetchClient<NexusWalletAddress>(url, {
    method: "GET",
  });
}

export function useGetReceiveAddressQuery(
  variables: ReturnType<typeof keys.getReceiveAddressQueryParams>,
) {
  return useQuery({
    queryKey: keys.getReceiveAddressQuery(variables),
    queryFn: getReceiveAddressQuery,
  });
}
