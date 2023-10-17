export type AssetName = string;

export type Asset = {
  name: AssetName;
  amount: number;
  units: number;
  reissuable: number;
  has_ipfs: number;
  block_height: number;
  blockhash: string;
};

export type GetAssetDataResponse = {
  name: string;
  amount: number;
  units: number;
  reissuable: number;
  has_ipfs: number;
  ipfs_hash?: string;
  txid_hash?: string;
  verifier_string: string;
};
