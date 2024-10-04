import { useQuery } from "@tanstack/react-query";
import PouchDB from "pouchdb";

async function getPouchWalletsQuery() {
  const db = new PouchDB("hyperbit_ext");
  return db.allDocs({
    startkey: "wallets_",
    endkey: "wallets_\uffff",
    include_docs: true,
  });
}

export function useGetPouchWalletsQuery() {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: () => getPouchWalletsQuery(),
  });
}
