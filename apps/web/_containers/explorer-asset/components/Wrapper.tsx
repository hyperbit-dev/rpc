"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { TabsHeader } from "@/_components/TabsHeader";
import { TabOverview } from "./TabOverview";
import { TabAddresses } from "./TabAddresses";

export function Wrapper({
  name,
  blockchain,
  start = "0",
  count = "25",
}: {
  name: string | string[];
  blockchain: string;
  start: string;
  count: string;
}) {
  const assetName = Array.isArray(name) ? name.join("-") : name;

  return (
    <>
      <div className="-mt-4 py-12 bg-gray-100 border-b border-gray-200">
        <Container>
          <PageHeader>Asset: {assetName}</PageHeader>
        </Container>
      </div>
      <Tabs.Root defaultValue="overview">
        <div className="border-b border-gray-200 py-2 mb-4">
          <Container>
            <div className="flex items-center">
              <TabsHeader tabs={[{ name: "Overview", value: "overview" }]} />
              <TabsHeader tabs={[{ name: "Addresses", value: "addresses" }]} />
            </div>
          </Container>
        </div>
        <Container>
          <Tabs.Content value="overview">
            <TabOverview name={assetName} blockchain={blockchain} />
          </Tabs.Content>
          <Tabs.Content value="addresses">
            <TabAddresses
              name={assetName}
              blockchain={blockchain}
              start={start}
              count={count}
            />
          </Tabs.Content>
        </Container>
      </Tabs.Root>
    </>
  );
}
