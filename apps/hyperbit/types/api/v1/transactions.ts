/** GetRawTransactionResponse */
export type GetRawTransactionResponse = {
    /** The serialized, hex-encoded data for 'txid' */
    hex: string;
    /** The transaction id (same as provided) */
    txid: string;
    /** The transaction hash (differs from txid for witness transactions) */
    hash: string;
    /** The serialized transaction size */
    size: number;
    /** The virtual transaction size (differs from size for witness transactions) */
    vsize: number;
    /** The version */
    version: number;
    /** The lock time */
    locktime: number;
    vin: GetRawTransactionVin;
    vout: GetRawTransactionVout;
    /** The block hash */
    blockhash: string;
    /** The confirmations */
    confirmations: number;
    /** The transaction time in seconds since epoch (Jan 1 1970 GMT) */
    time: number;
    /** The block time in seconds since epoch (Jan 1 1970 GMT) */
    blocktime: number;
  };
  
  /** GetRawTransactionVin */
  type GetRawTransactionVin = {
    /** The transaction id */
    txid: string;
    vout: number;
    scriptSig: VinScriptSig;
    /** The script sequence number */
    sequence: number;
    /** hex-encoded witness data (if any) */
    txinwitness: string[];
  };
  
  /** VinScriptSig */
  type VinScriptSig = {
    /** the asm */
    asm: string;
    /** the hex */
    hex: string;
  };
  
  /** GetRawTransactionVout */
  type GetRawTransactionVout = {
    /** The value in " + CURRENCY_UNIT + " */
    value: number;
    /** index */
    n: number;
    scriptPubKey: VoutScriptPubKey;
  };
  
  /** VoutScriptPubKey */
  type VoutScriptPubKey = {
    /** the asm */
    asm: string;
    /** the hex */
    hex: string;
    /** The required sigs */
    reqSigs: number;
    /** The type, eg 'pubkeyhash' */
    type: string;
    /** json array of address strings */
    addresses: string;
  };