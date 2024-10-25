"use client";

import { Button } from "@/components";
import { LazySvg } from "@/components/LazySvg";
import { useGetWalletBalanceQuery, useGetWalletQuery } from "@/lib/queries";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AssetLayout({
  params,
  children,
}: {
  params: { assetId: string };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const getWalletQuery = useGetWalletQuery({ walletId: params.assetId });
  const getWalletBalanceQuery = useGetWalletBalanceQuery({
    walletId: params.assetId,
  });
  const wallet = getWalletQuery.data;
  const walletBalance = getWalletBalanceQuery.data;
  console.log("walletBalance", walletBalance);

  if (getWalletQuery.isLoading || !wallet) {
    return null;
  }

  return (
    <>
      <div className="bg-white -mt-4 mb-4 border-b border-gray-200 divide-y">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center flex-row gap-2">
            <Link href="/account/assets">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </Link>
            <LazySvg name={wallet.blockchain.symbol} />
            <div className="leading-none">
              <h1>{wallet.label}</h1>
              <div className="text-xs text-gray-500">
                {wallet.blockchain.name}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button">Buy</Button>
            <Button type="button" Variant="outline">
              Sell
            </Button>
          </div>
        </div>
        <ul className="flex items-center gap-4 px-4">
          <li>
            <Link
              href={`/account/assets/${params.assetId}`}
              className={clsx(
                "text-sm py-2 block hover:text-brand-500",
                pathname === `/account/assets/${params.assetId}`
                  ? "text-brand-500"
                  : "text-gray-500",
              )}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href={`/account/assets/${params.assetId}/transactions`}
              className={clsx(
                "text-sm py-2 block hover:text-brand-500",
                pathname === `/account/assets/${params.assetId}/transactions`
                  ? "text-brand-500"
                  : "text-gray-500",
              )}
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              href={`/account/assets/${params.assetId}/tokens`}
              className={clsx(
                "text-sm py-2 block hover:text-brand-500",
                pathname === `/account/assets/${params.assetId}/tokens`
                  ? "text-brand-500"
                  : "text-gray-500",
              )}
            >
              NFTs/Tokens
            </Link>
          </li>
          <li>
            <Link
              href={`/account/assets/${params.assetId}/addresses`}
              className={clsx(
                "text-sm py-2 block hover:text-brand-500",
                pathname === `/account/assets/${params.assetId}/addresses`
                  ? "text-brand-500"
                  : "text-gray-500",
              )}
            >
              Addresses
            </Link>
          </li>
          <li>
            <Link
              href={`/account/assets/${params.assetId}/settings`}
              className={clsx(
                "text-sm py-2 block hover:text-brand-500",
                pathname === `/account/assets/${params.assetId}/settings`
                  ? "text-brand-500"
                  : "text-gray-500",
              )}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
}
