import { fetchNexus } from "@/utils/fetch-client";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as keys from "../keys";

function createWalletMutation(body: any) {
  return fetchNexus("/api/v1/wallets", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useCreateWalletMutation(
  options?: UseMutationOptions<any, unknown, any>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: createWalletMutation,
    onSuccess: (...args) => {
      const [, params] = args;
      void queryClient.invalidateQueries({
        queryKey: keys.listWalletsQuery(params),
      });
      options?.onSuccess?.(...args);
    },
  });
}
