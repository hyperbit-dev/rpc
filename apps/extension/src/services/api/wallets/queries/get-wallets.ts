import { useQuery } from "@tanstack/react-query";
import PouchDB from "pouchdb";

async function getWalletsQuery() {
  const db = new PouchDB("hyperbit_ext");
  return db.allDocs({
    startkey: "wallets_",
    endkey: "wallets_\uffff",
    include_docs: true,
  });
}

export function useGetWalletsQuery() {
  return useQuery({
    queryKey: ["wallets"],

    queryFn: () => getWalletsQuery(),
  });
}
