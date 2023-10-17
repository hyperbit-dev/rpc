"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { BlockDetails } from "./BlockDetails";
import { JsonContent } from "@/components/JsonContent";
import { TabsHeader } from "@/components/TabsHeader";

export function Content({ block }: { block: any }) {
  return (
    <Tabs.Root defaultValue="details">
      <TabsHeader
        tabs={[
          { name: "Details", value: "details" },
        ]}
        fileName={block.blockhash}
        data={block}
      />
      <Tabs.Content value="details">
        <BlockDetails block={block} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
