import { fetchClient } from "../fetchClient";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export function getExplorerListQuery() {
  return fetchClient<any>("/api/v1/explorer/list");
}

type GetExplorerListQueryProps = Omit<UseQueryOptions, "queryKey">;

export function useGetExplorerListQuery(
  params: GetExplorerListQueryProps
) {
  return useQuery<any, Error, any>({
    queryKey: ["explorer", "list"],
    queryFn: getExplorerListQuery,
    staleTime: 30 * 1000,
    ...params,
  });
}
