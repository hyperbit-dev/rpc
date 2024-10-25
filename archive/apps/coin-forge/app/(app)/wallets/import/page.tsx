import { AppHeader } from "@/_components/AppHeader";
import { ImportWalletForm } from "./_components/ImportWalletForm";
import { AppContainer } from "@/_components/AppContainer";
import { PageHeader } from "@/_components/PageHeader";
import { AppContent } from "@/_components/AppContent";

export default function WalletImportPage() {
  return (
    <>
      <AppHeader border>
        <PageHeader>Import Wallet</PageHeader>
      </AppHeader>
      <AppContent>
        <AppContainer className="max-w-lg">
          <ImportWalletForm />
        </AppContainer>
      </AppContent>
    </>
  );
}
