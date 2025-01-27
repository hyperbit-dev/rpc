export type NexusWallet = {
  id: string;
  externalId: string;
  label: string;
  blockchainId: string;
  userId: string;
  encryptionKey: string;
  favorite: boolean;
  type: "hot" | "cold" | "custodial";
  lockedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
  blockchain: any;
  addresses: any[];
  users: any[];

  totalBalance?: {
    balance: number;
    received: number;
  };
  totalAddresses?: number;
  totalAssets?: number;
  marketData?: {
    price: number;
    marketCap: number;
    totalVolume: number;
  };
  marketChart?: {
    // date, price
    prices: [number, number][];
    // date, cap
    marketCaps: [number, number][];
    // date, volume
    totalVolumes: [number, number][];
  };
};
