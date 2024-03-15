import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../../fetchClient";

async function getWalletQuery({
  walletId,
  chainId,
  addresses,
}: {
  walletId: string;
  chainId: string;
  addresses: string[];
}) {
  return fetchClient(`/api/v1/wallets/${walletId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chainId, addresses }),
  });
}

export function useGetWalletQuery(
  {
    walletId,
    chainId,
    addresses,
  }: {
    walletId: string;
    chainId: string;
    addresses: string[];
  },
  opts: any
) {
  return useQuery<any, Error, any>({
    queryKey: ["wallets", walletId],
    queryFn: () => getWalletQuery({ walletId, chainId, addresses }),
    ...opts,
  });
}
