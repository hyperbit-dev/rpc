"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { JsonContent } from "@/components/JsonContent";
import { TabsHeader } from "@/components/TabsHeader";
import { Details } from "./Details";
import {
  AddressBalanceResponse,
  AddressTxIdsResponse,
  AddressUtxosResponse,
  AssetDataResponse,
  MarketLatest,
} from "@/types/api";
import { SectionTxids } from "./SectionTxids";
import { SectionUtxos } from "./SectionUtxos";
import { config } from "@/lib/config";
import { SectionAssets } from "./SectionAssets";

export function Content({
  address,
  marketLatest,
  assets,
  assetsEnabled,
  addressBalance,
  balances,
  addressTxIds,
  addressUtxos,
}: {
  address: string;
  marketLatest: MarketLatest;
  assets: AssetDataResponse | any[];
  assetsEnabled: boolean;
  addressBalance?: AddressBalanceResponse;
  balances: AddressBalanceResponse[];
  addressTxIds: AddressTxIdsResponse[];
  addressUtxos: AddressUtxosResponse[];
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
          assets,
          addressBalance,
          balances,
          addressTxIds,
          addressUtxos,
        }}
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
          <SectionAssets assets={assets} />
        </Tabs.Content>
      ) : undefined}
      <Tabs.Content value="transactions">
        <SectionTxids addressTxIds={addressTxIds} />
      </Tabs.Content>
      <Tabs.Content value="utxo">
        <SectionUtxos addressUtxos={addressUtxos} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
