import { fetchClient } from "~/utils/fetch-client";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as keys from "../keys";
import { NexusWallet } from "../types";

function createWalletMutation(body: any): Promise<NexusWallet> {
  return fetchClient("/api/v1/wallets", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useCreateWalletMutation(
  options?: UseMutationOptions<any, unknown, any>
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: createWalletMutation,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: keys.__list(),
      });
      options?.onSuccess?.(...args);
    },
  });
}
