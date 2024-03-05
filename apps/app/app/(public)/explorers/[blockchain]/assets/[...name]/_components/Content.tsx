"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { Details } from "./Details";
import { TabsHeader } from "~/_components/TabsHeader";

export function Content({
  blockchain,
  asset,
  addresses,
}: {
  blockchain: string;
  asset: any;
  addresses: any;
}) {
  return (
    <Tabs.Root defaultValue="details">
      <TabsHeader
        tabs={[{ name: "Details", value: "details" }]}
        fileName={asset.name}
        data={{ asset, addresses }}
        className="mb-2"
      />
      <Tabs.Content value="details">
        <Details asset={asset} addresses={addresses} blockchain={blockchain} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
