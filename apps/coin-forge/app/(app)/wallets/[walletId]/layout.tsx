"use client";
import { Button } from "@hyperbitui/react";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { AppContainer } from "@/_components/AppContainer";
import { AppContent } from "@/_components/AppContent";
import { AppHeader } from "@/_components/AppHeader";
import { PouchDbWalletDoc, pouchClient } from "@/_lib/pouchdb";

import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { PageHeader } from "@/_components/PageHeader";

export default function WalletPageLayout({
  params,
  children,
}: {
  params: { walletId: string };
  children?: ReactNode;
}) {
  const { data } = useSession();
  const pathname = usePathname();
  const [wallet, setWallet] = useState<PouchDbWalletDoc>();

  useEffect(() => {
    const fetchData = async () => {
      const wallet = await pouchClient.getWallet(
        params.walletId,
        data?.user?.id
      );
      setWallet(wallet);
    };

    fetchData().catch(console.error);
  }, [params.walletId, data]);

  return (
    <AppContent>
      <AppHeader border>
        <div className="flex items-center justify-between">
          <PageHeader>Wallet: {wallet?.name}</PageHeader>
          <div className="flex gap-2">
            <Button type="button" size="sm">
              Send
            </Button>
            <Button type="button" size="sm">
              Receive
            </Button>
          </div>
        </div>
        <ul className="flex gap-2 -mx-2 -mb-2 text-sm">
          <li>
            <Link
              className={clsx(
                pathname === `/wallets/${params.walletId}`
                  ? "border-b-brand-500"
                  : "border-b-transparent",
                "inline-block p-2 leading-none border-b-2 action:border-b-brand-500"
              )}
              href={`/wallets/${params.walletId}`}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                pathname === `/wallets/${params.walletId}/addresses`
                  ? "border-b-brand-500"
                  : "border-b-transparent",
                "inline-block p-2 leading-none border-b-2 action:border-b-brand-500"
              )}
              href={`/wallets/${params.walletId}/addresses`}
            >
              Addresses
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                pathname === `/wallets/${params.walletId}/tokens`
                  ? "border-b-brand-500"
                  : "border-b-transparent",
                "inline-block p-2 leading-none border-b-2 action:border-b-brand-500"
              )}
              href={`/wallets/${params.walletId}/tokens`}
            >
              Tokens
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                pathname === `/wallets/${params.walletId}/transactions`
                  ? "border-b-brand-500"
                  : "border-b-transparent",
                "inline-block p-2 leading-none border-b-2 action:border-b-brand-500"
              )}
              href={`/wallets/${params.walletId}/transactions`}
            >
              Transactions
            </Link>
          </li>
        </ul>
      </AppHeader>

      <div className="flex-1 p-4 overflow-auto bg-brand-50/10">{children}</div>
    </AppContent>
  );
}
