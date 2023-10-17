export type AddressBalanceParams = {
  params: {
    address: string;
    blockchain: string;
  };
};

export type AddressBalanceResponse = {
  assetName: string;
  balance: number;
  received: number;
};

export type AssetDataResponse = {
  name: string;
  amount: number;
  units: number;
  reissuable: number;
  has_ipfs: number;
  ipfs_hash?: string;
  txid_hash?: string;
  verifier_string: string;
};

export type AddressTxIdsResponse = {
  addresses: string[];
  start?: number;
  end?: number;
};

export type AddressUtxosResponse = {
  /** The address base58check encoded */
  address: string;
  /** The asset associated with the UTXOs (RVN for Ravencoin) */
  assetName: string;
  /** The output txid */
  txid: string;
  /** The block height */
  height: number;
  /** The output index */
  outputIndex: number;
  /** The script hex encoded */
  script: string;
  /** The number of satoshis of the output */
  satoshis: number;
};
