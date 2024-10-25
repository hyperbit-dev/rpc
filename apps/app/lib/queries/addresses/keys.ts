export const __all = () => ["addresses"] as const;
export const __list = () => [...__all(), "list"] as const;
export const __get = () => [...__list(), "get"] as const;

export const listAddressesQuery = (params: {}) =>
  [...__list(), params] as const;
export const listAddressesQueryParams = (
  queryKey: ReturnType<typeof listAddressesQuery>,
): any => queryKey[2];

export const getAddressQuery = (params: { addressId: string }) =>
  [...__get(), params] as const;
export const getAddressQueryParams = (
  queryKey: ReturnType<typeof getAddressQuery>,
): { addressId: string } => queryKey[3];
