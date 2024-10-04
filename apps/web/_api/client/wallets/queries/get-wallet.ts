"use client";

import { useQuery } from "@tanstack/react-query";

async function getWalletQuery({
  walletId,
  chainId,
  addresses,
}: {
  walletId: string;
  chainId: string;
  addresses: string[];
}) {
  return fetch(`/api/v1/wallets/${walletId}`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chainId, addresses }),
  }).then((res) => res.json());
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
