import { fetchClient } from "~/utils/fetch-client";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as keys from "../keys";
import * as walletKeys from "../../wallets/keys";

function importAddressesMutation(body: any) {
  return fetchClient("/api/v1/addresses/import", {
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
      void queryClient.invalidateQueries({
        queryKey: keys.__list(),
      });
      void queryClient.invalidateQueries({
        queryKey: walletKeys.__list(),
      });
      options?.onSuccess?.(...args);
    },
  });
}
