export const __all = () => ["sessions"] as const;
export const __list = () => [...__all(), "list"] as const;
export const __single = () => [...__list(), "single"] as const;

export const listSessionsQuery = (params: {}) => [...__list(), params] as const;
export const listSessionsQueryParams = (
  queryKey: ReturnType<typeof listSessionsQuery>,
): any => queryKey[2];

export const singleSessionQuery = (params: { sessionId: string }) =>
  [...__single(), params] as const;
export const singleSessionQueryParams = (
  queryKey: ReturnType<typeof singleSessionQuery>,
): { sessionId: string } => queryKey[3];
