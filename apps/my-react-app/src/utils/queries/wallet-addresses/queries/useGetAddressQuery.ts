import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "~/utils/fetch-client";
import * as keys from "../keys";

type ListAddressQueryKey = ReturnType<typeof keys.getAddressQuery>;

function getAddressQuery({ queryKey }: { queryKey: ListAddressQueryKey }) {
  const { addressId } = keys.getAddressQueryParams(queryKey);
  const url = `/api/v1/addresses/${addressId}`;
  return fetchClient<any>(url, {
    method: "GET",
  });
}

export function useGetAddressQuery(
  variables: ReturnType<typeof keys.getAddressQueryParams>,
) {
  return useQuery({
    queryKey: keys.getAddressQuery(variables),
    queryFn: getAddressQuery,
  });
}
