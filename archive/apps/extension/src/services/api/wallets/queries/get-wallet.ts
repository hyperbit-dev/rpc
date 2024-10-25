import { useQuery } from "@tanstack/react-query";
import PouchDB from "pouchdb";

async function getWalletQuery({ walletId }: { walletId: string }) {
  const db = new PouchDB("hyperbit_ext");
  return db.get(walletId, {
    attachments: true,
  });
}

export function useGetWalletQuery({ walletId }: { walletId: string }) {
  return useQuery({
    queryKey: ["wallets", walletId],
    queryFn: () => getWalletQuery({ walletId }),
  });
}
