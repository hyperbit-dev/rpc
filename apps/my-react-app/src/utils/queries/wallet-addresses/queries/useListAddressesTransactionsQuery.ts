import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "~/utils/fetch-client";
import * as keys from "../keys";

type ListAddressesTransactionsQueryKey = ReturnType<typeof keys.listAddressesTransactionsQuery>;

function listAddressesTransactionsQuery({ queryKey }: { queryKey: ListAddressesTransactionsQueryKey }) {
  const params = keys.listAddressesTransactionsQueryParams(queryKey);
  const queryParams = new URLSearchParams(params).toString();
  const url = `/api/v1/addresses/transactions?${queryParams}`;
  return fetchClient<any>(url, {
    method: "GET",
  });
}

export function useListAddressesTransactionsQuery(
  variables: ReturnType<typeof keys.listAddressesTransactionsQueryParams>,
) {
  return useQuery({
    queryKey: keys.listAddressesTransactionsQuery(variables),
    queryFn: listAddressesTransactionsQuery,
  });
}
