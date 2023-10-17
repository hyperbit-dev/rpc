"use client";

import pouchdb from "@/services/pouchdb";

type ClientProps = {
  walletId: string;
};

export function Client({ walletId }: ClientProps) {
  console.log("walletId", walletId);
  pouchdb.get(walletId, { attachments: true }).then(res => {
    console.log('res', res)
  });
  return <div></div>;
}
