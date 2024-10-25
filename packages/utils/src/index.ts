import crypto from "node:crypto";
import base58 from "base-58";
import BigNumber from "bignumber.js";

export function addressFromEx(
  exAddress: string,
  ripdm160Key: string,
): string | null {
  try {
    let versionByte: Uint8Array = getVersionByte(exAddress);
    let addrBase: Buffer = Buffer.concat([
      versionByte,
      Buffer.from(ripdm160Key, "hex"),
    ]);
    let checksum: Buffer = sha256d(addrBase).slice(0, 4);
    let address: Buffer = Buffer.concat([addrBase, Buffer.from(checksum)]);
    return base58.encode(address);
  } catch (e) {
    return null;
  }
}

export function getVersionByte(address: string): Uint8Array {
  return base58.decode(address).slice(0, 1);
}

export function sha256(buff: Buffer): Buffer {
  const hash = crypto.createHash("sha256");
  hash.update(buff);
  return hash.digest();
}

export function sha256d(buff: Buffer): Buffer {
  return sha256(sha256(buff));
}

export function reverseBuffer(buff: Buffer): Buffer {
  const reversed = Buffer.alloc(buff.length);
  for (let i = buff.length - 1; i >= 0; i--) {
    const buffIndex = buff.length - i - 1;
    // @ts-ignore
    reversed[buffIndex] = buff[i];
  }
  return reversed;
}

export function reverseHex(hex: string): string {
  return reverseBuffer(Buffer.from(hex, "hex")).toString("hex");
}

export function reverseByteOrder(buff: Buffer): Buffer {
  for (let i = 0; i < 8; i++) {
    buff.writeUInt32LE(buff.readUint32BE(i * 4), i * 4);
  }
  return reverseBuffer(buff);
}

export function uint256BufferFromHash(hex: string): Buffer {
  let fromHex = Buffer.from(hex, "hex");
  if (fromHex.length !== 32) {
    const empty = Buffer.alloc(32);
    empty.fill(0);
    fromHex.copy(empty);
    fromHex = empty;
  }
  return reverseBuffer(fromHex);
}

export function hexFromReversedBuffer(buff: Buffer): string {
  return reverseBuffer(buff).toString("hex");
}

export function varIntBuffer(n: number): Buffer {
  if (n < 0xfd) {
    return Buffer.from([n]);
  } else if (n <= 0xffff) {
    const buff = Buffer.alloc(3);
    buff[0] = 0xfd;
    buff.writeUInt16LE(n, 1);
    return buff;
  } else if (n <= 0xffffffff) {
    const buff = Buffer.alloc(5);
    buff[0] = 0xfe;
    buff.writeUInt32LE(n, 1);
    return buff;
  }
  const buff = Buffer.alloc(9);
  buff[0] = 0xff;
  exports.packUInt16LE(n).copy(buff, 1);
  return buff;
}

export function varStringBuffer(str: string): Buffer {
  let strBuff = Buffer.from(str);
  return Buffer.concat([varIntBuffer(strBuff.length), strBuff]);
}

export function serializeNumber(n: number): Buffer {
  if (n >= 1 && n <= 16) {
    return Buffer.from([0x50 + n]);
  }
  let l = 1;
  let buff = Buffer.alloc(9);
  while (n > 0x7f) {
    buff.writeUInt8(n & 0xff, l++);
    n >>= 8;
  }
  buff.writeUInt8(l, 0);
  buff.writeUInt8(n, l++);
  return buff.slice(0, l);
}

export function serializeString(s: string): Buffer {
  if (s.length < 253) {
    return Buffer.concat([Buffer.from([s.length]), Buffer.from(s)]);
  } else if (s.length < 0x10000) {
    return Buffer.concat([
      Buffer.from([253]),
      exports.packUInt16LE(s.length),
      Buffer.from(s),
    ]);
  } else if (s.length < 0x100000000) {
    return Buffer.concat([
      Buffer.from([254]),
      exports.packUInt32LE(s.length),
      Buffer.from(s),
    ]);
  }

  return Buffer.concat([
    Buffer.from([255]),
    exports.packUInt16LE(s.length),
    Buffer.from(s),
  ]);
}

export function packUInt16LE(num: number): Buffer {
  let buff = Buffer.alloc(2);
  buff.writeUInt16LE(num, 0);
  return buff;
}

export function packInt32LE(num: number): Buffer {
  let buff = Buffer.alloc(4);
  buff.writeInt32LE(num, 0);
  return buff;
}

export function packInt32BE(num: number): Buffer {
  let buff = Buffer.alloc(4);
  buff.writeInt32BE(num, 0);
  return buff;
}

export function packUInt32LE(num: number): Buffer {
  let buff = Buffer.alloc(4);
  buff.writeUInt32LE(num, 0);
  return buff;
}

