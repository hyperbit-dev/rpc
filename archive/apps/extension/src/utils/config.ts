type Config = {
  database: {
    name: string;
  };
  wallets: {
    defaultLimit: number;
    blockchains: Blockchain;
  };
};

type Blockchain = Record<
  string,
  {
    enabled?: boolean;
  }
>;

export const config: Config = {
  database: {
    name: "hyperbit_ext",
  },
  wallets: {
    defaultLimit: 3,
    blockchains: {
      rvn: {
        enabled: true,
      },
      tvrn: {
        enabled: true,
      },
    },
  },
};
