import { createFileRoute } from "@tanstack/react-router";
import { WalletScreen } from "~/screens/account/wallet";

export const Route = createFileRoute("/account/wallets/$walletId")({
  component: WalletScreen,
});
