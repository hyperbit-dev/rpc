"use client";
import { AppContainer } from "@/_components/AppContainer";
import { AppContent } from "@/_components/AppContent";
import { AppHeader } from "@/_components/AppHeader";
import { ClipboardButton } from "@/_components/ClipboardButton";
import { fetchRpc } from "@/_lib/api";
import { getNetwork } from "@/_lib/blockchain";
import { PouchDbWalletDoc, pouchClient } from "@/_lib/pouchdb";
import { Button } from "@hyperbit-private/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

export default function WalletAddressPage({
  params,
}: {
  params: { walletId: string };
}) {
  const { data } = useSession();
  const [wallet, setWallet] = useState<PouchDbWalletDoc>();
  const [latest, setLatest] = useState<any>();
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const wallet = await pouchClient.getWallet(
        params.walletId,
        data?.user?.id,
      );
      setWallet(wallet);

      const network = getNetwork(wallet.chainId);
      if (network) {
        const latest = await fetch(
          `/api/v1/blockchains/${network.name.toLowerCase()}/market/latest`,
        ).then((x) => x.json());
        setLatest(latest);
        const chart = await fetch(
          `/api/v1/blockchains/${network.name.toLowerCase()}/market/chart`,
        ).then((x) => x.json());
        setChart(chart);

        const utxos = await fetch(`/api/v1/blockchains/trvn/rpc`, {
          method: "POST",
          body: JSON.stringify({
            method: "getaddressbalance",
            params: ["mvpGj55NAmtfAPsTk88iJ3CvXjo8PGYevo"],
          }),
        }).then((x) => x.json());
        console.log("utxos", utxos);
      }
    };

    fetchData().catch(console.error);
  }, [params.walletId, data?.user?.id]);

  const network = wallet ? getNetwork(wallet.chainId) : undefined;

  const addresses: string[] | undefined = wallet
    ? getAddresses(wallet)
    : undefined;

  function getAddresses(wallet: PouchDbWalletDoc): string[] {
    const addresses: string[] = [];
    wallet?.data?.externalAddresses.forEach((address) =>
      addresses.push(address.address),
    );
    // wallet?.data?.externalAddresses.forEach((address) =>
    //   addresses.push(address.address)
    // );
    return addresses;
  }

  const {
    isLoading,
    error,
    data: rpcData,
  } = useQuery({
    queryKey: ["fetch-rpc"],
    // @ts-ignore
    queryFn: () =>
      fetchRpc("trvn", "getaddressutxos", {
        addresses: [addresses[0], addresses[1]],
      }),
    enabled: !!wallet && !!addresses,
  });

  console.log("rpcData", rpcData);

  // console.log("network", network);
  // console.log("latest", latest);
  // console.log("chart", chart);

  return (
    <div className="py-4">
      <div className="p-4 bg-white border border-gray-300 rounded-lg">
        <h3 className="mb-4">Change Addresses</h3>
        {wallet?.data?.changeAddresses ? (
          <ul>
            {wallet?.data?.changeAddresses.map((address) => (
              <li
                key={address.address}
                className="flex items-center justify-between p-2 text-sm border-b border-gray-300 last:border-b-0"
              >
                <span className="flex-1">{address.address}</span>
                <ClipboardButton value={address.address} />
              </li>
            ))}
          </ul>
        ) : undefined}
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 w-full sm:w-1/2">
          <div className="p-4 border border-gray-300 rounded-lg"></div>
        </div>
        <div className="flex-1 w-full sm:w-1/2">
          <h3 className="mb-4">External Addresses</h3>
          <div className="p-4 border border-gray-300 rounded-lg">
            {wallet?.data?.externalAddresses ? (
              <ul>
                {wallet?.data?.externalAddresses.map((address) => (
                  <li
                    key={address.address}
                    className="flex items-center justify-between p-2 text-sm border-b border-gray-300 last:border-b-0"
                  >
                    <span className="flex-1">{address.address}</span>
                    <ClipboardButton value={address.address} />
                  </li>
                ))}
              </ul>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}
