import React from "react";
import { Container, SectionHeader } from "@/components";
import { BlocksTable } from "@/components/explorer";
import { getExplorerSummary } from "@/lib/api/explorer";
import { getMiningInfo } from "@/lib/api/mining";
import { getBlockchainInfo, getBlockchainTxStats } from "@/lib/api/blockchain";
import { getBlocks } from "@/lib/api/blocks";
import { getMarketChart } from "@/lib/api/market";
import clsx from "clsx";
import { SectionCard } from "@/components/SectionCard";
import { Chart } from "./components/Chart";

export default async function Explorer({
  params,
}: {
  params: { subdomain: string };
}) {
  const explorerSummary = await getExplorerSummary(params.subdomain);
  const { miningInfo, blockchainInfo, blockchainTxStats, blocks } =
    explorerSummary;
    console.log('blocks', blocks)
  const marketChart = await getMarketChart(params.subdomain);
  const network = blockchainInfo.chain === "test" ? "Testnet" : "Mainnet";
  const latestPrice =
    !marketChart?.error && marketChart
      ? marketChart.prices[marketChart.prices.length - 1][1]
      : 0;
  const combinedPrices =
    !marketChart?.error && marketChart.prices
      ? marketChart.prices
          // .slice(marketChart.prices.length - 2, marketChart.prices.length - 1)
          .reduce((a, b) => {
            return a + b[1];
          }, 0)
      : 1;
  const avgPrice = !marketChart?.error
    ? combinedPrices / marketChart.prices.length
    : 0;

  return (
    <Container>
      <div className="grid grid-cols-1 my-4 bg-white border-b border-r border-gray-200 divide-x divide-y rounded-md sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-2 border-t border-l border-gray-200 rounded-md">
          <div className="pb-1 text-sm">Network</div>
          <span className="text-lg">{network}</span>
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Last Block</div>
          <span className="text-lg">{miningInfo.blocks}</span>
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Difficulty</div>
          <span className="text-lg">{miningInfo.difficulty}</span>
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Hashrate</div>
          <span className="text-lg">{`${
            miningInfo.hashrate ?? miningInfo.networkhashps
          } MH/s`}</span>
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transaction Count</div>
          <span className="text-lg">
            {blockchainTxStats.txcount.toLocaleString()}
          </span>
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transactions (30 days)</div>
          <span className="text-lg">
            {blockchainTxStats.window_tx_count ?? "N/A"}
          </span>
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transactions Per Second (30 days)</div>
          <span className="text-lg">{blockchainTxStats.txrate}</span>
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">
            Price {blockchainInfo.chain === "test" && "(Mainnet)"}
          </div>
          <span
            className={clsx(
              "text-lg",
              latestPrice >= avgPrice ? "text-green-500" : "text-red-500"
            )}
          >
            ${latestPrice} {latestPrice >= avgPrice ? "↗" : "↘"}
          </span>
        </div>
      </div>
      {!marketChart?.error ? (
        <>
          <SectionHeader>Price (30 days)</SectionHeader>
          <SectionCard>
            {marketChart.prices ? (
              <Chart prices={marketChart.prices} avgPrice={avgPrice} />
            ) : undefined}
          </SectionCard>
        </>
      ) : undefined}
      <SectionHeader>Latest Blocks</SectionHeader>
      <BlocksTable blockchain={params.subdomain} blocks={blocks} />
    </Container>
  );
}
