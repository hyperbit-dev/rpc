import BigNumber from "bignumber.js";

declare function addressFromEx(
  exAddress: string,
  ripdm160Key: string,
): string | null;
declare function getVersionByte(address: string): Uint8Array;
declare function sha256(buff: Buffer): Buffer;
declare function sha256d(buff: Buffer): Buffer;
declare function reverseBuffer(buff: Buffer): Buffer;
declare function reverseHex(hex: string): string;
declare function reverseByteOrder(buff: Buffer): Buffer;
declare function uint256BufferFromHash(hex: string): Buffer;
declare function hexFromReversedBuffer(buff: Buffer): string;
declare function varIntBuffer(n: number): Buffer;
declare function varStringBuffer(str: string): Buffer;
declare function serializeNumber(n: number): Buffer;
declare function serializeString(s: string): Buffer;
declare function packUInt16LE(num: number): Buffer;
declare function packInt32LE(num: number): Buffer;
declare function packInt32BE(num: number): Buffer;
declare function packUInt32LE(num: number): Buffer;
declare function packUInt32BE(num: number): Buffer;
declare function packInt64LE(num: number): Buffer;
declare function range(start: number, stop: number, step: number): number[];
declare function pubkeyToScript(key: string): Buffer;
declare function miningKeyToScript(key: string): Buffer;
declare function addressToScript(addr: string): Buffer | void;
declare function getReadableHashRateString(hashrate: number): string;
declare function shiftMax256Right(shiftRight: number): Buffer;
declare function bufferToCompactBits(startingBuff: Buffer): Buffer;
declare function bignumFromBitsBuffer(bitsBuff: Buffer): BigNumber;
declare function bignumFromBitsHex(bitsString: string): BigNumber;
declare function convertBitsToBuff(bitsBuff: Buffer): Buffer;
declare function getTruncatedDiff(shift: number): Buffer;
declare function revertByteOrder(buff: Buffer): any;
declare function revertBuffers(buffers: Buffer[]): any[];

export {
  addressFromEx,
  addressToScript,
  bignumFromBitsBuffer,
  bignumFromBitsHex,
  bufferToCompactBits,
  convertBitsToBuff,
  getReadableHashRateString,
  getTruncatedDiff,
  getVersionByte,
  hexFromReversedBuffer,
  miningKeyToScript,
  packInt32BE,
  packInt32LE,
  packInt64LE,
  packUInt16LE,
  packUInt32BE,
  packUInt32LE,
  pubkeyToScript,
  range,
  reverseBuffer,
  reverseByteOrder,
  reverseHex,
  revertBuffers,
  revertByteOrder,
  serializeNumber,
  serializeString,
  sha256,
  sha256d,
  shiftMax256Right,
  uint256BufferFromHash,
  varIntBuffer,
  varStringBuffer,
};
