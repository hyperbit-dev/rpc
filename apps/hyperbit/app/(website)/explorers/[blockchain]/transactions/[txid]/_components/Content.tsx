"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { JsonContent } from "@/components/JsonContent";
import { TabsHeader } from "@/components/TabsHeader";
import { Details } from "./Details";
import { GetRawTransactionResponse } from "@/types/api/v1/transactions";

export function Content({
  blockchain,
  transaction,
  inMempool,
  coinbase,
}: {
  blockchain: string;
  transaction: GetRawTransactionResponse;
  inMempool: boolean;
  coinbase: number;
}) {
  return (
    <Tabs.Root defaultValue="details">
      <TabsHeader
        tabs={[{ name: "Details", value: "details" }]}
        fileName={transaction.txid}
        data={transaction}
      />
      <Tabs.Content value="details">
        <Details
          blockchain={blockchain}
          transaction={transaction}
          inMempool={inMempool}
          coinbase={coinbase}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}
