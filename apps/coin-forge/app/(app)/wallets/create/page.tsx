import { AppContainer } from "@/_components/AppContainer";
import { AppContent } from "@/_components/AppContent";
import { AppHeader } from "@/_components/AppHeader";
import { PageHeader } from "@/_components/PageHeader";
import { CreateWalletForm } from "./_components/CreateWalletForm";

export default function WalletCreatePage() {
  return (
    <>
      <AppHeader>
        <AppContainer className="max-w-lg">
          <div className="flex items-center justify-between">
            <PageHeader>Create Wallet</PageHeader>
          </div>
        </AppContainer>
      </AppHeader>
      <AppContent>
        <AppContainer className="max-w-lg">
          <CreateWalletForm />
        </AppContainer>
      </AppContent>
    </>
  );
}
