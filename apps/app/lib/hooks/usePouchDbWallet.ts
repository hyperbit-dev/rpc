"use client";

import { Wallet } from "@hyperbit-private/wallet";
import PouchDB from "pouchdb";
import { useEffect, useState } from "react";
import { useGetWalletQuery } from "../queries";

export function usePouchDbWallet(walletId: string) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getWalletQuery = useGetWalletQuery({ walletId });

  useEffect(() => {
    if (getWalletQuery.isLoading) return;
    const externalId = getWalletQuery.data?.externalId;
    setIsLoading(true);
    setError(null);
    const pouchDb = new PouchDB("hyperbit");
    pouchDb
      .get(externalId, {
        attachments: true,
      })
      .then((doc: any) => {
        const wallet = new Wallet({
          database: "hyperbit",
        });
        wallet
          .init({
            label: doc.label,
            externalId,
            network: doc.wallet._network,
            mnemonic: doc.wallet._mnemonic,
          })
          .then(() => {
            setWallet(wallet);
          });
      })
      .catch((error: { message: any; }) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getWalletQuery.data?.externalId, getWalletQuery.isLoading]);

  const isHookLoading = getWalletQuery.isLoading || isLoading;

  return { wallet, isLoading: isHookLoading, error };
}
