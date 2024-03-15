"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { Details } from "./Details";
import { SectionTxids } from "./SectionTxids";
import { SectionUtxos } from "./SectionUtxos";
import { SectionAssets } from "./SectionAssets";
import { TabsHeader } from "~/_components/TabsHeader";
import { MarketLatest } from "@/_api/client/market/types";
import { ApiAddressBalance } from "@/app/(server)/api/v1/explorer/addresses";

export function Content({
  address,
  marketLatest,
  assetBalances,
  assetsEnabled,
  addressBalance,
  balances,
  addressTxids,
  addressUtxos,
  blockchain,
}: {
  address: string;
  marketLatest?: MarketLatest;
  assetBalances: any | any[];
  assetsEnabled: boolean;
  addressBalance?: any;
  balances?: ApiAddressBalance;
  addressTxids: any[];
  addressUtxos: any[];
  blockchain: string;
}) {
  return (
    <Tabs.Root defaultValue="details">
      <TabsHeader
        tabs={[
          { name: "Details", value: "details" },
          assetsEnabled ? { name: "Assets", value: "assets" } : undefined,
          { name: "Transactions", value: "transactions" },
          { name: "UTXOs", value: "utxo" },
        ]}
        fileName={address}
        data={{
          address,
          assetBalances,
          addressBalance,
          balances,
          addressTxids,
          addressUtxos,
        }}
        className="mb-2"
      />
      <Tabs.Content value="details">
        <Details
          address={address}
          marketLatest={marketLatest}
          addressBalance={addressBalance}
        />
      </Tabs.Content>
      {assetsEnabled ? (
        <Tabs.Content value="assets">
          <SectionAssets
            assetBalances={assetBalances}
            blockchain={blockchain}
          />
        </Tabs.Content>
      ) : undefined}
      <Tabs.Content value="transactions">
        <SectionTxids addressTxids={addressTxids} blockchain={blockchain} />
      </Tabs.Content>
      <Tabs.Content value="utxo">
        <SectionUtxos addressUtxos={addressUtxos} blockchain={blockchain} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
