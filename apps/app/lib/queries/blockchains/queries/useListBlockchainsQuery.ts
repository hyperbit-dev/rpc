import { useQuery } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import * as keys from "../keys";

type ListBlockchainsQueryKey = ReturnType<typeof keys.listBlockchainsQuery>;

function listBlockchainsQuery({
  queryKey,
}: {
  queryKey: ListBlockchainsQueryKey;
}) {
  const params = keys.listBlockchainsQueryParams(queryKey);
  const queryParams = new URLSearchParams(params).toString();
  const url = `/api/v1/blockchains?${queryParams}`;
  return fetchNexus<any>(url, {
    method: "GET",
  });
}

export function useListBlockchainsQuery(
  variables: ReturnType<typeof keys.listBlockchainsQueryParams>
) {
  return useQuery({
    queryKey: keys.listBlockchainsQuery(variables),
    queryFn: listBlockchainsQuery,
  });
}
