import {
  Alert,
  AppPageHeader,
  Button,
  Container,
  PageHeader,
} from "@/components";
import { getWallets } from "@/lib/api/wallets";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { WalletsTable } from "./_components";

export default async function Wallets() {
  const wallets: Prisma.WalletCreateInput[] = await getWallets();

  return (
    <>
      <Alert>Warning: This feature is still under development</Alert>
      <Container className="flex flex-col flex-1 w-full my-4">
        <AppPageHeader title="Wallets">
          {wallets.length ? (
            <div className="flex gap-2">
              <Button Tag={Link} href="/account/wallets/create">
                Create Wallet
              </Button>
              <Button Tag={Link} href="/account/wallets/import">
                Import Wallet
              </Button>
            </div>
          ) : undefined}
        </AppPageHeader>
        {!wallets.length ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <h3 className="mb-2 text-xl">No Wallets Found</h3>
            <p>Let&apos;s get your first wallet created!</p>
            <div className="flex justify-center w-full max-w-xs gap-2 mx-auto my-4">
              <Button
                Tag={Link}
                href="/account/wallets/create"
                className="flex-1 text-center"
              >
                Create Wallet
              </Button>
              <Button
                Tag={Link}
                href="/account/wallets/import"
                className="flex-1 text-center"
              >
                Import Wallet
              </Button>
            </div>
          </div>
        ) : (
          <WalletsTable wallets={wallets} />
        )}
      </Container>
    </>
  );
}
