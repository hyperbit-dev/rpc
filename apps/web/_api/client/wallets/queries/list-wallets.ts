"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "../../fetchClient";

async function listWalletsQuery() {
  return fetchClient(`/api/v1/wallets`, {
    cache: "no-store",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function useListWalletsQuery({}, opts?: any) {
  return useQuery<any, Error, any>({
    ...opts,
    queryKey: ["wallets"],
    queryFn: () => listWalletsQuery(),
  });
}
