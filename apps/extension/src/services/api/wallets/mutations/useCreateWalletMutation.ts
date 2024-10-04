import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "~/utils";

export function useCreateWalletMutation() {
  return useMutation({
    mutationFn: (data: {
      externalId: string;
      chainId: string;
      label: string;
    }) => {
      return fetchClient(`${import.meta.env.VITE_API_URL}/api/v1/wallets`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  });
}
