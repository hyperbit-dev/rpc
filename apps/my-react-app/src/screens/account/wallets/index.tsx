import { Button } from "~/components/button";
import { ConnectWalletForm } from "~/components/connect-wallet-form";
import { Container } from "~/components/container";
import { Modal } from "~/components/modal";
import { PageHeader } from "~/components/page-header";
import { WalletsTable } from "./components/wallets-table";
import { useListWalletsQuery } from "~/utils/queries";

export function WalletsScreen() {
  const listWalletsQuery = useListWalletsQuery({});
  const data = listWalletsQuery.data?.data ?? [];

  return (
    <div className="flex flex-col flex-1">
      <PageHeader Title="Wallets" />
      {data.length ? (
        <Container>
          <div className="flex items-center justify-between px-4">
            <div className="flex-1"></div>
            <Modal
              Title="Connect Wallet"
              Trigger={
                <Button
                  Variant="brand"
                  Size="sm"
                  disabled={listWalletsQuery.isLoading}
                >
                  Connect Wallet
                </Button>
              }
              Content={<ConnectWalletForm />}
            />
          </div>
        </Container>
      ) : undefined}
      <WalletsTable isLoading={listWalletsQuery.isLoading} data={data} />
    </div>
  );
}
