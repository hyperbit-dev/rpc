export const fetchRpc = (blockchain: string, method: string, params: any) => {
  return fetch(`/api/v1/blockchains/${blockchain}/rpc/${method}`, {
    method: "POST",
    body: JSON.stringify({
      method,
      params,
    }),
  }).then((res) => res.json());
};
