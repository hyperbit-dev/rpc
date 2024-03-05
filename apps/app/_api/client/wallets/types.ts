import { CoinGeckoMarket } from "@/app/(server)/api/v1/wallets/types";

export type GetWalletsResponse = {
  wallets: any[];
  market: CoinGeckoMarket[];
};
