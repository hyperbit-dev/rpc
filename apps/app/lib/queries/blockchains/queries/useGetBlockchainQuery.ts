import { useQuery } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import * as keys from "../keys";

type ListBlockchainQueryKey = ReturnType<typeof keys.singleBlockchainQuery>;

function getBlockchainQuery({
  queryKey,
}: {
  queryKey: ListBlockchainQueryKey;
}) {
  const { blockchainId } = keys.singleBlockchainQueryParams(queryKey);
  const url = `/api/v1/blockchains/${blockchainId}`;
  return fetchNexus<any>(url, {
    method: "GET",
  });
}

export function useGetBlockchainQuery(
  variables: ReturnType<typeof keys.singleBlockchainQueryParams>,
) {
  return useQuery({
    queryKey: keys.singleBlockchainQuery(variables),
    queryFn: getBlockchainQuery,
  });
}
