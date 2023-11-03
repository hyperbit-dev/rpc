import { SectionCard } from "@/components";
import { getWallet } from "@/lib/api/wallets";
import React from "react";
import { Client } from "./_components";

export default async function WalletId({
  params: { walletId },
}: {
  params: { walletId: string };
}) {
  const wallet = await getWallet(walletId);
  return (
    <>
      <Client walletId={walletId} />
      <SectionCard>
        <dl className="flex flex-col gap-2">
          <div className="grid sm:grid-cols-[125px_auto]">
            <dt className="font-semibold">Name</dt>
            <dd>{wallet.name}</dd>
          </div>
          <div className="grid sm:grid-cols-[125px_auto]">
            <dt className="font-semibold">Blockchain</dt>
            <dd>{wallet.blockchain.name}</dd>
          </div>
          <div className="grid sm:grid-cols-[125px_auto]">
            <dt className="font-semibold">Network</dt>
            <dd className="capitalize">{wallet.blockchain.network}</dd>
          </div>
          <div className="grid sm:grid-cols-[125px_auto]">
            <dt className="font-semibold">Active</dt>
            <dd>{wallet.active ? "True" : "False"}</dd>
          </div>
          <div className="grid sm:grid-cols-[125px_auto]">
            <dt className="font-semibold">Favorite</dt>
            <dd>{wallet.favorite ? "True" : "False"}</dd>
          </div>
          <div className="grid sm:grid-cols-[125px_auto]">
            <dt className="font-semibold">Created At</dt>
            <dd>{new Date(wallet.createdAt).toLocaleDateString()}</dd>
          </div>
          <div className="grid sm:grid-cols-[125px_auto]">
            <dt className="font-semibold">Updated At</dt>
            <dd>{new Date(wallet.updatedAt).toLocaleDateString()}</dd>
          </div>
        </dl>
      </SectionCard>
    </>
  );
}
