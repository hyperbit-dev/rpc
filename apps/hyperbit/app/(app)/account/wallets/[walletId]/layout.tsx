import { ReactNode } from "react";
import Link from "next/link";
import { getWallet } from "@/lib/api/wallets";
import { AppPageHeader, AppContainer, Container } from "@/components";

export default async function Layout({
  children,
  params,
}: {
  children?: ReactNode;
  params: { walletId: string };
}) {
  const wallet = await getWallet(params.walletId);

  return (
    <AppContainer>
      <Container>
        <AppPageHeader
          title={`Wallet: ${wallet?.name ?? "Wallet Not Found"}`}
        />
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <Link
            href={`/account/wallets/${params.walletId}`}
            className="inline-block py-1 text-sm border-b-2 border-brand-500"
          >
            Overview
          </Link>
          <Link
            href={`/account/wallets/${params.walletId}/addresses`}
            className="inline-block py-1 text-sm"
          >
            Addresses
          </Link>
          <Link
            href={`/account/wallets/${params.walletId}/transactions`}
            className="inline-block py-1 text-sm"
          >
            Transactions
          </Link>
        </div>
        {children}
      </Container>
    </AppContainer>
  );
}
