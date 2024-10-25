export type FaucetBalance = {
  address: string;
  balance: string | number;
  assets: Record<string, string>;
};