export function packUInt32BE(num: number): Buffer {
  let buff = Buffer.alloc(4);
  buff.writeUInt32BE(num, 0);
  return buff;
}

export function packInt64LE(num: number): Buffer {
  let buff = Buffer.alloc(8);
  buff.writeUInt32LE(num % Math.pow(2, 32), 0);
  buff.writeUInt32LE(Math.floor(num / Math.pow(2, 32)), 4);
  return buff;
}

export function range(start: number, stop: number, step: number) {
  if (typeof stop === "undefined") {
    stop = start;
    start = 0;
  }
  if (typeof step === "undefined") {
    step = 1;
  }
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }
  let result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}

export function pubkeyToScript(key: string): Buffer {
  if (key.length !== 66) {
    console.error("Invalid pubkey: " + key);
    throw new Error();
  }
  let pubkey = Buffer.alloc(35);
  pubkey[0] = 0x21;
  pubkey[34] = 0xac;
  Buffer.from(key, "hex").copy(pubkey, 1);
  return pubkey;
}

export function miningKeyToScript(key: string): Buffer {
  let keyBuffer = Buffer.from(key, "hex");
  return Buffer.concat([
    Buffer.from([0x76, 0xa9, 0x14]),
    keyBuffer,
    Buffer.from([0x88, 0xac]),
  ]);
}

export function addressToScript(addr: string): Buffer | void {
  const decoded = base58.decode(addr);
  if (decoded.length !== 25 && decoded.length !== 26) {
    console.error("invalid address length for " + addr);
    throw new Error();
  }
  if (!decoded) {
    console.error("base58 decode failed for " + addr);
    throw new Error();
  }
  const pubkey = decoded.slice(1, -4);
  return Buffer.concat([
    Buffer.from([0x76, 0xa9, 0x14]),
    pubkey,
    Buffer.from([0x88, 0xac]),
  ]);
}

export function getReadableHashRateString(hashrate: number): string {
  let i = -1;
  let byteUnits = [" KH", " MH", " GH", " TH", " PH"];
  do {
    hashrate = hashrate / 1024;
    i++;
  } while (hashrate > 1024);
  return hashrate.toFixed(2) + byteUnits[i];
}

export function shiftMax256Right(shiftRight: number): Buffer {
  let arr256 = Array.apply(null, new Array(256)).map(
    Number.prototype.valueOf,
    1,
  );
  const arrLeft = Array.apply(null, new Array(shiftRight)).map(
    Number.prototype.valueOf,
    0,
  );
  arr256 = arrLeft.concat(arr256).slice(0, 256);
  const octets = [];
  for (let i = 0; i < 32; i++) {
    octets[i] = 0;
    let bits = arr256.slice(i * 8, i * 8 + 8);
    for (let f = 0; f < bits.length; f++) {
      let multiplier = Math.pow(2, f);
      octets[i] += bits[f]! * multiplier;
    }
  }
  return Buffer.from(octets);
}

export function bufferToCompactBits(startingBuff: Buffer): Buffer {
  let bigNum: number = startingBuff.readInt32BE(0);
  let buff = Buffer.from([bigNum]);
  buff =
    buff.readUInt8(0) > 0x7f
      ? Buffer.concat([Buffer.from([0x00]), buff])
      : buff;
  buff = Buffer.concat([Buffer.from([buff.length]), buff]);
  return buff.slice(0, 4);
}

export function bignumFromBitsBuffer(bitsBuff: Buffer): BigNumber {
  let numBytes = bitsBuff.readUInt8(0);
  let bigBits = new BigNumber(bitsBuff.slice(1).readInt32BE(0));
  let target = bigBits.multipliedBy(
    new BigNumber(2).pow(new BigNumber(8).multipliedBy(numBytes - 3)),
  );
  return target;
}

export function bignumFromBitsHex(bitsString: string): BigNumber {
  let bitsBuff = Buffer.from(bitsString, "hex");
  return bignumFromBitsBuffer(bitsBuff);
}

export function convertBitsToBuff(bitsBuff: Buffer): Buffer {
  let target = bignumFromBitsBuffer(bitsBuff);
  let resultBuff = Buffer.from(target);
  let buff256 = Buffer.alloc(32);
  buff256.fill(0);
  resultBuff.copy(buff256, buff256.length - resultBuff.length);
  return buff256;
}

export function getTruncatedDiff(shift: number): Buffer {
  return convertBitsToBuff(bufferToCompactBits(shiftMax256Right(shift)));
}

export function revertByteOrder(buff: Buffer) {
  for (let i = 0; i < 8; ++i)
    buff.writeUInt32LE(buff.readUInt32BE(i * 4), i * 4);
  return exports.revertBuffer(buff);
}

export function revertBuffers(buffers: Buffer[]) {
  return buffers.map((buf) => exports.revertBuffer(buf));
}
