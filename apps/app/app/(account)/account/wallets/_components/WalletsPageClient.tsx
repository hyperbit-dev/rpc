"use client";
import { Input } from "@hyperbitui/react";
import * as Popover from "@radix-ui/react-popover";
import { Container } from "@/_components/Container";
import { CreateWalletDialog } from "@/_components/CreateWalletDialog/CreateWalletDialog";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CryptoIcon } from "@/_components/CryptoIcon";
import * as icons from "react-cryptoicon";
import { chains } from "@hyperbitjs/chains";
import { useGetWalletsQuery } from "@/_api/client";
import { ImportWalletDialog } from "@/_components/ImportWalletDialog";

export default function WalletsPageClient() {
  const walletsQuery = useGetWalletsQuery();

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
              {/* @ts-ignore */}
              <Input size="sm" placeholder="Search..." />
              <ImportWalletDialog />
              <CreateWalletDialog />
            </div>
          </div>
        </div>
        <div className="border border-gray-300 divide-y divide-gray-300 rounded-t-lg rounded-b-lg border-x">
          <div className="grid grid-cols-6 gap-4 text-gray-500">
            <div className="px-4 py-2 pl-10">Asset</div>
            <div className="px-4 py-2">Balance</div>
            <div className="px-4 py-2">Tokens</div>
            <div className="px-4 py-2">Price 24H</div>
            <div className="px-4 py-2">Portfolio %</div>
            <div className="px-4 py-2 text-right">Actions</div>
          </div>
          {walletsQuery.data?.wallets.map((wallet: any) => {
            let symbol;
            Object.values(chains).forEach((chain) => {
              if (
                wallet.blockchain.chainId.toLowerCase() ===
                chain.mainnet.id.toLowerCase()
              ) {
                symbol = chain.mainnet.symbol.toUpperCase();
              }
            });

            const hasTokens = wallet.accounts.some((x: any) =>
              x.addresses.some(
                (y: any) =>
                  Object?.keys(y?.balances ?? []).filter((key) => key !== "RVN")
                    .length
              )
            );

            return (
              <div
                key={wallet.id}
                className="grid items-center grid-cols-6 gap-4 text-gray-900"
              >
                <div className="p-2 tracking-tight">
                  <div className="flex items-center justify-start gap-2">
                    {symbol && icons?.[symbol] ? (
                      <CryptoIcon Icon={icons[symbol]} size={25} />
                    ) : (
                      <div className="w-6 h-6 bg-black rounded-full"></div>
                    )}
                    <div>
                      <div>{wallet.label}</div>
                      <div className="text-xs text-gray-500">
                        {wallet.blockchain.name} ({wallet.blockchain.network})
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2">{wallet?.balance}</div>
                <div className="px-4 py-2">{hasTokens ? "Yes" : "No"}</div>
                <div className="px-4 py-2">
                  ${wallet?.market?.current_price}
                </div>
                <div className="px-4 py-2">d</div>
                <div className="flex justify-end gap-2 px-4 py-2">
                  <button
                    type="button"
                    className="px-2 py-1 text-sm text-right text-brand-500 action:text-brand-700"
                  >
                    Manage
                  </button>
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
