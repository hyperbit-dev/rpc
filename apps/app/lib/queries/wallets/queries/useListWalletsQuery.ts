import { useQuery } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import * as keys from "../keys";

type ListWalletsQueryKey = ReturnType<typeof keys.listWalletsQuery>;

function listWalletsQuery({ queryKey }: { queryKey: ListWalletsQueryKey }) {
  const params = keys.listWalletsQueryParams(queryKey);
  const queryParams = new URLSearchParams(params).toString();
  const url = `/api/v1/wallets?${queryParams}`;
  return fetchNexus<any>(url, {
    method: "GET",
  });
}

export function useListWalletsQuery(
  variables: ReturnType<typeof keys.listWalletsQueryParams>,
) {
  return useQuery({
    queryKey: keys.listWalletsQuery(variables),
    queryFn: listWalletsQuery,
  });
}
