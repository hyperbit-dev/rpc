import { Button } from "~/components/button";
import { ConnectWalletForm } from "~/components/connect-wallet-form";
import { Container } from "~/components/container";
import { Modal } from "~/components/modal";

export function ConnectWalletBanner() {
  return (
    <Container className="flex flex-col items-center justify-center gap-4 h-full">
      <div className="text-center">
        <h2 className="text-3xl">Connect Your Wallet</h2>
        <p className="text-lg">Create or import your wallet to get started!</p>
      </div>
      <Modal
        Title="Connect Wallet"
        Trigger={
          <Button Variant="brand" Size="sm">
            Connect Wallet
          </Button>
        }
        Content={<ConnectWalletForm />}
      />
    </Container>
  );
}
