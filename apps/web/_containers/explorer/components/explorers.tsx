"use client";
import Link from "next/link";
import Image from "next/image";
import { MewcSvg } from "./mewc-svg";
import { RvnSvg } from "./rvn-svg";
import { useGetExplorerListQuery } from "@/_api/client";
import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import clsx from "clsx";
import { LazySvg } from "@/_components/LazySvg";
import {
  humanReadableMarketCap,
  humanReadablePrice,
  humanReadableTotalVolume,
} from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Explorers() {
  const explorerListQuery = useGetExplorerListQuery({});
  const data = useMemo(() => {
    const mainnet: any[] = [];
    const testnet: any[] = [];
    if (explorerListQuery.data) {
      explorerListQuery.data.forEach((explorer: any) => {
        if (explorer.network === "mainnet") {
          mainnet.push(explorer);
        } else {
          testnet.push(explorer);
        }
      });
    }
    return {
      mainnet,
      testnet,
    };
  }, [explorerListQuery.data]);

  const isLoading = explorerListQuery.isLoading;

  return (
    <Tabs defaultValue="mainnet">
      <TabsList color="green">
        <TabsTrigger
          className="py-0.5 px-1.5 m-0.5 border-b-2 border-transparent hover:bg-gray-100 data-[state=active]:border-brand-500"
          value="mainnet"
        >
          Mainnet
        </TabsTrigger>
        <TabsTrigger
          className="py-0.5 px-1.5 m-0.5 border-b-2 border-transparent hover:bg-gray-100 data-[state=active]:border-brand-500"
          value="testnet"
        >
          Testnet
        </TabsTrigger>
      </TabsList>

      <div className="pt-3">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
            <Skeleton count={1} height={200} />
          </div>
        ) : (
          <>
            <TabsContent value="mainnet">
              <div className="grid grid-cols-2 lg:grid-cols-4 ml-[1px]">
                {data.mainnet.map((explorer: any) => (
                  <Link
                    href={`/explorers/${explorer.network === "testnet" ? `t${explorer.unit.toLowerCase()}` : explorer.unit.toLowerCase()}`}
                    className={clsx(
                      "border border-gray-300 -mt-[1px] -ml-[1px]",
                      "p-4 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                    )}
                    key={explorer.name}
                  >
                    <div className="flex gap-2">
                      <div>
                        {explorer.name === "Ravencoin" ? (
                          <RvnSvg />
                        ) : explorer.name === "Meowcoin" ? (
                          <MewcSvg />
                        ) : explorer.name === "Evrmore" ? (
                          <Image
                            src="/blockchains/evrmore.png"
                            height="50"
                            width="50"
                            alt="Evrmore Logo"
                          />
                        ) : (
                          <LazySvg name={explorer.unit.toLowerCase()} />
                        )}
                      </div>
                      <div className="leading-none flex-1">
                        <div className="font-medium text-xl">
                          {explorer.unit}
                        </div>
                        <div className="font-normal">{explorer.name}</div>
                        <dl className="grid grid-cols-2 py-4 gap-1.5 text-sm">
                          <dt>Blocks</dt>
                          <dd className="text-right">{explorer.latestBlock}</dd>
                          <dt>Price</dt>
                          <dd className="text-right">
                            {humanReadablePrice(explorer.market.price)}
                          </dd>
                          <dt>Market Cap</dt>
                          <dd className="text-right">
                            {humanReadableMarketCap(explorer.market.marketCap)}
                          </dd>
                          <dt>Total Volume</dt>
                          <dd className="text-right">
                            {humanReadableTotalVolume(
                              explorer.market.totalVolume
                            )}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testnet">
              <div className="grid grid-cols-2 lg:grid-cols-4 ml-[1px]">
                {data.testnet.map((explorer: any) => (
                  <Link
                    href={`/explorers/${explorer.network === "testnet" ? `t${explorer.unit.toLowerCase()}` : explorer.unit.toLowerCase()}`}
                    className={clsx(
                      "border border-gray-300 -mt-[1px] -ml-[1px]",
                      "p-4 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100"
                    )}
                    key={explorer.name}
                  >
                    <div className="flex gap-2">
                      <div>
                        {explorer.name === "Ravencoin" ? (
                          <RvnSvg />
                        ) : explorer.name === "Meowcoin" ? (
                          <MewcSvg />
                        ) : explorer.name === "Evrmore" ? (
                          <Image
                            src="/blockchains/evrmore.png"
                            height="50"
                            width="50"
                            alt="Evrmore Logo"
                          />
                        ) : (
                          <LazySvg name={explorer.unit.toLowerCase()} />
                        )}
                      </div>
                      <div className="leading-none flex-1">
                        <div className="font-medium text-xl">
                          {explorer.unit}
                        </div>
                        <div className="font-normal">{explorer.name}</div>
                        <dl className="grid grid-cols-2 py-4 gap-1.5 text-sm">
                          <dt>Blocks</dt>
                          <dd className="text-right">{explorer.latestBlock}</dd>
                          <dt>Price</dt>
                          <dd className="text-right">
                            {humanReadablePrice(explorer.market.price)}
                          </dd>
                          <dt>Market Cap</dt>
                          <dd className="text-right">
                            {humanReadableMarketCap(explorer.market.marketCap)}
                          </dd>
                          <dt>Total Volume</dt>
                          <dd className="text-right">
                            {humanReadableTotalVolume(
                              explorer.market.totalVolume
                            )}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}
