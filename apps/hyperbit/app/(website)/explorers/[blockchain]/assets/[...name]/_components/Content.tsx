"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { JsonContent } from "@/components/JsonContent";
import { TabsHeader } from "@/components/TabsHeader";
import { Details } from "./Details";
import { GetAssetDataResponse } from "@/types/api";

export function Content({
  blockchain,
  asset,
  addresses,
}: {
  blockchain: string;
  asset: GetAssetDataResponse;
  addresses: any;
}) {
  return (
    <Tabs.Root defaultValue="details">
      <TabsHeader
        tabs={[{ name: "Details", value: "details" }]}
        fileName={asset.name}
        data={{ asset, addresses }}
      />
      <Tabs.Content value="details">
        <Details asset={asset} addresses={addresses} blockchain={blockchain} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
