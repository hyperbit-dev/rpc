import { useQuery } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import * as keys from "../keys";

type ListAddressesQueryKey = ReturnType<typeof keys.listAddressesQuery>;

function listAddressesQuery({ queryKey }: { queryKey: ListAddressesQueryKey }) {
  const params = keys.listAddressesQueryParams(queryKey);
  const queryParams = new URLSearchParams(params).toString();
  const url = `/api/v1/addresses?${queryParams}`;
  return fetchNexus<any>(url, {
    method: "GET",
  });
}

export function useListAddressesQuery(
  variables: ReturnType<typeof keys.listAddressesQueryParams>,
) {
  return useQuery({
    queryKey: keys.listAddressesQuery(variables),
    queryFn: listAddressesQuery,
  });
}
