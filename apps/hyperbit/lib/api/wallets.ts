import { Prisma } from "@prisma/client";
import { api } from "../api";

export function getWallets() {
  return api<Prisma.WalletCreateInput[]>(`/api/v1/wallets`, {
    cache: "no-store",
  });
}

export function getWallet(walletId: string) {
  return api<Prisma.WalletCreateInput>(`/api/v1/wallets/${walletId}`, {
    cache: "no-store",
  });
}
