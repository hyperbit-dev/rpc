import { Buffer } from "node:buffer";
import BigNumber from "bignumber.js";
import multiHashing from "multi-hashing";
import meowpow from "meowpow-hasher";
import evrprogpow from "hasher-evrprogpow";
import * as utils from "@hyperbit-private/utils";
import type { Algorithm, CoinConfig } from "./types";

const unknownDiff =
  "00000000ffff0000000000000000000000000000000000000000000000000000";

export const algorithms: Record<string, Algorithm> = {
  // Allium Algorithm
  allium: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.allium.apply(this, arguments);
      };
    },
  },

  // Blake Algorithm
  blake: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.blake.apply(this, arguments);
      };
    },
  },

  blake2s: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.blake2s.apply(this, arguments);
      };
    },
  },

  // C11 Algorithm
  c11: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.c11.apply(this, arguments);
      };
    },
  },

  // Equihash Algorithm (WIP)
  equihash: {
    multiplier: 1,
    diff: parseInt(
      "0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    ),
    hash: function (options: any) {
      const parameters = options.parameters || {};
      const N = parameters.N || 200;
      const K = parameters.K || 9;
      const P = parameters.P || "ZcashPoW";
      return () => {
        return multiHashing.equihash.apply(this, [
          arguments[0],
          arguments[1],
          P,
          N,
          K,
        ]);
      };
    },
  },

  // Firopow Algorithm
  firopow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 1300,
    hash: function () {
      return () => {
        return multiHashing.firopow.apply(this, arguments);
      };
    },
  },

  // Fugue Algorithm
  fugue: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.fugue.apply(this, arguments);
      };
    },
  },

  // Ghostrider Algorithm
  ghostrider: {
    multiplier: Math.pow(2, 16),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.ghostrider.apply(this, arguments);
      };
    },
  },

  // Groestl Algorithm
  groestl: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.groestl.apply(this, arguments);
      };
    },
  },

  polytimos: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.polytimos.apply(this, arguments);
      };
    },
  },

  neoscrypt: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.neoscrypt.apply(this, arguments);
      };
    },
  },

  // Meowpow Algorithm
  meowpow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 15000,
    hash: function () {
      return () => {
        return meowpow.meowpow.apply(this, arguments);
      };
    },
  },

  // Kawpow Algorithm
  kawpow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 7500,
    hash: function () {
      return () => {
        return multiHashing.kawpow.apply(this, arguments);
      };
    },
  },

  // ProgPow Algorithm
  evrprogpow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 12000,
    hash: function () {
      return () => {
        return evrprogpow.apply(this, arguments);
      };
    },
  },

  // Keccak Algorithm
  keccak: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function (coinConfig: CoinConfig) {
      if (coinConfig.normalHashing === true) {
        return (data: any, nTimeInt: any) => {
          return multiHashing.keccak.apply(this, [
            multiHashing.keccak(
              Buffer.concat([data, Buffer.from(nTimeInt.toString(16), "hex")])
            ),
          ]);
        };
      } else {
        return () => {
          return multiHashing.keccak.apply(this, arguments);
        };
      }
    },
  },

  // Minotaur Algorithm
  minotaur: {
    multiplier: Math.pow(2, 12),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.minotaur.apply(this, arguments);
      };
    },
  },

  // MinotaurX Algorithm
  minotaurx: {
    multiplier: Math.pow(2, 12),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.minotaurx.apply(this, arguments);
      };
    },
  },

  // Nist5 Algorithm
  nist5: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.nist5.apply(this, arguments);
      };
    },
  },

  // Quark Algorithm
  quark: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.quark.apply(this, arguments);
      };
    },
  },

  // Qubit Algorithm
  qubit: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.qubit.apply(this, arguments);
      };
    },
  },

  tribus: {
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.tribus.apply(this, arguments);
      };
    },
  },

  xevan: {
    multiplier: Math.pow(2, 24),
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.xevan.apply(this, arguments);
      };
    },
  },

  // Scrypt Algorithm
  scrypt: {
    multiplier: Math.pow(2, 16),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function (coinConfig: CoinConfig) {
      const nValue = coinConfig.nValue || 1024;
      const rValue = coinConfig.rValue || 1;
      return (data: any) => {
        return multiHashing.scrypt.apply(this, [data, nValue, rValue]);
      };
    },
  },

  "scrypt-jane": {
    multiplier: Math.pow(2, 16),
    diff: parseInt(unknownDiff),
    hash: function (coinConfig: CoinConfig) {
      var nTimestamp = coinConfig.chainStartTime || 1367991200;
      var nMin = coinConfig.nMin || 4;
      var nMax = coinConfig.nMax || 30;
      // @ts-ignore
      return function (data, nTime) {
        return multiHashing.scryptjane(data, nTime, nTimestamp, nMin, nMax);
      };
    },
  },

  "scrypt-n": {
    multiplier: Math.pow(2, 16),
    diff: parseInt(unknownDiff),
    hash: function (coinConfig: CoinConfig) {
      const timeTable =
        coinConfig?.timeTable && Object.keys(coinConfig.timeTable)?.length
          ? coinConfig.timeTable
          : {
              "2048": 1389306217,
              "4096": 1456415081,
              "8192": 1506746729,
              "16384": 1557078377,
              "32768": 1657741673,
              "65536": 1859068265,
              "131072": 2060394857,
              "262144": 1722307603,
              "524288": 1769642992,
            };

      const nFactor = (function () {
        const n = Object.keys(timeTable)
          .sort()
          .reverse()
          .filter(function (nKey) {
            return Date.now() / 1000 > (timeTable[nKey] as number);
          })[0];

        // @ts-ignore
        const nInt = parseInt(n);
        return Math.log(nInt) / Math.log(2);
      })();
      // @ts-ignore
      return function (data) {
        return multiHashing.scryptn(data, nFactor);
      };
    },
  },

  sha256: {
    //Uncomment diff if you want to use hardcoded truncated diff
    diff: parseInt(
      "00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        // @ts-ignore
        return utils.sha256d.apply(this, arguments);
      };
    },
  },

  // Sha256d Algorithm
  sha256d: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.sha256d.apply(this, arguments);
      };
    },
  },

  shavite3: {
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.shavite3.apply(this, arguments);
      };
    },
  },

  hefty1: {
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.hefty1.apply(this, arguments);
      };
    },
  },

  // Skein Algorithm
  skein: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.skein.apply(this, arguments);
      };
    },
  },

  timetravel: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.timetravel.apply(this, arguments);
      };
    },
  },

  bitcore: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function () {
      return () => {
        return multiHashing.bitcore.apply(this, arguments);
      };
    },
  },

  // Verthash Algorithm
  verthash: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    hash: /* istanbul ignore next */ function () {
      // Can't test due to "verthash.dat" file
      return () => {
        return multiHashing.verthash.apply(this, arguments);
      };
    },
  },

  // X11 Algorithm
  x11: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.x11.apply(this, arguments);
      };
    },
  },

  // X13 Algorithm
  x13: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.x13.apply(this, arguments);
      };
    },
  },

  // X15 Algorithm
  x15: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.x15.apply(this, arguments);
      };
    },
  },

  // X16R Algorithm
  x16r: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.x16r.apply(this, arguments);
      };
    },
  },

  // X16R Algorithm
  x16rt: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.x16rt.apply(this, arguments);
      };
    },
  },

  // X16Rv2 Algorithm
  x16rv2: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function () {
      return () => {
        return multiHashing.x16rv2.apply(this, arguments);
      };
    },
  },
};

for (let algo in algorithms) {
  const algorithm = algorithms[algo] as Algorithm;
  if (!algorithm.multiplier) {
    algorithm.multiplier = 1;
  }

  if (algorithm.diff) {
    algorithm.maxDiff = BigNumber(algorithm.diff, 16).toNumber();
  } else if (algorithm.shift) {
    algorithm.nonTruncatedDiff = utils.shiftMax256Right(algorithm.shift);
    algorithm.bits = utils.bufferToCompactBits(algorithm.nonTruncatedDiff);
    algorithm.maxDiff = BigNumber(
      Buffer.from(utils.convertBitsToBuff(algorithm.bits)).toString()
    ).toNumber();
  } else if (algorithm.multiplier) {
    algorithm.maxDiff = BigNumber(algorithm.diff)
      .multipliedBy(Math.pow(2, 32) / algorithm.multiplier)
      .toNumber();
  } else {
    algorithm.maxDiff = algorithm.diff;
  }
  algorithms[algo] = { ...algorithms[algo], ...algorithm };
}
