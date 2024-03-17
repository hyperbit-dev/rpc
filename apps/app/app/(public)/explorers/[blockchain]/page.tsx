"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container } from "~/_components/Container";
import {
  useGetExplorerSummaryQuery,
  useGetLatestBlocksQuery,
  useGetMarketChartQuery,
} from "~/_api/client";
import clsx from "clsx";
import { BlocksTable } from "./_components/BlocksTable";
import { Chart } from "./_components/Chart";

export default function Explorer({
  params: { blockchain },
}: {
  params: { blockchain: string };
}) {
  const getExplorerSummaryQuery = useGetExplorerSummaryQuery({
    blockchain,
  });

  const explorerSummary = getExplorerSummaryQuery.data;

  const getLatestBlocksQuery = useGetLatestBlocksQuery({
    blockchain,
  });

  const blocks = getLatestBlocksQuery.data;

  const getMarketChartQuery = useGetMarketChartQuery({
    blockchain,
  });

  const marketChart = getMarketChartQuery.data;

  const network =
    explorerSummary?.blockchainInfo?.chain === "test" ? "Testnet" : "Mainnet";

  const latestPrice =
    !marketChart?.error && !!marketChart
      ? marketChart.prices[marketChart.prices.length - 1][1]
      : 0;
  const combinedPrices =
    !marketChart?.error && !!marketChart
      ? marketChart.prices
          // .slice(marketChart.prices.length - 2, marketChart.prices.length - 1)
          ?.reduce?.((a: any, b: any) => {
            return a + b[1];
          }, 0)
      : 1;
  const avgPrice =
    !marketChart?.error && !!marketChart
      ? combinedPrices / marketChart.prices.length
      : 0;

  const version = explorerSummary?.version
    ? explorerSummary?.version.toString()
    : "";
  const bug = version.slice(version.length - 3);
  const minor = version.slice(version.length - 6, version.length - 3);
  const major = version.slice(0, version.length - 6);

  return (
    <Container>
      <div className="grid grid-cols-1 my-4 bg-white border-b border-r border-gray-200 divide-x divide-y rounded-md sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-2 border-t border-l border-gray-200 rounded-md">
          <div className="pb-1 text-sm">Network</div>
          {getExplorerSummaryQuery.isLoading ? (
            <Skeleton />
          ) : getExplorerSummaryQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {network}{" "}
              <small>
                v{major.replace(/^0+|0+$/g, "") || 0}.
                {minor.replace(/^0+|0+$/g, "") || 0}.
                {bug.replace(/^0+|0+$/g, "") || 0}
              </small>
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Last Block</div>
          {getExplorerSummaryQuery.isLoading ? (
            <Skeleton />
          ) : getExplorerSummaryQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.miningInfo.blocks}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Difficulty</div>
          {getExplorerSummaryQuery.isLoading ? (
            <Skeleton />
          ) : getExplorerSummaryQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.miningInfo.difficulty}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Hashrate</div>
          {getExplorerSummaryQuery.isLoading ? (
            <Skeleton />
          ) : getExplorerSummaryQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">{`${
              explorerSummary?.miningInfo.hashrate ??
              explorerSummary?.miningInfo.networkhashps
            } MH/s`}</span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transaction Count</div>
          {getExplorerSummaryQuery.isLoading ? (
            <Skeleton />
          ) : getExplorerSummaryQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.blockchainTxStats.txcount.toLocaleString()}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transactions (30 days)</div>
          {getExplorerSummaryQuery.isLoading ? (
            <Skeleton />
          ) : getExplorerSummaryQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.blockchainTxStats.window_tx_count ?? "N/A"}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transactions Per Second (30 days)</div>
          {getExplorerSummaryQuery.isLoading ? (
            <Skeleton />
          ) : getExplorerSummaryQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.blockchainTxStats.txrate}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">
            Price{" "}
            {explorerSummary?.blockchainInfo.chain === "test" && "(Mainnet)"}
          </div>
          {getMarketChartQuery.isLoading ? (
            <Skeleton />
          ) : getMarketChartQuery.isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span
              className={clsx(
                "text-lg",
                latestPrice >= avgPrice ? "text-green-500" : "text-red-500"
              )}
            >
              ${latestPrice} {latestPrice >= avgPrice ? "↗" : "↘"}
            </span>
          )}
        </div>
      </div>
      {getMarketChartQuery.isLoading ? (
        <Skeleton height={300} />
      ) : !marketChart?.error ? (
        <>
          <div className="flex items-center justify-between">
            <div>Price (30 days)</div>
            {getMarketChartQuery?.dataUpdatedAt ? (
              <div className="text-sm">
                Last Update:{" "}
                {new Date(
                  getMarketChartQuery?.dataUpdatedAt
                ).toLocaleTimeString()}
              </div>
            ) : undefined}
          </div>
          <div>
            {marketChart?.prices ? (
              <Chart prices={marketChart.prices} avgPrice={avgPrice} />
            ) : undefined}
          </div>
        </>
      ) : undefined}
      {getLatestBlocksQuery.isLoading ? (
        <>
          <div className="my-4">
            <Skeleton height={30} />
          </div>
          <Skeleton count={10} height={20} />
        </>
      ) : blocks?.length ? (
        <>
          <div className="flex items-center justify-between">
            <div className="mt-4">Latest Blocks</div>
            {getExplorerSummaryQuery?.dataUpdatedAt ? (
              <div className="text-sm">
                Last Update:{" "}
                {new Date(
                  getExplorerSummaryQuery?.dataUpdatedAt
                ).toLocaleTimeString()}
              </div>
            ) : undefined}
          </div>
          <BlocksTable blockchain={blockchain} blocks={blocks} />
        </>
      ) : undefined}
    </Container>
  );
}
