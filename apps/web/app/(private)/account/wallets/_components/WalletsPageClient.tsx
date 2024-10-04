"use client";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { chains } from "@hyperbitjs/chains";
import { Input } from "@hyperbitui/react";
import * as Popover from "@radix-ui/react-popover";
import * as icons from "react-cryptoicon";
import { Container } from "@/_components/Container";
import { CryptoIcon } from "@/_components/CryptoIcon";
import { CreateWalletDrawer } from "@/_components/CreateWalletDrawer/CreateWalletDrawer";
import { ImportWalletDrawer } from "@/_components/ImportWalletDrawer/ImportWalletDrawer";
import { useState } from "react";
import Link from "next/link";
import { useListWalletsQuery } from "@/_api/client/wallets/queries";

export default function WalletsPageClient() {
  const listWalletsQuery = useListWalletsQuery({});
  const [filter, setFilter] = useState("");

  const filteredWallets = listWalletsQuery?.data?.data ?? [];

  console.log("filteredWallets", filteredWallets);

  return (
    <Container>
      <div className="my-4 text-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              {/* <div className="text-2xl">$1,000,000.00</div>
              <div className="flex gap-4 text-md">
                Portfolio
                <span className="text-gray-500">
                  <span className="text-green-500">+8.75%</span> 24H
                </span>
              </div> */}
            </div>
            <div className="flex gap-4">
              <Input
                type="text"
                // @ts-ignore
                size="sm"
                placeholder="Search..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <ImportWalletDrawer OnClose={() => {}} />
              <CreateWalletDrawer OnClose={() => {}} />
            </div>
          </div>
        </div>
        <div className="border border-gray-300 divide-y divide-gray-300 rounded-t-lg rounded-b-lg border-x">
          <div className="grid grid-cols-[minmax(150px,auto)_auto_150px_125px_125px] gap-4 text-gray-500">
            <div className="px-4 py-2 pl-10">Asset</div>
            <div className="px-4 py-2">Balance</div>
            <div className="px-4 py-2">Price 24H</div>
            <div className="px-4 py-2">Portfolio %</div>
            <div className="px-4 py-2 text-right">Actions</div>
          </div>
          {filteredWallets.map((wallet: any) => {
            // let symbol;
            // Object.values(chains).forEach((chain) => {
            //   if (
            //     wallet._network.id.toLowerCase() ===
            //     chain.mainnet.id.toLowerCase()
            //   ) {
            //     symbol = chain.mainnet.symbol.toUpperCase();
            //   }
            // });

            return (
              <div
                key={wallet.id}
                className="grid items-center grid-cols-[minmax(150px,auto)_auto_150px_125px_125px] gap-4 text-gray-900"
              >
                <div className="p-2 tracking-tight">
                  <div className="flex items-center justify-start gap-2">
                    {/* {symbol && icons?.[symbol] ? (
                      <CryptoIcon Icon={icons[symbol]} size={25} />
                    ) : (
                      <div className="w-6 h-6 bg-black rounded-full"></div>
                    )} */}
                    <div>
                      <div>{wallet.label}</div>
                      <div className="text-xs text-gray-500 uppercase">
                        {wallet.blockchain.network} {wallet.blockchain.symbol}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2">{wallet?.balance}</div>
                <div className="px-4 py-2">
                  ${wallet?.market?.current_price}
                </div>
                <div className="px-4 py-2"></div>
                <div className="flex justify-end gap-2 px-4 py-2">
                  <Link
                    href={`/account/wallets/${wallet._id}`}
                    className="px-2 py-1 text-sm text-right text-brand-500 action:text-brand-700"
                  >
                    Manage
                  </Link>
                  <Popover.Root>
                    <Popover.Trigger asChild>
                      <button
                        aria-label="Wallet Actions"
                        className="text-sm action:text-brand-700"
                      >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        className="flex flex-col gap-1 p-2 text-right bg-white rounded mr-11 drop-shadow-lg"
                        sideOffset={5}
                        side="bottom"
                      >
                        <button
                          type="button"
                          className="px-2 py-1 text-sm text-right text-brand-500 action:text-brand-700"
                        >
                          Withdraw
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 text-sm text-right text-brand-500 action:text-brand-700"
                        >
                          Deposit
                        </button>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
