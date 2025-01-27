import { useQuery } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import * as keys from "../keys";
import { AuthToken } from "../types";

type ListSessionsQueryKey = ReturnType<typeof keys.listSessionsQuery>;

function listSessionsQuery({ queryKey }: { queryKey: ListSessionsQueryKey }) {
  const params = keys.listSessionsQueryParams(queryKey);
  const queryParams = new URLSearchParams(params).toString();
  const url = `/api/v1/auth/sessions?${queryParams}`;
  return fetchNexus<AuthToken[]>(url, {
    method: "GET",
  });
}

export function useListSessionsQuery(
  variables: ReturnType<typeof keys.listSessionsQueryParams>,
) {
  return useQuery({
    queryKey: keys.listSessionsQuery(variables),
    queryFn: listSessionsQuery,
  });
}
