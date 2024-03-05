import { AppContainer } from "@/_components/AppContainer";
import { AppHeader } from "@/_components/AppHeader";
import { PageHeader } from "@/_components/PageHeader";
import { Button } from "@hyperbitui/react";
import Link from "next/link";
import { WalletsTable } from "./_components/WalletsTable";
import { AppContent } from "@/_components/AppContent";

export default function WalletPage() {
  return (
    <AppContent>
      <AppHeader border>
        <div className="flex items-center justify-between">
          <PageHeader>Wallets</PageHeader>
          <div className="flex gap-2">
            <Button type="button" size="sm">
              <Link href="/wallets/create">Create</Link>
            </Button>
            <Button type="button" size="sm">
              <Link href="/wallets/import">Import</Link>
            </Button>
          </div>
        </div>
      </AppHeader>
      <AppContainer className="py-4">
        <WalletsTable />
      </AppContainer>
    </AppContent>
  );
}
