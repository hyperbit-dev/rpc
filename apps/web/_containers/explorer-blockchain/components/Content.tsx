"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container } from "~/_components/Container";
import {
  useGetBlocksQuery,
  useGetExplorerSummaryQuery,
  useGetMarketChartQuery,
} from "~/_api/client";
import clsx from "clsx";
import { BlocksTable } from "./BlocksTable";
import Link from "next/link";
import { LightweightChart } from "./LightweightChart";

function humanReadableDifficulty(difficulty: number) {
  const units = ["", "K", "M", "G", "T", "P", "E", "Z", "Y"];
  let index = 0;

  // Divide the difficulty until it is small enough to be represented in the current unit
  while (difficulty >= 1000 && index < units.length - 1) {
    difficulty /= 1000;
    index++;
  }

  // Format to two decimal places and append the appropriate unit
  return `${difficulty.toFixed(2)} ${units[index]}`;
}

function humanReadableHashrate(hashrate: number) {
  const units = [
    "H/s",
    "KH/s",
    "MH/s",
    "GH/s",
    "TH/s",
    "PH/s",
    "EH/s",
    "ZH/s",
    "YH/s",
  ];
  let index = 0;

  // Divide the hashrate until it is small enough to be represented in the current unit
  while (hashrate >= 1000 && index < units.length - 1) {
    hashrate /= 1000;
    index++;
  }
  // Format to two decimal places and append the appropriate unit
  return `${hashrate.toFixed(2)} ${units[index]}`;
}

export function Content({ blockchain }: { blockchain: string }) {
  const getExplorerSummaryQuery = useGetExplorerSummaryQuery({
    blockchain,
  });
  const explorerSummary = getExplorerSummaryQuery.data;

  const getBlocksQuery = useGetBlocksQuery({
    offset: "0",
    limit: "10",
    blockchain,
  });
  const blocks = getBlocksQuery.data;

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

  const isLoading =
    getExplorerSummaryQuery.isLoading || getMarketChartQuery.isLoading;
  const isError =
    getExplorerSummaryQuery.isError ||
    getMarketChartQuery.isError ||
    !explorerSummary?.blockchainInfo ||
    !explorerSummary?.miningInfo ||
    !explorerSummary?.blockchainTxStats;

  return (
    <Container>
      <div className="grid grid-cols-1 my-4 bg-white border-b border-r border-gray-200 divide-x divide-y rounded-md sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-2 border-t border-l border-gray-200 rounded-md">
          <div className="pb-1 text-sm">Network</div>
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
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
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.miningInfo.blocks}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Difficulty</div>
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {humanReadableDifficulty(explorerSummary?.miningInfo.difficulty)}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Hashrate</div>
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {humanReadableHashrate(
                explorerSummary?.miningInfo.hashrate ??
                  explorerSummary?.miningInfo.networkhashps
              )}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transaction Count</div>
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.blockchainTxStats.txcount.toLocaleString()}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transactions (30 days)</div>
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {explorerSummary?.blockchainTxStats.window_tx_count ?? "N/A"}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">Transactions Per Day (30 days)</div>
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
            <span className="text-lg">Unavailable</span>
          ) : (
            <span className="text-lg">
              {(
                explorerSummary?.blockchainTxStats.txrate *
                60 *
                60 *
                24
              ).toFixed(2)}
            </span>
          )}
        </div>
        <div className="p-2">
          <div className="pb-1 text-sm">
            Price{" "}
            {explorerSummary?.blockchainInfo.chain === "test" && "(Mainnet)"}
          </div>
          {isLoading ? (
            <Skeleton />
          ) : isError ? (
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
      {isLoading ? (
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
            {marketChart?.ohlc ? (
              <LightweightChart marketChart={marketChart} />
            ) : undefined}
          </div>
        </>
      ) : undefined}
      {getBlocksQuery.isLoading ? (
        <>
          <div className="my-4">
            <Skeleton height={30} />
          </div>
          <Skeleton count={10} height={20} />
        </>
      ) : blocks?.length ? (
        <>
          <div className="flex items-center justify-between mt-4 ">
            <div className="flex items-center space-x-4">
              <span>Latest Blocks</span>
              <Link
                className="text-sm outline-none hover:text-brand-500 focus:text-brand-500 active:text-brand-500"
                href={`/explorers/${blockchain}/blocks`}
              >
                See All &raquo;
              </Link>
            </div>
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
