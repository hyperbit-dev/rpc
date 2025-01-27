export const __all = () => ["wallets"] as const;
export const __list = () => [...__all(), "list"] as const;
export const __single = () => [...__list(), "single"] as const;
export const __balance = () => [...__single(), "balance"] as const;

export const listWalletsQuery = (params: {}) => [...__list(), params] as const;
export const listWalletsQueryParams = (
  queryKey: ReturnType<typeof listWalletsQuery>,
): any => queryKey[2];

export const singleWalletQuery = (params: { walletId: string }) =>
  [...__single(), params] as const;
export const singleWalletQueryParams = (
  queryKey: ReturnType<typeof singleWalletQuery>,
): { walletId: string } => queryKey[3];

export const getWalletBalanceQuery = (params: { walletId: string }) =>
  [...__balance(), params] as const;
export const getWalletBalanceQueryParams = (
  queryKey: ReturnType<typeof getWalletBalanceQuery>,
): { walletId: string } => queryKey[4];
