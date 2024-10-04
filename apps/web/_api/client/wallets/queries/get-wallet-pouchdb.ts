"use client";

import { useQuery } from "@tanstack/react-query";
import PouchDB from "pouchdb";

async function getWalletPouchDbQuery({ walletId }: { walletId: string }) {
  const db = new PouchDB("hyperbit");
  return db.get(walletId, {
    attachments: true,
  });
}

export function useGetWalletPouchDbQuery({ walletId }: { walletId: string }) {
  return useQuery<any, Error, any>({
    queryKey: ["pouchdb-wallets", walletId],
    queryFn: () => getWalletPouchDbQuery({ walletId }),
  });
}
