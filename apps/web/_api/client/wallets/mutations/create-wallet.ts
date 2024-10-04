import { QueryClient, useMutation } from "@tanstack/react-query";
import { fetchNexus } from "../../fetchClient";
// import { useSession } from "next-auth/react";

function createWalletMutation(body: any, accessToken?: string | unknown) {
  return fetchNexus("/api/v1/wallets", {
    cache: "no-store",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
}

export function useCreateWalletMutation() {
  // const session = useSession();
  const session = { data: { accessToken: "" } };
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      createWalletMutation(body, session?.data?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });
}
