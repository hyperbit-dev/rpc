export const __all = () => ["blockchains"] as const;
export const __list = () => [...__all(), "list"] as const;
export const __single = () => [...__list(), "single"] as const;

export const listBlockchainsQuery = (params: {}) =>
  [...__list(), params] as const;
export const listBlockchainsQueryParams = (
  queryKey: ReturnType<typeof listBlockchainsQuery>,
): any => queryKey[2];

export const singleBlockchainQuery = (params: { blockchainId: string }) =>
  [...__single(), params] as const;
export const singleBlockchainQueryParams = (
  queryKey: ReturnType<typeof singleBlockchainQuery>,
): { blockchainId: string } => queryKey[3];
