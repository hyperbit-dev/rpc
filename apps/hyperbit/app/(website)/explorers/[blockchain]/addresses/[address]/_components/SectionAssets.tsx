import {
  ClipboardButton,
  NextLink,
  NoDataAvailable,
  SectionCard,
} from "@/components";
import { AddressBalanceResponse, AssetDataResponse } from "@/types/api";
import React from "react";

export function SectionAssets({
  blockchain,
  assets,
}: {
  blockchain: string;
  assets: AssetDataResponse | any[];
}) {
  if (!Object.keys(assets).length) {
    return <NoDataAvailable />;
  }

  return (
    <>
      <div className="px-2 pb-2 grid gap-4 grid-cols-[50px_minmax(175px,auto)_minmax(175px,auto)_minmax(175px,auto)_minmax(175px,auto)] text-sm">
        <div></div>
        <div>Name</div>
        <div>Amount</div>
        <div>Balance</div>
        <div>Received</div>
      </div>
      <SectionCard>
        {Object.keys(assets).map((key) => {
          const asset = assets[key];
          const balance = balances.find(
            (x) => x.assetName === key
          ) as AddressBalanceResponse;
          return (
            <div
              key={key}
              className="py-3 grid gap-4 grid-cols-[50px_minmax(175px,auto)_minmax(175px,auto)_minmax(175px,auto)_minmax(175px,auto)]"
            >
              <div>
                <ClipboardButton value={key} />
              </div>
              <div className="w-full">
                <NextLink
                  className="text-cerulean-500 hover:text-cerulean-700"
                  href={`/explorers/${blockchain}/assets/${key}`}
                >
                  {key}
                </NextLink>
              </div>
              <div>{asset}</div>
              <div>{balance.balance}</div>
              <div>{balance.received}</div>
            </div>
          );
        })}
      </SectionCard>
    </>
  );
}
