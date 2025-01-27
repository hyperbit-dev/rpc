import { createLazyFileRoute } from "@tanstack/react-router";
import { WalletsScreen } from "~/screens/account/wallets";

export const Route = createLazyFileRoute("/account/wallets/")({
  component: WalletsScreen,
});
