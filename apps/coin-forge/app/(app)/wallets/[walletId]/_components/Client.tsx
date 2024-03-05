"use client";
import { AppCard } from "@/_components/AppCard";
import { getNetwork } from "@/_lib/blockchain";
import { PouchDbWalletDoc, pouchClient } from "@/_lib/pouchdb";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { ChartCard } from "./ChartCard";

export default function WalletPageClient({ walletId }: { walletId: string }) {
  const { data } = useSession();
  const [wallet, setWallet] = useState<PouchDbWalletDoc>();
  const [latest, setLatest] = useState<any>();
  const [chart, setChart] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const wallet = await pouchClient.getWallet(walletId, data?.user?.id);
      setWallet(wallet);

      const network = getNetwork(wallet.chainId);
      if (network) {
        const latest = await fetch(
          `/api/v1/blockchains/${network.name.toLowerCase()}/market/latest`
        ).then((x) => x.json());
        setLatest(latest);
        const chart = await fetch(
          `/api/v1/blockchains/${network.name.toLowerCase()}/market/chart`
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
  }, [walletId, data?.user?.id]);

  const network = wallet ? getNetwork(wallet.chainId) : undefined;

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col w-full gap-4 sm:flex-1">
        <ChartCard chart={chart} />
      </div>
      <div className="w-full sm:max-w-sm">
        <AppCard
          Header="Details"
          Content={
            <dl className="grid text-sm max-w-md grid-cols-[100px_minmax(200px,_1fr)] gap-1">
              <dt>Blockchain</dt>
              <dd className="capitalize">{network?.name}</dd>
              <dt>Network</dt>
              <dd className="capitalize">{network?.network}</dd>

              <dt>Price</dt>
              <dd>
                {latest
                  ? `$${Number(latest.price).toLocaleString()}`
                  : undefined}
              </dd>
              <dt>Market Cap</dt>
              <dd>
                {latest
                  ? `$${Number(latest.marketCap).toLocaleString()}`
                  : undefined}
              </dd>
              <dt>Total Volume</dt>
              <dd>
                {latest
                  ? `$${Number(latest.totalVolume).toLocaleString()}`
                  : undefined}
              </dd>
            </dl>
          }
        />
      </div>
    </div>
  );
}
