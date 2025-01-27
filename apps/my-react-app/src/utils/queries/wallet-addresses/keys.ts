export const __all = () => ["wallet-addresses"] as const;
export const __list = () => [...__all(), "list"] as const;
export const __listTransactions = () =>
  [...__all(), "list", "transactions"] as const;
export const __get = () => [...__list(), "get"] as const;
export const __getReceive = () => [...__get(), "receive"] as const;

export const listAddressesQuery = (params: {}) =>
  [...__list(), params] as const;
export const listAddressesQueryParams = (
  queryKey: ReturnType<typeof listAddressesQuery>
): any => queryKey[2];

export const listAddressesTransactionsQuery = (params: { walletId: string }) =>
  [...__list(), params] as const;
export const listAddressesTransactionsQueryParams = (
  queryKey: ReturnType<typeof listAddressesTransactionsQuery>
): { walletId: string } => queryKey[2];

export const getAddressQuery = (params: { addressId: string }) =>
  [...__get(), params] as const;
export const getAddressQueryParams = (
  queryKey: ReturnType<typeof getAddressQuery>
): { addressId: string } => queryKey[3];

export const getReceiveAddressQuery = (params: { walletId: string }) =>
  [...__getReceive(), params] as const;
export const getReceiveAddressQueryParams = (
  queryKey: ReturnType<typeof getReceiveAddressQuery>
): { walletId: string } => queryKey[4];
