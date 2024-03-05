import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../../fetchClient";
import { GetWalletsResponse } from "../types";
import { useSession } from "next-auth/react";

function getWalletsQuery(accessToken?: string | unknown) {
  return fetchClient<GetWalletsResponse>(`/api/v1/wallets`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function useGetWalletsQuery() {
  const session = useSession();
  return useQuery<any, Error, any>({
    queryKey: ["wallets"],
    // @ts-ignore
    queryFn: () => getWalletsQuery(session.data?.accessToken),
    staleTime: 0,
  });
}

export function getWallet(walletId: string) {
  return fetchClient<any>(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/wallets/${walletId}`,
    {
      cache: "no-store",
    }
  );
}
