export type Block = {
    /** The block hash (same as provided) */
    hash: string;
    /** The number of confirmations, or -1 if the block is not on the main chain */
    confirmations: number;
    /** The block size */
    size: number;
    /** The block size excluding witness data */
    strippedsize: number;
    /** The block weight as defined in BIP 141 */
    weight: number;
    /** The block height or index */
    height: number;
    /** The block version */
    version: number;
    /** The block version formatted in hexadecimal */
    versionHex: string;
    /** The merkle root */
    merkleroot: string;
    /** The transactions */
    tx: any[];
    /** The block time in seconds since epoch (Jan 1 1970 GMT) */
    time: number;
    /** The median block time in seconds since epoch (Jan 1 1970 GMT) */
    mediantime: number;
    /** The nonce */
    nonce: number;
    /** The bits */
    bits: string;
    /** The difficulty */
    difficulty: number;
    /** Expected number of hashes required to produce the chain up to this block (in hex) */
    chainwork: string;
    /** The hash of the previous block */
    previousblockhash: string;
    /** The hash of the next block */
    nextblockhash: string;
  };