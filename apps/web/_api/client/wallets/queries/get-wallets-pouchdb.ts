'use client'

import { useQuery } from "@tanstack/react-query";
import PouchDB from "pouchdb";

async function getWalletsQuery() {
  const db = new PouchDB("hyperbit");
  return db.allDocs({
    startkey: "wallets_",
    endkey: "wallets_\uffff",
    include_docs: true,
  });
}

export function useGetWalletsQuery() {
  return useQuery<any, Error, any>({
    queryKey: ["pouchdb-wallets"],
    queryFn: () => getWalletsQuery(),
  });
}
