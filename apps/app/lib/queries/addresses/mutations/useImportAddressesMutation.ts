import { fetchNexus } from "@/utils/fetch-client";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as keys from "../keys";

function importAddressesMutation(body: any) {
  return fetchNexus("/api/v1/addresses/import", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useImportAddressMutation(
  options?: UseMutationOptions<any, unknown, any>
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: importAddressesMutation,
    onSuccess: (...args) => {
      const [, params] = args;
      void queryClient.invalidateQueries({
        queryKey: keys.listAddressesQuery(params),
      });
      options?.onSuccess?.(...args);
    },
  });
}
