var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/dotenv/package.json
var require_package = __commonJS({
  "../../node_modules/dotenv/package.json"(exports2, module) {
    module.exports = {
      name: "dotenv",
      version: "16.4.5",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        "test:coverage": "tap --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// ../../node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../../node_modules/dotenv/lib/main.js"(exports2, module) {
    "use strict";
    var fs = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var crypto5 = __require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsedAll, options);
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto5.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// ../../node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "../../node_modules/dotenv/lib/env-options.js"(exports2, module) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// ../../node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "../../node_modules/dotenv/lib/cli-options.js"(exports2, module) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      return args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
    };
  }
});

// src/pool.ts
import async2 from "async";
import { EventEmitter as EventEmitter6 } from "node:events";

// src/algorithms/algorithms.ts
import { Buffer as Buffer2 } from "node:buffer";
import BigNumber2 from "bignumber.js";
import multiHashing from "multi-hashing";
import meowpow from "meowpow-hasher";
import evrprogpow from "hasher-evrprogpow";

// ../utils/dist/index.mjs
import crypto2 from "node:crypto";
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __commonJS2 = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_Base58 = __commonJS2({
  "../../node_modules/base-58/Base58.js"(exports2, module) {
    "use strict";
    (function() {
      var ALPHABET, ALPHABET_MAP, Base58, i;
      Base58 = (typeof module !== "undefined" && module !== null ? module.exports : void 0) || (window.Base58 = {});
      ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      ALPHABET_MAP = {};
      i = 0;
      while (i < ALPHABET.length) {
        ALPHABET_MAP[ALPHABET.charAt(i)] = i;
        i++;
      }
      Base58.encode = function(buffer) {
        var carry, digits, j;
        if (buffer.length === 0) {
          return "";
        }
        i = void 0;
        j = void 0;
        digits = [0];
        i = 0;
        while (i < buffer.length) {
          j = 0;
          while (j < digits.length) {
            digits[j] <<= 8;
            j++;
          }
          digits[0] += buffer[i];
          carry = 0;
          j = 0;
          while (j < digits.length) {
            digits[j] += carry;
            carry = digits[j] / 58 | 0;
            digits[j] %= 58;
            ++j;
          }
          while (carry) {
            digits.push(carry % 58);
            carry = carry / 58 | 0;
          }
          i++;
        }
        i = 0;
        while (buffer[i] === 0 && i < buffer.length - 1) {
          digits.push(0);
          i++;
        }
        return digits.reverse().map(function(digit) {
          return ALPHABET[digit];
        }).join("");
      };
      Base58.decode = function(string) {
        var bytes, c, carry, j;
        if (string.length === 0) {
          return new (typeof Uint8Array !== "undefined" && Uint8Array !== null ? Uint8Array : Buffer)(0);
        }
        i = void 0;
        j = void 0;
        bytes = [0];
        i = 0;
        while (i < string.length) {
          c = string[i];
          if (!(c in ALPHABET_MAP)) {
            throw "Base58.decode received unacceptable input. Character '" + c + "' is not in the Base58 alphabet.";
          }
          j = 0;
          while (j < bytes.length) {
            bytes[j] *= 58;
            j++;
          }
          bytes[0] += ALPHABET_MAP[c];
          carry = 0;
          j = 0;
          while (j < bytes.length) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 255;
            ++j;
          }
          while (carry) {
            bytes.push(carry & 255);
            carry >>= 8;
          }
          i++;
        }
        i = 0;
        while (string[i] === "1" && i < string.length - 1) {
          bytes.push(0);
          i++;
        }
        return new (typeof Uint8Array !== "undefined" && Uint8Array !== null ? Uint8Array : Buffer)(bytes.reverse());
      };
    }).call(exports2);
  }
});
var import_base_58 = __toESM(require_Base58());
var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
var mathceil = Math.ceil;
var mathfloor = Math.floor;
var bignumberError = "[BigNumber Error] ";
var tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ";
var BASE = 1e14;
var LOG_BASE = 14;
var MAX_SAFE_INTEGER = 9007199254740991;
var POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13];
var SQRT_BASE = 1e7;
var MAX = 1e9;
function clone(configObject) {
  var div, convertBase, parseNumeric, P = BigNumber22.prototype = { constructor: BigNumber22, toString: null, valueOf: null }, ONE = new BigNumber22(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: "\xA0",
    // non-breaking space
    suffix: ""
  }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
  function BigNumber22(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
    if (!(x instanceof BigNumber22)) return new BigNumber22(v, b);
    if (b == null) {
      if (v && v._isBigNumber === true) {
        x.s = v.s;
        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }
        return;
      }
      if ((isNum = typeof v == "number") && v * 0 == 0) {
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++) ;
          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }
          return;
        }
        str = String(v);
      } else {
        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      if ((i = str.search(/e/i)) > 0) {
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {
        e = str.length;
      }
    } else {
      intCheck(b, 2, ALPHABET.length, "Base");
      if (b == 10 && alphabetHasNormalDecimalDigits) {
        x = new BigNumber22(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }
      str = String(v);
      if (isNum = typeof v == "number") {
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
        if (BigNumber22.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
          throw Error(tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }
      alphabet = ALPHABET.slice(0, b);
      e = i = 0;
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == ".") {
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {
            if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }
          return parseNumeric(x, String(v), isNum, b);
        }
      }
      isNum = false;
      str = convertBase(str, b, 10, x.s);
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      else e = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; i++) ;
    for (len = str.length; str.charCodeAt(--len) === 48; ) ;
    if (str = str.slice(i, ++len)) {
      len -= i;
      if (isNum && BigNumber22.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
        throw Error(tooManyDigits + x.s * v);
      }
      if ((e = e - i - 1) > MAX_EXP) {
        x.c = x.e = null;
      } else if (e < MIN_EXP) {
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;
        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));
          for (len -= LOG_BASE; i < len; ) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }
          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }
        for (; i--; str += "0") ;
        x.c.push(+str);
      }
    } else {
      x.c = [x.e = 0];
    }
  }
  BigNumber22.clone = clone;
  BigNumber22.ROUND_UP = 0;
  BigNumber22.ROUND_DOWN = 1;
  BigNumber22.ROUND_CEIL = 2;
  BigNumber22.ROUND_FLOOR = 3;
  BigNumber22.ROUND_HALF_UP = 4;
  BigNumber22.ROUND_HALF_DOWN = 5;
  BigNumber22.ROUND_HALF_EVEN = 6;
  BigNumber22.ROUND_HALF_CEIL = 7;
  BigNumber22.ROUND_HALF_FLOOR = 8;
  BigNumber22.EUCLID = 9;
  BigNumber22.config = BigNumber22.set = function(obj) {
    var p, v;
    if (obj != null) {
      if (typeof obj == "object") {
        if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }
        if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }
        if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }
        if (obj.hasOwnProperty(p = "RANGE")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error(bignumberError + p + " cannot be zero: " + v);
            }
          }
        }
        if (obj.hasOwnProperty(p = "CRYPTO")) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error(bignumberError + "crypto unavailable");
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error(bignumberError + p + " not true or false: " + v);
          }
        }
        if (obj.hasOwnProperty(p = "MODULO_MODE")) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }
        if (obj.hasOwnProperty(p = "POW_PRECISION")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }
        if (obj.hasOwnProperty(p = "FORMAT")) {
          v = obj[p];
          if (typeof v == "object") FORMAT = v;
          else throw Error(bignumberError + p + " not an object: " + v);
        }
        if (obj.hasOwnProperty(p = "ALPHABET")) {
          v = obj[p];
          if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
            alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
            ALPHABET = v;
          } else {
            throw Error(bignumberError + p + " invalid: " + v);
          }
        }
      } else {
        throw Error(bignumberError + "Object expected: " + obj);
      }
    }
    return {
      DECIMAL_PLACES,
      ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO,
      MODULO_MODE,
      POW_PRECISION,
      FORMAT,
      ALPHABET
    };
  };
  BigNumber22.isBigNumber = function(v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber22.DEBUG) return true;
    var i, n, c = v.c, e = v.e, s = v.s;
    out: if ({}.toString.call(c) == "[object Array]") {
      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;
        if (String(c[0]).length == i) {
          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }
          if (n !== 0) return true;
        }
      }
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }
    throw Error(bignumberError + "Invalid BigNumber: " + v);
  };
  BigNumber22.maximum = BigNumber22.max = function() {
    return maxOrMin(arguments, -1);
  };
  BigNumber22.minimum = BigNumber22.min = function() {
    return maxOrMin(arguments, 1);
  };
  BigNumber22.random = function() {
    var pow2_53 = 9007199254740992;
    var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
      return mathfloor(Math.random() * pow2_53);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(dp) {
      var a, b, e, k, v, i = 0, c = [], rand = new BigNumber22(ONE);
      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);
      k = mathceil(dp / LOG_BASE);
      if (CRYPTO) {
        if (crypto.getRandomValues) {
          a = crypto.getRandomValues(new Uint32Array(k *= 2));
          for (; i < k; ) {
            v = a[i] * 131072 + (a[i + 1] >>> 11);
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;
        } else if (crypto.randomBytes) {
          a = crypto.randomBytes(k *= 7);
          for (; i < k; ) {
            v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error(bignumberError + "crypto unavailable");
        }
      }
      if (!CRYPTO) {
        for (; i < k; ) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }
      k = c[--i];
      dp %= LOG_BASE;
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }
      for (; c[i] === 0; c.pop(), i--) ;
      if (i < 0) {
        c = [e = 0];
      } else {
        for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) ;
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++) ;
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }
      rand.e = e;
      rand.c = c;
      return rand;
    };
  }();
  BigNumber22.sum = function() {
    var i = 1, args = arguments, sum = new BigNumber22(args[0]);
    for (; i < args.length; ) sum = sum.plus(args[i++]);
    return sum;
  };
  convertBase = /* @__PURE__ */ function() {
    var decimal = "0123456789";
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j, arr = [0], arrL, i = 0, len = str.length;
      for (; i < len; ) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
        arr[0] += alphabet.indexOf(str.charAt(i++));
        for (j = 0; j < arr.length; j++) {
          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }
      return arr.reverse();
    }
    return function(str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
      if (i >= 0) {
        k = POW_PRECISION;
        POW_PRECISION = 0;
        str = str.replace(".", "");
        y = new BigNumber22(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;
        y.c = toBaseOut(
          toFixedPoint(coeffToString(x.c), x.e, "0"),
          10,
          baseOut,
          decimal
        );
        y.e = y.c.length;
      }
      xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
      e = k = xc.length;
      for (; xc[--k] == 0; xc.pop()) ;
      if (!xc[0]) return alphabet.charAt(0);
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }
      d = e + dp + 1;
      i = xc[d];
      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;
      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
      if (d < 1 || !xc[0]) {
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {
        xc.length = d;
        if (r) {
          for (--baseOut; ++xc[--d] > baseOut; ) {
            xc[d] = 0;
            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }
        for (k = xc.length; !xc[--k]; ) ;
        for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++])) ;
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }
      return str;
    };
  }();
  div = /* @__PURE__ */ function() {
    function multiply(x, k, base) {
      var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
      for (x = x.slice(); i--; ) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base;
      }
      if (carry) x = [carry].concat(x);
      return x;
    }
    function compare2(a, b, aL, bL) {
      var i, cmp;
      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {
        for (i = cmp = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }
      return cmp;
    }
    function subtract(a, b, aL, base) {
      var i = 0;
      for (; aL--; ) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }
      for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
    }
    return function(x, y, dp, rm, base) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
      if (!xc || !xc[0] || !yc || !yc[0]) {
        return new BigNumber22(
          // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
          )
        );
      }
      q = new BigNumber22(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;
      if (!base) {
        base = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }
      for (i = 0; yc[i] == (xc[i] || 0); i++) ;
      if (yc[i] > (xc[i] || 0)) e--;
      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;
        n = mathfloor(base / (yc[0] + 1));
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }
        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; rem[remL++] = 0) ;
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        do {
          n = 0;
          cmp = compare2(yc, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
            n = mathfloor(rem0 / yc0);
            if (n > 1) {
              if (n >= base) n = base - 1;
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;
              while (compare2(prod, rem, prodL, remL) == 1) {
                n--;
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {
              if (n == 0) {
                cmp = n = 1;
              }
              prod = yc.slice();
              prodL = prod.length;
            }
            if (prodL < remL) prod = [0].concat(prod);
            subtract(rem, prod, remL, base);
            remL = rem.length;
            if (cmp == -1) {
              while (compare2(yc, rem, yL, remL) < 1) {
                n++;
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          }
          qc[i++] = n;
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);
        more = rem[0] != null;
        if (!qc[0]) qc.splice(0, 1);
      }
      if (base == BASE) {
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
      } else {
        q.e = e;
        q.r = +more;
      }
      return q;
    };
  }();
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    if (!n.c) return n.toString();
    c0 = n.c[0];
    ne = n.e;
    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
    } else {
      n = round(new BigNumber22(n), i, rm);
      e = n.e;
      str = coeffToString(n.c);
      len = str.length;
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
        for (; len < i; str += "0", len++) ;
        str = toExponential(str, e);
      } else {
        i -= ne;
        str = toFixedPoint(str, e, "0");
        if (e + 1 > len) {
          if (--i > 0) for (str += "."; i--; str += "0") ;
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += ".";
            for (; i--; str += "0") ;
          }
        }
      }
    }
    return n.s < 0 && c0 ? "-" + str : str;
  }
  function maxOrMin(args, n) {
    var k, y, i = 1, x = new BigNumber22(args[0]);
    for (; i < args.length; i++) {
      y = new BigNumber22(args[i]);
      if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
        x = y;
      }
    }
    return x;
  }
  function normalise(n, c, e) {
    var i = 1, j = c.length;
    for (; !c[--j]; c.pop()) ;
    for (j = c[0]; j >= 10; j /= 10, i++) ;
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
      n.c = n.e = null;
    } else if (e < MIN_EXP) {
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }
    return n;
  }
  parseNumeric = /* @__PURE__ */ function() {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(x, str, isNum, b) {
      var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {
          s = s.replace(basePrefix, function(m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
            return !b || b == base ? p1 : m;
          });
          if (b) {
            base = b;
            s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
          }
          if (str != s) return new BigNumber22(s, base);
        }
        if (BigNumber22.DEBUG) {
          throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
        }
        x.s = null;
      }
      x.c = x.e = null;
    };
  }();
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
    if (xc) {
      out: {
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) ;
        i = sd - d;
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];
          rd = mathfloor(n / pows10[d - j - 1] % 10);
        } else {
          ni = mathceil((i + 1) / LOG_BASE);
          if (ni >= xc.length) {
            if (r) {
              for (; xc.length <= ni; xc.push(0)) ;
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];
            for (d = 1; k >= 10; k /= 10, d++) ;
            i %= LOG_BASE;
            j = i - LOG_BASE + d;
            rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
          }
        }
        r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
        r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
        if (sd < 1 || !xc[0]) {
          xc.length = 0;
          if (r) {
            sd -= x.e + 1;
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {
            xc[0] = x.e = 0;
          }
          return x;
        }
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }
        if (r) {
          for (; ; ) {
            if (ni == 0) {
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) ;
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++) ;
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }
              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }
        for (i = xc.length; xc[--i] === 0; xc.pop()) ;
      }
      if (x.e > MAX_EXP) {
        x.c = x.e = null;
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }
    return x;
  }
  function valueOf(n) {
    var str, e = n.e;
    if (e === null) return n.toString();
    str = coeffToString(n.c);
    str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
    return n.s < 0 ? "-" + str : str;
  }
  P.absoluteValue = P.abs = function() {
    var x = new BigNumber22(this);
    if (x.s < 0) x.s = 1;
    return x;
  };
  P.comparedTo = function(y, b) {
    return compare(this, new BigNumber22(y, b));
  };
  P.decimalPlaces = P.dp = function(dp, rm) {
    var c, n, v, x = this;
    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber22(x), dp + x.e + 1, rm);
    }
    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) ;
    if (n < 0) n = 0;
    return n;
  };
  P.dividedBy = P.div = function(y, b) {
    return div(this, new BigNumber22(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };
  P.dividedToIntegerBy = P.idiv = function(y, b) {
    return div(this, new BigNumber22(y, b), 0, 1);
  };
  P.exponentiatedBy = P.pow = function(n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
    n = new BigNumber22(n);
    if (n.c && !n.isInteger()) {
      throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
    }
    if (m != null) m = new BigNumber22(m);
    nIsBig = n.e > 14;
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
      y = new BigNumber22(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }
    nIsNeg = n.s < 0;
    if (m) {
      if (m.c ? !m.c[0] : !m.s) return new BigNumber22(NaN);
      isModExp = !nIsNeg && x.isInteger() && m.isInteger();
      if (isModExp) x = x.mod(m);
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
      k = x.s < 0 && isOdd(n) ? -0 : 0;
      if (x.e > -1) k = 1 / k;
      return new BigNumber22(nIsNeg ? 1 / k : k);
    } else if (POW_PRECISION) {
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }
    if (nIsBig) {
      half = new BigNumber22(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }
    y = new BigNumber22(ONE);
    for (; ; ) {
      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;
        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);
        }
      }
      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);
        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }
      x = x.times(x);
      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);
      }
    }
    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);
    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };
  P.integerValue = function(rm) {
    var n = new BigNumber22(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };
  P.isEqualTo = P.eq = function(y, b) {
    return compare(this, new BigNumber22(y, b)) === 0;
  };
  P.isFinite = function() {
    return !!this.c;
  };
  P.isGreaterThan = P.gt = function(y, b) {
    return compare(this, new BigNumber22(y, b)) > 0;
  };
  P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
    return (b = compare(this, new BigNumber22(y, b))) === 1 || b === 0;
  };
  P.isInteger = function() {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };
  P.isLessThan = P.lt = function(y, b) {
    return compare(this, new BigNumber22(y, b)) < 0;
  };
  P.isLessThanOrEqualTo = P.lte = function(y, b) {
    return (b = compare(this, new BigNumber22(y, b))) === -1 || b === 0;
  };
  P.isNaN = function() {
    return !this.s;
  };
  P.isNegative = function() {
    return this.s < 0;
  };
  P.isPositive = function() {
    return this.s > 0;
  };
  P.isZero = function() {
    return !!this.c && this.c[0] == 0;
  };
  P.minus = function(y, b) {
    var i, j, t, xLTy, x = this, a = x.s;
    y = new BigNumber22(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber22(NaN);
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber22(yc ? x : NaN);
      if (!xc[0] || !yc[0]) {
        return yc[0] ? (y.s = -b, y) : new BigNumber22(xc[0] ? x : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0
        ));
      }
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }
      t.reverse();
      for (b = a; b--; t.push(0)) ;
      t.reverse();
    } else {
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }
    if (xLTy) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }
    b = (j = yc.length) - (i = xc.length);
    if (b > 0) for (; b--; xc[i++] = 0) ;
    b = BASE - 1;
    for (; j > a; ) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b) ;
        --xc[i];
        xc[j] += BASE;
      }
      xc[j] -= yc[j];
    }
    for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
    if (!xc[0]) {
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }
    return normalise(y, xc, ye);
  };
  P.modulo = P.mod = function(y, b) {
    var q, s, x = this;
    y = new BigNumber22(y, b);
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber22(NaN);
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber22(x);
    }
    if (MODULO_MODE == 9) {
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }
    y = x.minus(q.times(y));
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
    return y;
  };
  P.multipliedBy = P.times = function(y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber22(y, b)).c;
    if (!xc || !yc || !xc[0] || !yc[0]) {
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;
        if (!xc || !yc) {
          y.c = y.e = null;
        } else {
          y.c = [0];
          y.e = 0;
        }
      }
      return y;
    }
    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;
    if (xcL < ycL) {
      zc = xc;
      xc = yc;
      yc = zc;
      i = xcL;
      xcL = ycL;
      ycL = i;
    }
    for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
    base = BASE;
    sqrtBase = SQRT_BASE;
    for (i = ycL; --i >= 0; ) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;
      for (k = xcL, j = i + k; j > i; ) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base;
      }
      zc[j] = c;
    }
    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }
    return normalise(y, zc, e);
  };
  P.negated = function() {
    var x = new BigNumber22(this);
    x.s = -x.s || null;
    return x;
  };
  P.plus = function(y, b) {
    var t, x = this, a = x.s;
    y = new BigNumber22(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber22(NaN);
    if (a != b) {
      y.s = -b;
      return x.minus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return new BigNumber22(a / 0);
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber22(xc[0] ? x : a * 0);
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }
      t.reverse();
      for (; a--; t.push(0)) ;
      t.reverse();
    }
    a = xc.length;
    b = yc.length;
    if (a - b < 0) {
      t = yc;
      yc = xc;
      xc = t;
      b = a;
    }
    for (a = 0; b; ) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }
    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }
    return normalise(y, xc, ye);
  };
  P.precision = P.sd = function(sd, rm) {
    var c, n, v, x = this;
    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber22(x), sd, rm);
    }
    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;
    if (v = c[v]) {
      for (; v % 10 == 0; v /= 10, n--) ;
      for (v = c[0]; v >= 10; v /= 10, n++) ;
    }
    if (sd && x.e + 1 > n) n = x.e + 1;
    return n;
  };
  P.shiftedBy = function(k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times("1e" + k);
  };
  P.squareRoot = P.sqrt = function() {
    var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber22("0.5");
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber22(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }
    s = Math.sqrt(+valueOf(x));
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += "0";
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
      if (s == 1 / 0) {
        n = "5e" + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e;
      }
      r = new BigNumber22(n);
    } else {
      r = new BigNumber22(s + "");
    }
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;
      for (; ; ) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));
        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);
              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }
            dp += 4;
            s += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }
            break;
          }
        }
      }
    }
    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };
  P.toExponential = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };
  P.toFixed = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };
  P.toFormat = function(dp, rm, format2) {
    var str, x = this;
    if (format2 == null) {
      if (dp != null && rm && typeof rm == "object") {
        format2 = rm;
        rm = null;
      } else if (dp && typeof dp == "object") {
        format2 = dp;
        dp = rm = null;
      } else {
        format2 = FORMAT;
      }
    } else if (typeof format2 != "object") {
      throw Error(bignumberError + "Argument not an object: " + format2);
    }
    str = x.toFixed(dp, rm);
    if (x.c) {
      var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
      if (g2) {
        i = g1;
        g1 = g2;
        g2 = i;
        len -= i;
      }
      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = "-" + intPart;
      }
      str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
        new RegExp("\\d{" + g2 + "}\\B", "g"),
        "$&" + (format2.fractionGroupSeparator || "")
      ) : fractionPart) : intPart;
    }
    return (format2.prefix || "") + str + (format2.suffix || "");
  };
  P.toFraction = function(md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
    if (md != null) {
      n = new BigNumber22(md);
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
      }
    }
    if (!xc) return new BigNumber22(x);
    d = new BigNumber22(ONE);
    n1 = d0 = new BigNumber22(ONE);
    d1 = n0 = new BigNumber22(ONE);
    s = coeffToString(xc);
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber22(s);
    n0.c[0] = 0;
    for (; ; ) {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }
    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
      div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
    ) < 1 ? [n1, d1] : [n0, d0];
    MAX_EXP = exp;
    return r;
  };
  P.toNumber = function() {
    return +valueOf(this);
  };
  P.toPrecision = function(sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };
  P.toString = function(b) {
    var str, n = this, s = n.s, e = n.e;
    if (e === null) {
      if (s) {
        str = "Infinity";
        if (s < 0) str = "-" + str;
      } else {
        str = "NaN";
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
      } else if (b === 10 && alphabetHasNormalDecimalDigits) {
        n = round(new BigNumber22(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, "0");
      } else {
        intCheck(b, 2, ALPHABET.length, "Base");
        str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
      }
      if (s < 0 && n.c[0]) str = "-" + str;
    }
    return str;
  };
  P.valueOf = P.toJSON = function() {
    return valueOf(this);
  };
  P._isBigNumber = true;
  P[Symbol.toStringTag] = "BigNumber";
  P[Symbol.for("nodejs.util.inspect.custom")] = P.valueOf;
  if (configObject != null) BigNumber22.set(configObject);
  return BigNumber22;
}
function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}
function coeffToString(a) {
  var s, z, i = 1, j = a.length, r = a[0] + "";
  for (; i < j; ) {
    s = a[i++] + "";
    z = LOG_BASE - s.length;
    for (; z--; s = "0" + s) ;
    r += s;
  }
  for (j = r.length; r.charCodeAt(--j) === 48; ) ;
  return r.slice(0, j + 1 || 1);
}
function compare(x, y) {
  var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
  if (!i || !j) return null;
  a = xc && !xc[0];
  b = yc && !yc[0];
  if (a || b) return a ? b ? 0 : -j : i;
  if (i != j) return i;
  a = i < 0;
  b = k == l;
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
  if (!b) return k > l ^ a ? 1 : -1;
  j = (k = xc.length) < (l = yc.length) ? k : l;
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
  }
}
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}
function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
}
function toFixedPoint(str, e, z) {
  var len, zs;
  if (e < 0) {
    for (zs = z + "."; ++e; zs += z) ;
    str = zs + str;
  } else {
    len = str.length;
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z) ;
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + "." + str.slice(e);
    }
  }
  return str;
}
var BigNumber = clone();
var bignumber_default = BigNumber;
function sha256(buff) {
  const hash = crypto2.createHash("sha256");
  hash.update(buff);
  return hash.digest();
}
function sha256d(buff) {
  return sha256(sha256(buff));
}
function reverseBuffer(buff) {
  const reversed = Buffer.alloc(buff.length);
  for (let i = buff.length - 1; i >= 0; i--) {
    const buffIndex = buff.length - i - 1;
    reversed[buffIndex] = buff[i];
  }
  return reversed;
}
function varIntBuffer(n) {
  if (n < 253) {
    return Buffer.from([n]);
  } else if (n <= 65535) {
    const buff2 = Buffer.alloc(3);
    buff2[0] = 253;
    buff2.writeUInt16LE(n, 1);
    return buff2;
  } else if (n <= 4294967295) {
    const buff2 = Buffer.alloc(5);
    buff2[0] = 254;
    buff2.writeUInt32LE(n, 1);
    return buff2;
  }
  const buff = Buffer.alloc(9);
  buff[0] = 255;
  exports.packUInt16LE(n).copy(buff, 1);
  return buff;
}
function varStringBuffer(str) {
  let strBuff = Buffer.from(str);
  return Buffer.concat([varIntBuffer(strBuff.length), strBuff]);
}
function packUInt32LE(num) {
  let buff = Buffer.alloc(4);
  buff.writeUInt32LE(num, 0);
  return buff;
}
function packUInt32BE(num) {
  let buff = Buffer.alloc(4);
  buff.writeUInt32BE(num, 0);
  return buff;
}
function packInt64LE(num) {
  let buff = Buffer.alloc(8);
  buff.writeUInt32LE(num % Math.pow(2, 32), 0);
  buff.writeUInt32LE(Math.floor(num / Math.pow(2, 32)), 4);
  return buff;
}
function addressToScript(addr) {
  const decoded = import_base_58.default.decode(addr);
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
    Buffer.from([118, 169, 20]),
    pubkey,
    Buffer.from([136, 172])
  ]);
}
function getReadableHashRateString(hashrate) {
  let i = -1;
  let byteUnits = [" KH", " MH", " GH", " TH", " PH"];
  do {
    hashrate = hashrate / 1024;
    i++;
  } while (hashrate > 1024);
  return hashrate.toFixed(2) + byteUnits[i];
}
function shiftMax256Right(shiftRight) {
  let arr256 = Array.apply(null, new Array(256)).map(
    Number.prototype.valueOf,
    1
  );
  const arrLeft = Array.apply(null, new Array(shiftRight)).map(
    Number.prototype.valueOf,
    0
  );
  arr256 = arrLeft.concat(arr256).slice(0, 256);
  const octets = [];
  for (let i = 0; i < 32; i++) {
    octets[i] = 0;
    let bits = arr256.slice(i * 8, i * 8 + 8);
    for (let f = 0; f < bits.length; f++) {
      let multiplier = Math.pow(2, f);
      octets[i] += bits[f] * multiplier;
    }
  }
  return Buffer.from(octets);
}
function bufferToCompactBits(startingBuff) {
  let bigNum = startingBuff.readInt32BE(0);
  let buff = Buffer.from([bigNum]);
  buff = buff.readUInt8(0) > 127 ? Buffer.concat([Buffer.from([0]), buff]) : buff;
  buff = Buffer.concat([Buffer.from([buff.length]), buff]);
  return buff.slice(0, 4);
}
function bignumFromBitsBuffer(bitsBuff) {
  let numBytes = bitsBuff.readUInt8(0);
  let bigBits = new bignumber_default(bitsBuff.slice(1).readInt32BE(0));
  let target = bigBits.multipliedBy(
    new bignumber_default(2).pow(new bignumber_default(8).multipliedBy(numBytes - 3))
  );
  return target;
}
function convertBitsToBuff(bitsBuff) {
  let target = bignumFromBitsBuffer(bitsBuff);
  let resultBuff = Buffer.from(target);
  let buff256 = Buffer.alloc(32);
  buff256.fill(0);
  resultBuff.copy(buff256, buff256.length - resultBuff.length);
  return buff256;
}

// src/algorithms/algorithms.ts
var unknownDiff = "00000000ffff0000000000000000000000000000000000000000000000000000";
var algorithms = {
  // Allium Algorithm
  allium: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.allium.apply(this, arguments);
      };
    }
  },
  // Blake Algorithm
  blake: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.blake.apply(this, arguments);
      };
    }
  },
  blake2s: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.blake2s.apply(this, arguments);
      };
    }
  },
  // C11 Algorithm
  c11: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.c11.apply(this, arguments);
      };
    }
  },
  // Equihash Algorithm (WIP)
  equihash: {
    multiplier: 1,
    diff: parseInt(
      "0x0007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    ),
    hash: function(options) {
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
          K
        ]);
      };
    }
  },
  // Firopow Algorithm
  firopow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 1300,
    hash: function() {
      return () => {
        return multiHashing.firopow.apply(this, arguments);
      };
    }
  },
  // Fugue Algorithm
  fugue: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.fugue.apply(this, arguments);
      };
    }
  },
  // Ghostrider Algorithm
  ghostrider: {
    multiplier: Math.pow(2, 16),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.ghostrider.apply(this, arguments);
      };
    }
  },
  // Groestl Algorithm
  groestl: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.groestl.apply(this, arguments);
      };
    }
  },
  polytimos: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.polytimos.apply(this, arguments);
      };
    }
  },
  neoscrypt: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.neoscrypt.apply(this, arguments);
      };
    }
  },
  // Meowpow Algorithm
  meowpow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 15e3,
    hash: function() {
      return () => {
        return meowpow.meowpow.apply(this, arguments);
      };
    }
  },
  // Kawpow Algorithm
  kawpow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 7500,
    hash: function() {
      return () => {
        return multiHashing.kawpow.apply(this, arguments);
      };
    }
  },
  // ProgPow Algorithm
  evrprogpow: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    epochLength: 12e3,
    hash: function() {
      return () => {
        return evrprogpow.apply(this, arguments);
      };
    }
  },
  // Keccak Algorithm
  keccak: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function(coinConfig) {
      if (coinConfig.normalHashing === true) {
        return (data, nTimeInt) => {
          return multiHashing.keccak.apply(this, [
            multiHashing.keccak(
              Buffer2.concat([data, Buffer2.from(nTimeInt.toString(16), "hex")])
            )
          ]);
        };
      } else {
        return () => {
          return multiHashing.keccak.apply(this, arguments);
        };
      }
    }
  },
  // Minotaur Algorithm
  minotaur: {
    multiplier: Math.pow(2, 12),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.minotaur.apply(this, arguments);
      };
    }
  },
  // MinotaurX Algorithm
  minotaurx: {
    multiplier: Math.pow(2, 12),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.minotaurx.apply(this, arguments);
      };
    }
  },
  // Nist5 Algorithm
  nist5: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.nist5.apply(this, arguments);
      };
    }
  },
  // Quark Algorithm
  quark: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.quark.apply(this, arguments);
      };
    }
  },
  // Qubit Algorithm
  qubit: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.qubit.apply(this, arguments);
      };
    }
  },
  tribus: {
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.tribus.apply(this, arguments);
      };
    }
  },
  xevan: {
    multiplier: Math.pow(2, 24),
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.xevan.apply(this, arguments);
      };
    }
  },
  // Scrypt Algorithm
  scrypt: {
    multiplier: Math.pow(2, 16),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function(coinConfig) {
      const nValue = coinConfig.nValue || 1024;
      const rValue = coinConfig.rValue || 1;
      return (data) => {
        return multiHashing.scrypt.apply(this, [data, nValue, rValue]);
      };
    }
  },
  "scrypt-jane": {
    multiplier: Math.pow(2, 16),
    diff: parseInt(unknownDiff),
    hash: function(coinConfig) {
      var nTimestamp = coinConfig.chainStartTime || 1367991200;
      var nMin = coinConfig.nMin || 4;
      var nMax = coinConfig.nMax || 30;
      return function(data, nTime) {
        return multiHashing.scryptjane(data, nTime, nTimestamp, nMin, nMax);
      };
    }
  },
  "scrypt-n": {
    multiplier: Math.pow(2, 16),
    diff: parseInt(unknownDiff),
    hash: function(coinConfig) {
      var _a;
      const timeTable = (coinConfig == null ? void 0 : coinConfig.timeTable) && ((_a = Object.keys(coinConfig.timeTable)) == null ? void 0 : _a.length) ? coinConfig.timeTable : {
        "2048": 1389306217,
        "4096": 1456415081,
        "8192": 1506746729,
        "16384": 1557078377,
        "32768": 1657741673,
        "65536": 1859068265,
        "131072": 2060394857,
        "262144": 1722307603,
        "524288": 1769642992
      };
      const nFactor = function() {
        const n = Object.keys(timeTable).sort().reverse().filter(function(nKey) {
          return Date.now() / 1e3 > timeTable[nKey];
        })[0];
        const nInt = parseInt(n);
        return Math.log(nInt) / Math.log(2);
      }();
      return function(data) {
        return multiHashing.scryptn(data, nFactor);
      };
    }
  },
  sha256: {
    //Uncomment diff if you want to use hardcoded truncated diff
    diff: parseInt(
      "00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return sha256d.apply(this, arguments);
      };
    }
  },
  // Sha256d Algorithm
  sha256d: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.sha256d.apply(this, arguments);
      };
    }
  },
  shavite3: {
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.shavite3.apply(this, arguments);
      };
    }
  },
  hefty1: {
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.hefty1.apply(this, arguments);
      };
    }
  },
  // Skein Algorithm
  skein: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.skein.apply(this, arguments);
      };
    }
  },
  timetravel: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.timetravel.apply(this, arguments);
      };
    }
  },
  bitcore: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(unknownDiff),
    hash: function() {
      return () => {
        return multiHashing.bitcore.apply(this, arguments);
      };
    }
  },
  // Verthash Algorithm
  verthash: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ff000000000000000000000000000000000000000000000000000000"
    ),
    hash: (
      /* istanbul ignore next */
      function() {
        return () => {
          return multiHashing.verthash.apply(this, arguments);
        };
      }
    )
  },
  // X11 Algorithm
  x11: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.x11.apply(this, arguments);
      };
    }
  },
  // X13 Algorithm
  x13: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.x13.apply(this, arguments);
      };
    }
  },
  // X15 Algorithm
  x15: {
    multiplier: 1,
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.x15.apply(this, arguments);
      };
    }
  },
  // X16R Algorithm
  x16r: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.x16r.apply(this, arguments);
      };
    }
  },
  // X16R Algorithm
  x16rt: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.x16rt.apply(this, arguments);
      };
    }
  },
  // X16Rv2 Algorithm
  x16rv2: {
    multiplier: Math.pow(2, 8),
    diff: parseInt(
      "0x00000000ffff0000000000000000000000000000000000000000000000000000"
    ),
    hash: function() {
      return () => {
        return multiHashing.x16rv2.apply(this, arguments);
      };
    }
  }
};
for (let algo in algorithms) {
  const algorithm = algorithms[algo];
  if (!algorithm.multiplier) {
    algorithm.multiplier = 1;
  }
  if (algorithm.diff) {
    algorithm.maxDiff = BigNumber2(algorithm.diff, 16).toNumber();
  } else if (algorithm.shift) {
    algorithm.nonTruncatedDiff = shiftMax256Right(algorithm.shift);
    algorithm.bits = bufferToCompactBits(algorithm.nonTruncatedDiff);
    algorithm.maxDiff = BigNumber2(
      Buffer2.from(convertBitsToBuff(algorithm.bits)).toString()
    ).toNumber();
  } else if (algorithm.multiplier) {
    algorithm.maxDiff = BigNumber2(algorithm.diff).multipliedBy(Math.pow(2, 32) / algorithm.multiplier).toNumber();
  } else {
    algorithm.maxDiff = algorithm.diff;
  }
  algorithms[algo] = __spreadValues(__spreadValues({}, algorithms[algo]), algorithm);
}

// src/daemon.ts
import { Client } from "@hyperbitjs/rpc";
import { EventEmitter } from "events";
import http from "http";
var DaemonInterface = class extends EventEmitter {
  constructor(daemons, logger) {
    super();
    for (let i = 0; i < daemons.length; i++) {
      daemons[i]["index"] = i;
    }
    this._daemons = daemons;
    this._logger = logger;
  }
  init() {
    this.isOnline((online) => {
      if (online) {
        this.emit("online");
      }
    });
  }
  isOnline(callback) {
    this.cmd("getinfo", [], (results) => {
      const allOnline = Array.isArray(results) ? results.every((x) => !x.code) : results.code !== 500;
      callback(allOnline);
      if (!allOnline) {
        this.emit("connectionFailed", results);
      }
    });
  }
  performHttpRequest(instance, jsonData, callback) {
    let options = {
      hostname: typeof instance.host === "undefined" ? "127.0.0.1" : instance.host,
      port: instance.port,
      method: "POST",
      auth: instance.username + ":" + instance.password,
      headers: {
        "Content-Length": jsonData.length
      }
    };
    const parseJson = (res, data) => {
      let dataJson;
      if (res.statusCode === 401) {
        this.logger(
          "error",
          "Unauthorized RPC access - invalid RPC username or password"
        );
        return;
      }
      try {
        dataJson = JSON.parse(data);
      } catch (e) {
        if (data.indexOf(":-nan") !== -1) {
          data = data.replace(/:-nan,/g, ":0");
          parseJson(res, data);
          return;
        }
        this.logger(
          "error",
          "Could not parse rpc data from daemon instance  " + instance.index + "\nRequest Data: " + jsonData.substr(0, 200) + "\nResponse Data: " + data.substr(0, 200)
        );
      }
      if (dataJson && callback) {
        callback(dataJson.error, dataJson, data);
      }
    };
    const req = http.request(options, (res) => {
      let data = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        parseJson(res, data);
      });
    });
    req.on("error", (e) => {
      if (e.code === "ECONNREFUSED") {
        callback({ type: "offline", message: e.message }, null);
      } else {
        callback({ type: "request error", message: e.message }, null);
      }
    });
    req.end(jsonData);
  }
  batchCmd(cmdArray, callback) {
    var _a;
    const promises = [];
    if (this._daemons[0]) {
      const client = new Client({
        url: this._daemons[0].url || `${this._daemons[0].host}:${this._daemons[0].port}`,
        username: this._daemons[0].username,
        password: this._daemons[0].password,
        headers: (_a = this._daemons[0].headers) != null ? _a : void 0
      });
      for (var i = 0; i < cmdArray.length; i++) {
        const method = cmdArray[i][0];
        const params = cmdArray[i][1];
        promises.push(client.request(method, params));
      }
      Promise.all(promises).then((res) => {
        callback(res);
      });
    }
  }
  cmd(method, params, callback, _streamResults, _returnRawData) {
    var _a;
    if (this._daemons.length > 1) {
      const results = [];
      this._daemons.forEach((daemon) => __async(this, null, function* () {
        var _a2;
        const client = new Client({
          url: daemon.url || `${daemon.host}:${daemon.port}`,
          username: daemon.username,
          password: daemon.password,
          headers: (_a2 = daemon.headers) != null ? _a2 : void 0
        });
        const res = yield client.request(method, params);
        results.push(res);
      }));
      callback(results);
    } else {
      if (this._daemons[0]) {
        const client = new Client({
          url: this._daemons[0].url || `${this._daemons[0].host}:${this._daemons[0].port}`,
          username: this._daemons[0].username,
          password: this._daemons[0].password,
          headers: (_a = this._daemons[0].headers) != null ? _a : void 0
        });
        client.request(method, params).then((res) => {
          callback(res);
        }).catch((err) => {
          callback(err);
        });
      }
    }
  }
  logger(severity, message) {
    if (this._logger) {
      return this._logger(severity, message);
    }
  }
};

// src/job-manager.ts
import async from "async";
import BigNumber4 from "bignumber.js";
import { Buffer as Buffer7 } from "node:buffer";
import { EventEmitter as EventEmitter2 } from "events";
import http2 from "http";

// src/block-template.ts
import BigNumber3 from "bignumber.js";
import { Buffer as Buffer5 } from "node:buffer";
import { SHA3 } from "sha3";

// src/transactions.ts
import * as bitcoin from "bitcoinjs-lib";
import { Buffer as Buffer3 } from "node:buffer";
function scriptCompile(addrHash) {
  const script2 = bitcoin.script.compile([
    // @ts-ignore
    bitcoin.opcodes.OP_DUP,
    // @ts-ignore
    bitcoin.opcodes.OP_HASH160,
    addrHash,
    // @ts-ignore
    bitcoin.opcodes.OP_EQUALVERIFY,
    // @ts-ignore
    bitcoin.opcodes.OP_CHECKSIG
  ]);
  return script2;
}
function createGeneration(rpcData, blockReward, feeReward, recipients, poolAddress) {
  let poolAddrHash = bitcoin.address.fromBase58Check(poolAddress).hash;
  let tx = new bitcoin.Transaction();
  let blockHeight = rpcData.height;
  let blockHeightSerial = blockHeight.toString(16);
  if (blockHeight.toString(16).length % 2 !== 0) {
    blockHeightSerial = "0" + blockHeight.toString(16);
  }
  let height = Math.ceil((blockHeight << 1).toString(2).length / 8);
  let lengthDiff = blockHeightSerial.length / 2 - height;
  for (let i = 0; i < lengthDiff; i++) {
    blockHeightSerial = blockHeightSerial + "00";
  }
  const length = "0" + height;
  let serializedBlockHeight = Buffer3.concat([
    Buffer3.from(length, "hex"),
    reverseBuffer(Buffer3.from(blockHeightSerial, "hex")),
    Buffer3.from("00", "hex")
    // OP_0
  ]);
  tx.addInput(
    Buffer3.from(
      "0000000000000000000000000000000000000000000000000000000000000000",
      "hex"
    ),
    4294967295,
    4294967295,
    // https://github.com/RavenCommunity/kawpow-stratum-pool/commit/f59b1e2c0485804782fea99c024a29fde666e648
    Buffer3.concat([serializedBlockHeight, Buffer3.from("6b6177706f77", "hex")])
  );
  let feePercent = 0;
  for (let i = 0; i < recipients.length; i++) {
    feePercent = feePercent + recipients[i].percent;
  }
  let rewardToPool = Math.floor(blockReward * (1 - feePercent / 100));
  tx.addOutput(scriptCompile(poolAddrHash), rewardToPool);
  for (let i = 0; i < recipients.length; i++) {
    tx.addOutput(
      scriptCompile(
        bitcoin.address.fromBase58Check(recipients[i].address).hash
      ),
      Math.round(blockReward * (recipients[i].percent / 100))
    );
  }
  if (rpcData.default_witness_commitment !== void 0) {
    tx.addOutput(Buffer3.from(rpcData.default_witness_commitment, "hex"), 0);
  }
  const txHex = tx.toHex();
  const txHash = tx.getHash().toString("hex");
  rpcData.rewardToPool = rewardToPool;
  return {
    txHex,
    txHash
  };
}
function getFees(feeArray) {
  let fee = Number();
  feeArray.forEach((value) => {
    fee = fee + Number(value.fee);
  });
  return fee;
}

// src/merkle-tree.ts
import { Buffer as Buffer4 } from "node:buffer";
import denodeify from "denodeify";
var merklebitcoin = denodeify(__require("merkle-bitcoin"));
function _calcRoot(hashes) {
  return __async(this, null, function* () {
    const result = yield merklebitcoin(hashes);
    return result.root;
  });
}
function getRoot(rpcData, generateTxRaw) {
  return __async(this, null, function* () {
    const hashes = [
      reverseBuffer(Buffer4.from(generateTxRaw, "hex")).toString("hex")
    ];
    rpcData.transactions.forEach((value) => {
      if (value.txid !== void 0) {
        hashes.push(value.txid);
      } else {
        hashes.push(value.hash);
      }
    });
    if (hashes.length === 1) {
      return hashes[0];
    }
    const result = yield _calcRoot(hashes);
    return result;
  });
}

// src/block-template.ts
var BlockTemplate = class {
  constructor(jobId, rpcData, options) {
    this.curTime = Date.now() / 1e3 | 0;
    this.submits = [];
    this.epochLength = 7500;
    this._options = options;
    this._algorithm = algorithms[this._options.coin.algorithm];
    this.epochLength = this._options.coin.algorithm === "evrprogpow" ? 12e3 : this.epochLength;
    this.jobId = jobId;
    this.rpcData = rpcData;
    this.target = new BigNumber3(this.rpcData.target, 16);
    this.target_hex = this.rpcData.target;
    this.difficulty = parseFloat(
      (this._algorithm.diff / this.target.toNumber()).toFixed(9)
    );
    this.nTime = packUInt32BE(this.rpcData.curtime).toString("hex");
    const blockReward = this.rpcData.coinbasevalue;
    const fees = [];
    if (Array.isArray(this.rpcData.transactions)) {
      this.rpcData.transactions.forEach((value) => {
        fees.push(value);
      });
    }
    this.rewardFees = getFees(fees);
    this.rpcData.rewardFees = this.rewardFees;
    if (typeof this.genTx === "undefined") {
      const createTx = createGeneration(
        this.rpcData,
        blockReward,
        this.rewardFees,
        this._options.recipients,
        this._options.address
      );
      this.genTx = createTx.txHex.toString("hex");
      this.genTxHash = createTx.txHash;
    } else {
      this.genTxHash = this.genTx.toString("hex");
    }
    this.prevHashReversed = reverseBuffer(
      Buffer5.from(this.rpcData.previousblockhash, "hex")
    ).toString("hex");
  }
  init() {
    return __async(this, null, function* () {
      const result = yield getRoot(this.rpcData, this.genTxHash);
      this.merkleRoot = result;
      this.txCount = this.rpcData.transactions.length + 1;
      this.merkleRootReversed = reverseBuffer(
        Buffer5.from(this.merkleRoot, "hex")
      ).toString("hex");
      const powLimit = this._algorithm.diff;
      const adjPow = powLimit / this.difficulty;
      let zeroPad = "";
      if (64 - adjPow.toString(16).length !== 0) {
        zeroPad = "0";
        zeroPad = zeroPad.repeat(64 - adjPow.toString(16).length);
      }
      this.localTarget = (zeroPad + adjPow.toString(16)).substr(0, 64);
      let d = new SHA3.SHA3Hash(256);
      let seedhash_buf = Buffer5.alloc(32);
      this.seedhash = seedhash_buf.toString("hex");
      this.epoch_number = Math.floor(this.rpcData.height / this.epochLength);
      for (let i = 0; i < this.epoch_number; i++) {
        d = new SHA3.SHA3Hash(256);
        d.update(seedhash_buf);
        seedhash_buf = d.digest();
        this.seedhash = d.digest("hex");
      }
      const header_hash = this.serializeHeader();
      this.header_hash = reverseBuffer(sha256d(header_hash)).toString("hex");
      let override_target = 0;
      if (override_target !== 0 && adjPow > override_target) {
        zeroPad = "0";
        zeroPad = zeroPad.repeat(64 - override_target.toString(16).length);
        this.localTarget = (zeroPad + override_target.toString(16)).substr(0, 64);
      }
    });
  }
  serializeHeader() {
    let header = Buffer5.alloc(80);
    let position = 0;
    header.write(
      packUInt32BE(this.rpcData.height).toString("hex"),
      position,
      4,
      "hex"
    );
    header.write(this.rpcData.bits, position += 4, 4, "hex");
    header.write(this.nTime, position += 4, 4, "hex");
    header.write(this.merkleRoot, position += 4, 32, "hex");
    header.write(this.rpcData.previousblockhash, position += 32, 32, "hex");
    header.writeUInt32BE(this.rpcData.version, position + 32, 4);
    header = reverseBuffer(header);
    return header;
  }
  serializeBlock(header_hash, nonce, mixhash) {
    let header = this.serializeHeader();
    let foo = Buffer5.alloc(40);
    foo.write(reverseBuffer(nonce).toString("hex"), 0, 8, "hex");
    foo.write(reverseBuffer(mixhash).toString("hex"), 8, 32, "hex");
    let buf = Buffer5.concat([
      header,
      foo,
      varIntBuffer(this.rpcData.transactions.length + 1),
      Buffer5.from(this.genTx, "hex")
    ]);
    if (this.rpcData.transactions.length > 0) {
      this.rpcData.transactions.forEach((value) => {
        const tmpBuf = Buffer5.concat([buf, Buffer5.from(value.data, "hex")]);
        buf = tmpBuf;
      });
    }
    return buf;
  }
  registerSubmit(header, nonce) {
    var submission = header + nonce;
    if (this.submits.indexOf(submission) === -1) {
      this.submits.push(submission);
      return true;
    }
    return false;
  }
  getJobParams() {
    if (!this.jobParams) {
      this.jobParams = [
        this.jobId,
        this.header_hash,
        this.seedhash,
        this.localTarget,
        true,
        this.rpcData.height,
        this.rpcData.bits
      ];
    }
    return this.jobParams;
  }
};

// src/nonce.ts
import crypto3 from "node:crypto";
var ExtraNonceCounter = class {
  next() {
    return crypto3.randomBytes(2).toString("hex");
  }
};

// src/job-counter.ts
import { Buffer as Buffer6 } from "node:buffer";
var JobCounter = class {
  constructor() {
    this.counter = 52428;
  }
  next() {
    this.counter++;
    if (this.counter % 1099511627775 === 0) {
      this.counter = 1;
    }
    return this.cur();
  }
  cur() {
    const counter_buf = Buffer6.alloc(32);
    counter_buf.writeUIntBE(parseInt("000000000000000000000000"), 0, 6);
    counter_buf.writeUIntBE(this.counter, 26, 6);
    return counter_buf.toString("hex");
  }
};

// src/job-manager.ts
var JobManager = class extends EventEmitter2 {
  constructor(options) {
    var _a;
    super();
    this.extraNonceCounter = new ExtraNonceCounter();
    this.jobCounter = new JobCounter();
    this.validJobs = {};
    this._options = options;
    this._algorithm = algorithms[options.coin.algorithm];
    this.shareMultiplier = (_a = this._algorithm.multiplier) != null ? _a : 1;
    this.hashDigest = this._algorithm.hash(options.coin);
    this.setupJobDaemonInterface(() => {
    });
  }
  emitLog(text) {
    this.emit("log", "debug", text);
  }
  emitWarningLog(text) {
    this.emit("log", "warning", text);
  }
  emitErrorLog(text) {
    this.emit("log", "error", text);
  }
  emitSpecialLog(text) {
    this.emit("log", "special", text);
  }
  setupJobDaemonInterface(finishedCallback) {
    if (!Array.isArray(this._options.daemons) || this._options.daemons.length < 1) {
      this.emitErrorLog("No daemons have been configured - pool cannot start");
      return;
    }
    this.daemon = new DaemonInterface(
      this._options.daemons,
      (severity, message) => {
        this.emit("log", severity, message);
      }
    );
    this.daemon.once("online", () => {
      finishedCallback();
    }).on("connectionFailed", (error) => {
      this.emitErrorLog(
        "Failed to connect daemon(s): " + JSON.stringify(error)
      );
    }).on("error", (message) => {
      this.emitErrorLog(message);
    });
    this.daemon.init();
  }
  isHexString(s) {
    const check = String(s).toLowerCase();
    if (check.length % 2) {
      return false;
    }
    for (let i = 0; i < check.length; i = i + 2) {
      const c = check[i] + check[i + 1];
      if (!this.isHex(c)) return false;
    }
    return true;
  }
  isHex(c) {
    const a = parseInt(c, 16);
    let b = a.toString(16).toLowerCase();
    if (b.length % 2) {
      b = "0" + b;
    }
    if (b !== c) {
      return false;
    }
    return true;
  }
  updateCurrentJob(rpcData) {
    return __async(this, null, function* () {
      const tmpBlockTemplate = new BlockTemplate(
        this.jobCounter.next(),
        rpcData,
        this._options
      );
      yield tmpBlockTemplate.init();
      this.currentJob = tmpBlockTemplate;
      this.emit("updatedBlock", tmpBlockTemplate, true);
      this.validJobs[tmpBlockTemplate.jobId] = tmpBlockTemplate;
    });
  }
  processTemplate(rpcData) {
    return __async(this, null, function* () {
      let isNewBlock = typeof this.currentJob === "undefined";
      if (!isNewBlock && this.currentJob.rpcData.previousblockhash !== rpcData.previousblockhash) {
        isNewBlock = true;
        if (rpcData.height < this.currentJob.rpcData.height) {
          return false;
        }
      }
      if (!isNewBlock) {
        return false;
      }
      const tmpBlockTemplate = new BlockTemplate(
        this.jobCounter.next(),
        rpcData,
        this._options
      );
      yield tmpBlockTemplate.init();
      this.currentJob = tmpBlockTemplate;
      this.validJobs = {};
      this.emit("newBlock", tmpBlockTemplate);
      this.validJobs[tmpBlockTemplate.jobId] = tmpBlockTemplate;
      return true;
    });
  }
  processShare(miner_given_jobId, _previousDifficulty, difficulty, miner_given_nonce, ipAddress, port, workerName, miner_given_header, miner_given_mixhash, extraNonce1, callback_parent) {
    const _this = this;
    const submitTime = Date.now() / 1e3 | 0;
    const shareError = (error) => {
      this.emit("share", {
        job: miner_given_jobId,
        ip: ipAddress,
        worker: workerName,
        difficulty,
        error: error[1]
      });
      callback_parent({ error, result: null });
      return;
    };
    const job = this.validJobs[miner_given_jobId];
    if (typeof job === "undefined" || job.jobId !== miner_given_jobId) {
      return shareError([20, "job not found"]);
    }
    const headerBuffer = job.serializeHeader();
    let header_hash = reverseBuffer(sha256d(headerBuffer)).toString("hex");
    if (job.curTime < submitTime - 600) {
      return shareError([20, "job is too old"]);
    }
    if (!this.isHexString(miner_given_header)) {
      return shareError([20, "invalid header hash, must be hex"]);
    }
    if (header_hash !== miner_given_header) {
      return shareError([20, "invalid header hash"]);
    }
    if (!this.isHexString(miner_given_nonce)) {
      return shareError([20, "invalid nonce, must be hex"]);
    }
    if (!this.isHexString(miner_given_mixhash)) {
      return shareError([20, "invalid mixhash, must be hex"]);
    }
    if (miner_given_nonce.length !== 16) {
      return shareError([20, "incorrect size of nonce, must be 8 bytes"]);
    }
    if (miner_given_mixhash.length !== 64) {
      return shareError([20, "incorrect size of mixhash, must be 32 bytes"]);
    }
    if (miner_given_nonce.indexOf(extraNonce1.substring(0, 4)) !== 0) {
      return shareError([24, "nonce out of worker range"]);
    }
    if (!job.registerSubmit(
      header_hash.toLowerCase(),
      miner_given_nonce.toLowerCase()
    )) {
      return shareError([22, "duplicate share"]);
    }
    let powLimit = this._algorithm.diff;
    let adjPow = powLimit / difficulty;
    let zeroPad = "";
    if (64 - adjPow.toString(16).length !== 0) {
      zeroPad = "0";
      zeroPad = zeroPad.repeat(64 - adjPow.toString(16).length);
    }
    let target_share_hex = (zeroPad + adjPow.toString(16)).substr(0, 64);
    let blockHashInvalid;
    let blockHash;
    let blockHex;
    if (this._options.kawpow_validator === "kawpowd") {
      async.series(
        [
          function(callback) {
            const kawpowd_url = "http://" + _this._options.kawpow_wrapper_host + ":" + _this._options.kawpow_wrapper_port + "/?header_hash=" + header_hash + "&mix_hash=" + miner_given_mixhash + "&nonce=" + miner_given_nonce + "&height=" + job.rpcData.height + "&share_boundary=" + target_share_hex + "&block_boundary=" + job.target_hex;
            http2.get(kawpowd_url, (res) => {
              res.setEncoding("utf8");
              let body = "";
              res.on("data", (data) => {
                body += data;
              });
              res.on("end", () => {
                body = JSON.parse(body);
                console.log(
                  "********** INCOMING SHARE FROM WORKER ************"
                );
                console.log("header_hash            = " + header_hash);
                console.log("miner_sent_header_hash = " + miner_given_header);
                console.log("miner_sent_mixhash     = " + miner_given_mixhash);
                console.log("miner_sent_nonce       = " + miner_given_nonce);
                console.log("height                 = " + job.rpcData.height);
                console.log("job.difficulty         = " + job.difficulty);
                console.log("BLOCK.target           = " + job.target_hex);
                console.log("SHARE.target           = " + target_share_hex);
                console.log("digest                 = " + body.digest);
                console.log("miner_sent_jobid       = " + miner_given_jobId);
                console.log("job                    = " + miner_given_jobId);
                console.log("worker                 = " + workerName);
                console.log("height                 = " + job.rpcData.height);
                console.log("difficulty             = " + difficulty);
                console.log("kawpowd_url            = " + kawpowd_url);
                console.log(
                  "********** END INCOMING SHARE FROM WORKER ************"
                );
                if (body.share === false) {
                  if (body.block === false) {
                    callback(
                      "kawpow share didn't meet job or block difficulty level",
                      false
                    );
                    return shareError([20, "kawpow validation failed"]);
                  }
                }
                if (body.block === true) {
                  blockHex = job.serializeBlock(
                    Buffer7.from(header_hash, "hex"),
                    Buffer7.from(miner_given_nonce, "hex"),
                    Buffer7.from(miner_given_mixhash, "hex")
                  ).toString("hex");
                  blockHash = body.digest;
                }
                callback(null, true);
                return;
              });
            });
          },
          function(callback) {
            const blockDiffAdjusted = job.difficulty * _this.shareMultiplier;
            let shareDiffFixed = void 0;
            if (blockHash !== void 0) {
              const headerBigNum = blockHash.readInt32LE(0);
              const shareDiff = _this._algorithm.diff / headerBigNum * _this.shareMultiplier;
              shareDiffFixed = shareDiff.toFixed(8);
            }
            _this.emit(
              "share",
              {
                job: miner_given_jobId,
                ip: ipAddress,
                port,
                worker: workerName,
                height: job.rpcData.height,
                blockReward: job.rpcData.reward,
                minerReward: job.rpcData.coinbasevalue,
                difficulty,
                shareDiff: shareDiffFixed,
                blockDiff: blockDiffAdjusted,
                blockDiffActual: job.difficulty,
                blockHash,
                blockHashInvalid
              },
              blockHex
            );
            callback_parent({
              result: true,
              error: null,
              blockHash
            });
            callback(null, true);
            return;
          }
        ],
        // @ts-ignore
        function(err) {
          if (err !== null) {
            _this.emitErrorLog("kawpow verify failed, ERRORS: " + err);
            return;
          }
        }
      );
    } else if (this._options.meowpow_validator === "meowpowd") {
      async.series(
        [
          function(callback) {
            const meowpowd_url = "http://" + _this._options.meowpow_wrapper_host + ":" + _this._options.meowpow_wrapper_port + "/?header_hash=" + header_hash + "&mix_hash=" + miner_given_mixhash + "&nonce=" + miner_given_nonce + "&height=" + job.rpcData.height + "&share_boundary=" + target_share_hex + "&block_boundary=" + job.target_hex;
            http2.get(meowpowd_url, (res) => {
              res.setEncoding("utf8");
              let body = "";
              res.on("data", (data) => {
                body += data;
              });
              res.on("end", () => {
                body = JSON.parse(body);
                console.log(
                  "********** INCOMING SHARE FROM WORKER ************"
                );
                console.log("header_hash            = " + header_hash);
                console.log("miner_sent_header_hash = " + miner_given_header);
                console.log("miner_sent_mixhash     = " + miner_given_mixhash);
                console.log("miner_sent_nonce       = " + miner_given_nonce);
                console.log("height                 = " + job.rpcData.height);
                console.log("job.difficulty         = " + job.difficulty);
                console.log("BLOCK.target           = " + job.target_hex);
                console.log("SHARE.target           = " + target_share_hex);
                console.log("digest                 = " + body.digest);
                console.log("miner_sent_jobid       = " + miner_given_jobId);
                console.log("job                    = " + miner_given_jobId);
                console.log("worker                 = " + workerName);
                console.log("height                 = " + job.rpcData.height);
                console.log("difficulty             = " + difficulty);
                console.log("meowpowd_url            = " + meowpowd_url);
                console.log(
                  "********** END INCOMING SHARE FROM WORKER ************"
                );
                if (body.share === false) {
                  if (body.block === false) {
                    callback(
                      "meowpow share didn't meet job or block difficulty level",
                      false
                    );
                    return shareError([20, "meowpow validation failed"]);
                  }
                }
                if (body.block === true) {
                  blockHex = job.serializeBlock(
                    Buffer7.from(header_hash, "hex"),
                    Buffer7.from(miner_given_nonce, "hex"),
                    Buffer7.from(miner_given_mixhash, "hex")
                  ).toString("hex");
                  blockHash = body.digest;
                }
                callback(null, true);
                return;
              });
            });
          },
          function(callback) {
            const blockDiffAdjusted = job.difficulty * _this.shareMultiplier;
            let shareDiffFixed = void 0;
            if (blockHash !== void 0) {
              const headerBigNum = blockHash.readInt32LE(0);
              const shareDiff = _this._algorithm.diff / headerBigNum * _this.shareMultiplier;
              shareDiffFixed = shareDiff.toFixed(8);
            }
            _this.emit(
              "share",
              {
                job: miner_given_jobId,
                ip: ipAddress,
                port,
                worker: workerName,
                height: job.rpcData.height,
                blockReward: job.rpcData.reward,
                minerReward: job.rpcData.coinbasevalue,
                difficulty,
                shareDiff: shareDiffFixed,
                blockDiff: blockDiffAdjusted,
                blockDiffActual: job.difficulty,
                blockHash,
                blockHashInvalid
              },
              blockHex
            );
            callback_parent({
              result: true,
              error: null,
              blockHash
            });
            callback(null, true);
            return;
          }
        ],
        // @ts-ignore
        function(err) {
          if (err !== null) {
            _this.emitErrorLog("meowpow verify failed, ERRORS: " + err);
            return;
          }
        }
      );
    } else if (this._options.coin.algorithm === "kawpow") {
      this.daemon.cmd(
        "getkawpowhash",
        [
          header_hash,
          miner_given_mixhash,
          miner_given_nonce,
          job.rpcData.height,
          job.target_hex
        ],
        (results) => {
          let digest = results.digest;
          let result = results.result;
          let mix_hash = results.mix_hash;
          let blockHex2;
          let blockHash2;
          if (result === "true") {
            const headerBigNum = new BigNumber4(digest, 16);
            let blockDiffAdjusted = job.difficulty * this.shareMultiplier;
            const shareDiff = this._algorithm.diff / headerBigNum.toNumber() * this.shareMultiplier;
            const shareDiffFixed = shareDiff.toFixed(8);
            if (job.target.isGreaterThan(headerBigNum)) {
              blockHex2 = job.serializeBlock(
                Buffer7.from(header_hash, "hex"),
                Buffer7.from(miner_given_nonce, "hex"),
                Buffer7.from(mix_hash, "hex")
              ).toString("hex");
              blockHash2 = digest;
            }
            blockDiffAdjusted = job.difficulty * this.shareMultiplier;
            this.emit(
              "share",
              {
                job: miner_given_jobId,
                ip: ipAddress,
                port,
                worker: workerName,
                height: job.rpcData.height,
                blockReward: job.rpcData.coinbasevalue,
                minerReward: job.rpcData.rewardToPool,
                difficulty,
                shareDiff: shareDiffFixed,
                blockDiff: blockDiffAdjusted,
                blockDiffActual: job.difficulty,
                blockHash: blockHash2,
                blockHashInvalid
              },
              blockHex2
            );
            callback_parent({
              result: true,
              error: null,
              blockHash: blockHash2
            });
          } else {
            return shareError([20, "bad share: invalid hash"]);
          }
        }
      );
    } else if (this._options.coin.algorithm === "meowpow") {
      this.daemon.cmd(
        "getmeowpowhash",
        [
          header_hash,
          miner_given_mixhash,
          miner_given_nonce,
          job.rpcData.height,
          job.target_hex
        ],
        (results) => {
          let digest = results.digest;
          let result = results.result;
          let mix_hash = results.mix_hash;
          let blockHex2;
          let blockHash2;
          if (result === "true") {
            const headerBigNum = new BigNumber4(digest, 16);
            let blockDiffAdjusted = job.difficulty * this.shareMultiplier;
            const shareDiff = this._algorithm.diff / headerBigNum.toNumber() * this.shareMultiplier;
            const shareDiffFixed = shareDiff.toFixed(8);
            if (job.target.isGreaterThan(headerBigNum)) {
              blockHex2 = job.serializeBlock(
                Buffer7.from(header_hash, "hex"),
                Buffer7.from(miner_given_nonce, "hex"),
                Buffer7.from(mix_hash, "hex")
              ).toString("hex");
              blockHash2 = digest;
            }
            blockDiffAdjusted = job.difficulty * this.shareMultiplier;
            this.emit(
              "share",
              {
                job: miner_given_jobId,
                ip: ipAddress,
                port,
                worker: workerName,
                height: job.rpcData.height,
                blockReward: job.rpcData.coinbasevalue,
                minerReward: job.rpcData.rewardToPool,
                difficulty,
                shareDiff: shareDiffFixed,
                blockDiff: blockDiffAdjusted,
                blockDiffActual: job.difficulty,
                blockHash: blockHash2,
                blockHashInvalid
              },
              blockHex2
            );
            callback_parent({
              result: true,
              error: null,
              blockHash: blockHash2
            });
          } else {
            return shareError([20, "bad share: invalid hash"]);
          }
        }
      );
    } else if (this._options.coin.algorithm === "evrprogpow") {
      this.daemon.cmd(
        "getevrprogpowhash",
        [
          header_hash,
          miner_given_mixhash,
          miner_given_nonce,
          job.rpcData.height,
          job.target_hex
        ],
        (results) => {
          let digest = results.digest;
          let result = results.result;
          let mix_hash = results.mix_hash;
          let blockHex2;
          let blockHash2;
          if (result === "true") {
            const headerBigNum = new BigNumber4(digest, 16);
            let blockDiffAdjusted = job.difficulty * this.shareMultiplier;
            const shareDiff = this._algorithm.diff / headerBigNum.toNumber() * this.shareMultiplier;
            const shareDiffFixed = shareDiff.toFixed(8);
            if (job.target.isGreaterThan(headerBigNum)) {
              blockHex2 = job.serializeBlock(
                Buffer7.from(header_hash, "hex"),
                Buffer7.from(miner_given_nonce, "hex"),
                Buffer7.from(mix_hash, "hex")
              ).toString("hex");
              blockHash2 = digest;
            }
            blockDiffAdjusted = job.difficulty * this.shareMultiplier;
            this.emit(
              "share",
              {
                job: miner_given_jobId,
                ip: ipAddress,
                port,
                worker: workerName,
                height: job.rpcData.height,
                blockReward: job.rpcData.coinbasevalue,
                minerReward: job.rpcData.rewardToPool,
                difficulty,
                shareDiff: shareDiffFixed,
                blockDiff: blockDiffAdjusted,
                blockDiffActual: job.difficulty,
                blockHash: blockHash2,
                blockHashInvalid
              },
              blockHex2
            );
            callback_parent({
              result: true,
              error: null,
              blockHash: blockHash2
            });
          } else {
            return shareError([20, "bad share: invalid hash"]);
          }
        }
      );
    }
  }
};

// src/stratum/client.ts
import { Buffer as Buffer8 } from "node:buffer";
import { EventEmitter as EventEmitter3 } from "node:events";
var StratumClient = class extends EventEmitter3 {
  constructor(options) {
    super();
    this.authorized = false;
    this.difficulty = 8;
    this.extraNonce1 = null;
    this.lastActivity = Date.now();
    this.pendingDifficulty = null;
    this.previousDifficulty = null;
    this.requestedSubscriptionBeforeAuth = false;
    this.shares = {
      valid: 0,
      invalid: 0
    };
    this.version = null;
    this.workerName = "";
    this.workerPass = "";
    this._options = options;
    this._algorithm = algorithms[options.coin.algorithm];
    this.socket = options.socket;
    this.remoteAddress = options.socket.remoteAddress;
  }
  init() {
    this.setupSocket();
  }
  considerBan(shareValid) {
    if (shareValid === true) {
      this.shares.valid++;
    } else {
      this.shares.invalid++;
    }
    let totalShares = this.shares.valid + this.shares.invalid;
    if (this._options.banning && totalShares >= this._options.banning.checkThreshold) {
      let percentBad = this.shares.invalid / totalShares * 100;
      if (percentBad < this._options.banning.invalidPercent) {
        this.shares = { valid: 0, invalid: 0 };
      } else {
        this.emit(
          "triggerBan",
          this.shares.invalid + " out of the last " + totalShares + " shares were invalid"
        );
        this.socket.destroy();
        return true;
      }
    }
    return false;
  }
  handleMessage(message) {
    switch (message.method) {
      case "mining.subscribe":
        this.handleSubscribe(message);
        break;
      case "mining.authorize":
        this.handleAuthorize(message);
        break;
      case "mining.submit":
        this.lastActivity = Date.now();
        this.handleSubmit(message);
        break;
      case "mining.get_transactions":
        this.sendJson({
          id: null,
          result: [],
          error: true
        });
        break;
      case "mining.extranonce.subscribe":
        this.sendJson({
          id: message.id,
          result: false,
          error: [20, "Not supported.", null]
        });
        break;
      case "mining.eth_submitHashrate":
      case "eth_submitHashrate":
        this.handleEthSubmitHashrate(message);
        break;
      case "mining.hashrate":
      case "hashrate":
        this.handleHashrate(message);
        break;
      default:
        this.emit("unknownStratumMethod", message);
        break;
    }
  }
  handleEthSubmitHashrate(message) {
    console.log("handleEthSubmitHashrate message", message);
  }
  handleHashrate(message) {
    console.log("handleHashrate message", message);
  }
  handleSubscribe(message) {
    if (!this.authorized) {
      this.requestedSubscriptionBeforeAuth = true;
    }
    this.emit(
      "subscription",
      {},
      // @ts-ignore
      (error, extraNonce0, extraNonce1) => {
        if (error) {
          this.sendJson({
            id: message.id,
            result: null,
            error
          });
          return;
        }
        this.extraNonce1 = extraNonce1;
        this.sendJson({
          id: message.id,
          result: [null, extraNonce1],
          error: null
        });
      }
    );
  }
  getSafeString(s) {
    return s.toString().replace(/[^a-zA-Z0-9._]+/g, "");
  }
  getSafeWorkerString(raw) {
    var _a;
    let s = this.getSafeString(raw).split(".");
    let addr = s[0];
    let wname = (_a = s[1]) != null ? _a : "noname";
    return addr + "." + wname;
  }
  handleAuthorize(message) {
    this.workerName = this.getSafeWorkerString(message.params[0]);
    this.workerPass = message.params[1];
    const publicAddress = this.workerName.split(".")[0];
    if (!publicAddress) {
      throw new Error("missing worker name");
    }
    this._options.authorizeFn(
      this.remoteAddress,
      this.socket.localPort,
      publicAddress,
      this.workerPass,
      this.extraNonce1,
      this.version,
      ({ error, authorized, disconnect }) => {
        this.authorized = !error && authorized;
        this.sendJson({
          id: message.id,
          result: this.authorized,
          error
        });
        this.emit("authorization", {
          authorized: this.authorized,
          remoteAddress: this.remoteAddress,
          localPort: this.socket.localPort,
          publicAddress,
          workerPass: this.workerPass,
          extraNonce1: this.extraNonce1,
          version: this.version
        });
        if (disconnect === true) {
          this.socket.destroy();
        }
      }
    );
  }
  handleSubmit(message) {
    if (!this.workerName) {
      if (!message.params[0]) {
        throw new Error("missing worker name");
      }
      this.workerName = this.getSafeWorkerString(message.params[0]);
    }
    if (this.authorized === false) {
      this.sendJson({
        id: message.id,
        result: null,
        error: [24, "unauthorized worker", null]
      });
      this.considerBan(false);
      return;
    }
    if (!this.extraNonce1) {
      this.sendJson({
        id: message.id,
        result: null,
        error: [25, "not subscribed", null]
      });
      this.considerBan(false);
      return;
    }
    this.emit(
      "submit",
      {
        workerName: this.workerName,
        jobId: message.params[1],
        extraNonce2: message.params[2].substr(2),
        nTime: message.params[3].substr(2),
        nOnce: message.params[4].substr(2)
      },
      (error, result) => {
        this.sendJson({
          id: message.id,
          result,
          error
        });
      }
    );
  }
  sendJson(...params) {
    let response = "";
    for (let i = 0; i < params.length; i++) {
      response += JSON.stringify(params[i]) + "\n";
    }
    this.socket.write(response);
  }
  setupSocket() {
    let dataBuffer = "";
    this.socket.setEncoding("utf8");
    if (this._options.tcpProxyProtocol === true) {
      this.socket.once("data", (d) => {
        if (d.indexOf("PROXY") === 0) {
          this.remoteAddress = d.split(" ")[2];
        } else {
          this.emit("tcpProxyError", d);
        }
        this.emit("checkBan");
      });
    } else {
      this.emit("checkBan");
    }
    this.socket.on("data", (d) => {
      dataBuffer += d;
      if (Buffer8.byteLength(dataBuffer, "utf8") > 10240) {
        dataBuffer = "";
        this.emit("socketFlooded");
        this.socket.destroy();
        return;
      }
      if (dataBuffer.indexOf("\n") !== -1) {
        let messages = dataBuffer.split("\n");
        let incomplete = dataBuffer.slice(-1) === "\n" ? "" : messages.pop();
        messages.forEach((message) => {
          if (message.length < 1) return;
          let messageJson;
          try {
            messageJson = JSON.parse(message);
          } catch (e) {
            if (this._options.tcpProxyProtocol !== true || d.indexOf("PROXY") !== 0) {
              this.emit("malformedMessage", message);
              this.socket.destroy();
            }
            return;
          }
          if (messageJson) {
            this.handleMessage(messageJson);
          }
        });
        dataBuffer = incomplete;
      }
    });
    this.socket.on("close", () => {
      this.emit("socketDisconnect");
    });
    this.socket.on("error", (err) => {
      if (err.code !== "ECONNRESET") {
        this.emit("socketError", err);
      }
    });
  }
  getLabel() {
    return (this.workerName || "(unauthorized)") + " [" + this.remoteAddress + "]";
  }
  enqueueNextDifficulty(requestedNewDifficulty) {
    this.pendingDifficulty = requestedNewDifficulty;
    return true;
  }
  sendDifficulty(difficulty) {
    if (difficulty === this.difficulty) {
      return false;
    }
    this.previousDifficulty = this.difficulty;
    this.difficulty = difficulty;
    let powLimit = this._algorithm.diff;
    let adjPow = powLimit / difficulty;
    let zeroPad = "";
    if (64 - adjPow.toString(16).length !== 0) {
      zeroPad = "0";
      zeroPad = zeroPad.repeat(64 - adjPow.toString(16).length);
    }
    let target = (zeroPad + adjPow.toString(16)).substr(0, 64);
    this.sendJson({
      id: null,
      method: "mining.set_target",
      params: [target]
    });
    return true;
  }
  sendMiningJob(jobParams) {
    let lastActivityAgo = Date.now() - this.lastActivity;
    if (lastActivityAgo > this._options.connectionTimeout * 1e3) {
      this.socket.destroy();
      return;
    }
    if (this.pendingDifficulty !== null) {
      let result = this.sendDifficulty(this.pendingDifficulty);
      this.pendingDifficulty = null;
      if (result) {
        this.emit("difficultyChanged", this.difficulty);
      }
    }
    let personal_jobParams = jobParams;
    let powLimit = this._algorithm.diff;
    let adjPow = powLimit / this.difficulty;
    let zeroPad = "";
    if (64 - adjPow.toString(16).length !== 0) {
      zeroPad = "0";
      zeroPad = zeroPad.repeat(64 - adjPow.toString(16).length);
    }
    personal_jobParams[3] = (zeroPad + adjPow.toString(16)).substr(0, 64);
    this.sendJson({
      id: null,
      method: "mining.notify",
      params: personal_jobParams
    });
  }
  manuallyAuthClient(username, password) {
    this.handleAuthorize({ id: 1, params: [username, password] }, false);
  }
  manuallySetValues(otherClient) {
    this.extraNonce1 = otherClient.extraNonce1;
    this.previousDifficulty = otherClient.previousDifficulty;
    this.difficulty = otherClient.difficulty;
  }
};

// src/stratum/common.ts
var SubscriptionCounter = class {
  constructor() {
    this.count = 0;
    this.padding = "deadbeefcafebabe";
  }
  next() {
    this.count++;
    if (Number.MAX_VALUE === this.count) {
      this.count = 0;
    }
    return this.padding + packInt64LE(this.count).toString("hex");
  }
};

// src/stratum/server.ts
import { EventEmitter as EventEmitter4 } from "events";
import net from "net";
import tls from "tls";
var TLSoptions;
var StratumServer = class extends EventEmitter4 {
  constructor(options, authorizeFn) {
    super();
    this._stratumClients = {};
    this._subscriptionCounter = new SubscriptionCounter();
    this._bannedIPs = {};
    this._options = options;
    this._authorizeFn = authorizeFn;
    this._bannedMS = options.banning ? options.banning.time * 1e3 : null;
    this.init();
  }
  init() {
    if (this._options.banning && this._options.banning.enabled) {
      setInterval(() => {
        var _a;
        for (let ip in this._bannedIPs) {
          let banTime = (_a = this._bannedIPs[ip]) != null ? _a : 0;
          if (Date.now() - banTime > this._options.banning.time)
            delete this._bannedIPs[ip];
        }
      }, 1e3 * this._options.banning.purgeInterval);
    }
    let serversStarted = 0;
    Object.keys(this._options.ports).forEach((port) => {
      const p = this._options.ports[port];
      if (p.tls) {
        tls.createServer(TLSoptions, (socket) => {
          this.handleNewClient(socket);
        }).listen(parseInt(port), () => {
          serversStarted++;
          if (serversStarted === Object.keys(this._options.ports).length)
            this.emit("started");
        });
      } else {
        net.createServer({ allowHalfOpen: false }, (socket) => {
          this.handleNewClient(socket);
        }).listen(parseInt(port), () => {
          serversStarted++;
          if (serversStarted === Object.keys(this._options.ports).length)
            this.emit("started");
        });
      }
    });
  }
  checkBan(client) {
    var _a;
    if (this._options.banning && this._options.banning.enabled && client.remoteAddress in this._bannedIPs) {
      let bannedTime = (_a = this._bannedIPs[client.remoteAddress]) != null ? _a : 0;
      let bannedTimeAgo = Date.now() - bannedTime;
      let timeLeft = (this._bannedMS || 0) - bannedTimeAgo;
      if (timeLeft > 0) {
        client.socket.destroy();
        client.emit("kickedBannedIP", timeLeft / 1e3 | 0);
      } else {
        delete this._bannedIPs[client.remoteAddress];
        client.emit("forgaveBannedIP");
      }
    }
  }
  handleNewClient(socket) {
    socket.setKeepAlive(true);
    let subscriptionId = this._subscriptionCounter.next();
    let client = new StratumClient({
      coin: this._options.coin,
      subscriptionId,
      authorizeFn: this._authorizeFn,
      socket,
      banning: this._options.banning,
      connectionTimeout: this._options.connectionTimeout,
      tcpProxyProtocol: this._options.tcpProxyProtocol
    });
    this._stratumClients[subscriptionId] = client;
    this.emit("client.connected", client);
    client.on("socketDisconnect", () => {
      this.removeStratumClientBySubId(subscriptionId);
      this.emit("client.disconnected", client);
    }).on("checkBan", () => {
      this.checkBan(client);
    }).on("triggerBan", () => {
      this.addBannedIP(client.remoteAddress);
    }).init();
    return subscriptionId;
  }
  removeStratumClientBySubId(subscriptionId) {
    delete this._stratumClients[subscriptionId];
  }
  addBannedIP(ipAddress) {
    this._bannedIPs[ipAddress] = Date.now();
  }
  broadcastMiningJobs(jobParams) {
    for (let clientId in this._stratumClients) {
      let client = this._stratumClients[clientId];
      client.sendMiningJob(jobParams);
    }
    clearTimeout(this._rebroadcastTimeout);
    this._rebroadcastTimeout = setTimeout(() => {
      this.emit("broadcastTimeout");
    }, this._options.jobRebroadcastTimeout * 1e3);
  }
  getStratumClients() {
    return this._stratumClients;
  }
  manuallyAddStratumClient(client) {
    let subId = this.handleNewClient(client.socket);
    if (subId != null) {
      this._stratumClients[subId].manuallyAuthClient(
        client.workerName,
        client.workerPass
      );
      this._stratumClients[subId].manuallySetValues(client);
    }
  }
};

// src/var-diff.ts
import { EventEmitter as EventEmitter5 } from "events";
var RingBuffer = class {
  constructor(maxSize) {
    this.data = [];
    this.cursor = 0;
    this.isFull = false;
    this.maxSize = maxSize;
  }
  append(x) {
    if (this.isFull) {
      this.data[this.cursor] = x;
      this.cursor = (this.cursor + 1) % this.maxSize;
    } else {
      this.data.push(x);
      this.cursor++;
      if (this.data.length === this.maxSize) {
        this.cursor = 0;
        this.isFull = true;
      }
    }
  }
  avg() {
    const sum = this.data.reduce((a, b) => a + b);
    return sum / (this.isFull ? this.maxSize : this.cursor);
  }
  size() {
    return this.isFull ? this.maxSize : this.cursor;
  }
  clear() {
    this.data = [];
    this.cursor = 0;
    this.isFull = false;
  }
};
function toFixed(num, len) {
  return parseFloat(num.toFixed(len));
}
var VarDiff = class extends EventEmitter5 {
  constructor(port, varDiffOptions) {
    super();
    let variance = varDiffOptions.targetTime * (varDiffOptions.variancePercent / 100);
    this.bufferSize = varDiffOptions.retargetTime / varDiffOptions.targetTime * 4;
    this.tMin = varDiffOptions.targetTime - variance;
    this.tMax = varDiffOptions.targetTime + variance;
    this.port = Number(port);
    this.varDiffOptions = varDiffOptions;
  }
  manageClient(client) {
    let stratumPort = Number(client.socket.localPort);
    if (Number(stratumPort) !== Number(this.port)) {
      console.error("Handling a client which is not of this vardiff?");
    }
    let lastTimeStamp;
    let lastRtc;
    let timeBuffer;
    client.on("submit", () => {
      let ts = Date.now() / 1e3 | 0;
      if (!lastRtc) {
        lastRtc = ts - this.varDiffOptions.retargetTime / 2;
        lastTimeStamp = ts;
        timeBuffer = new RingBuffer(this.bufferSize);
        return;
      }
      let sinceLast = ts - lastTimeStamp;
      timeBuffer.append(sinceLast);
      lastTimeStamp = ts;
      if (ts - lastRtc < this.varDiffOptions.retargetTime && timeBuffer.size() > 0) {
        return;
      }
      lastRtc = ts;
      let avg = timeBuffer.avg();
      let ddiff = this.varDiffOptions.targetTime / avg;
      if (avg > this.tMax && client.difficulty > this.varDiffOptions.minDiff) {
        if (this.varDiffOptions.x2mode) {
          ddiff = 0.5;
        }
        if (ddiff * client.difficulty < this.varDiffOptions.minDiff) {
          ddiff = this.varDiffOptions.minDiff / client.difficulty;
        }
      } else if (avg < this.tMin) {
        if (this.varDiffOptions.x2mode) {
          ddiff = 2;
        }
        let diffMax = this.varDiffOptions.maxDiff;
        if (ddiff * client.difficulty > diffMax) {
          ddiff = diffMax / client.difficulty;
        }
      } else {
        return;
      }
      let newDiff = toFixed(client.difficulty * ddiff, 8);
      timeBuffer.clear();
      this.emit("newDifficulty", client, newDiff);
    });
  }
};

// ../../node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/pool.ts
var Pool = class extends EventEmitter6 {
  constructor(options, authorizeFn) {
    super();
    this.progpow_wrapper = null;
    this.varDiff = {};
    if (!(options.coin.algorithm in algorithms)) {
      this.emitErrorLog(
        "The " + options.coin.algorithm + " hashing algorithm is not supported."
      );
      throw new Error();
    }
    this._options = this.parseOptions(options);
    this._algorithm = algorithms[this._options.coin.algorithm];
    this._authorizeFn = authorizeFn;
    this.jobManager = new JobManager(this._options);
  }
  parseOptions(options) {
    const parsedOptions = __spreadProps(__spreadValues({}, options), {
      hasSubmitMethod: false,
      poolAddressScript: () => {
      },
      initStats: {
        connections: 0,
        difficulty: 0,
        networkHashRate: 0,
        stratumPorts: []
      },
      protocolVersion: 0,
      recipients: [],
      testnet: (options == null ? void 0 : options.testnet) || false
    });
    return parsedOptions;
  }
  emitLog(text) {
    this.emit("log", "debug", text);
  }
  emitWarningLog(text) {
    this.emit("log", "warning", text);
  }
  emitErrorLog(text) {
    this.emit("log", "error", text);
  }
  emitSpecialLog(text) {
    this.emit("log", "special", text);
  }
  start() {
    return __async(this, null, function* () {
      try {
        console.log("Starting Var Diff");
        this.setupVarDiff();
        console.log("Setting up API");
        this.setupApi();
        console.log("Setting up Daemon Interfaces");
        yield this.setupDaemonInterface();
        console.log("Detecting Coin Data");
        yield this.detectCoinData();
        console.log("Setting up Recipients");
        this.setupRecipients();
        console.log("Setting up Job Manager");
        this.setupJobManager();
        console.log("Checking Blockchain Sync");
        this.onBlockchainSynced(() => {
          console.log("Getting First Job");
          this.getFirstJob(() => {
            console.log("Setting up Block Polling");
            this.setupBlockPolling();
            console.log("Starting Stratum Server");
            this.startStratumServer(() => {
              console.log("Outputting Pool Info");
              this.outputPoolInfo();
              this.emit("started");
            });
          });
        });
      } catch (error) {
        console.log("error", error);
      }
    });
  }
  getFirstJob(finishedCallback) {
    this.getBlockTemplate(
      (error, result) => {
        if (error) {
          this.emitErrorLog(
            "Error with getblocktemplate on creating first job, server cannot start"
          );
          return;
        }
        const portWarnings = [];
        const networkDiffAdjusted = this._options.initStats.difficulty;
        Object.keys(this._options.ports).forEach((port) => {
          const p = this._options.ports[port];
          const portDiff = p.diff;
          if (networkDiffAdjusted < portDiff)
            portWarnings.push("port " + port + " w/ diff " + portDiff);
        });
        if (portWarnings.length > 0 && (!process.env.forkId || process.env.forkId === "0")) {
          const warnMessage = "Network diff of " + networkDiffAdjusted + " is lower than " + portWarnings.join(" and ");
          this.emitWarningLog(warnMessage);
        }
        finishedCallback();
      }
    );
  }
  outputPoolInfo() {
    var _a, _b;
    const startMessage = "Stratum Pool Server Started for " + this._options.coin.name + " [" + this._options.coin.symbol.toUpperCase() + "] {" + this._options.coin.algorithm + "}";
    if (process.env.forkId && process.env.forkId !== "0") {
      this.emitLog(startMessage);
      return;
    }
    const infoLines = [
      startMessage,
      "Network Connected:	" + (this._options.testnet ? "Testnet" : "Mainnet"),
      "Detected Reward Type:	" + this._options.coin.reward,
      // @ts-ignore
      "Current Block Height:	" + this.jobManager.currentJob.rpcData.height,
      // @ts-ignore
      "Current Block Diff:	" + this.jobManager.currentJob.difficulty * this._algorithm.multiplier,
      "Current Connect Peers:	" + this._options.initStats.connections,
      "Network Hash Rate:	" + getReadableHashRateString(this._options.initStats.networkHashRate),
      "Stratum Port(s):	" + ((_b = (_a = this._options.initStats) == null ? void 0 : _a.stratumPorts) == null ? void 0 : _b.join(", ")) || ""
    ];
    if (typeof this._options.blockRefreshInterval === "number" && this._options.blockRefreshInterval > 0)
      infoLines.push(
        "Block polling every:	" + this._options.blockRefreshInterval + " ms"
      );
    console.log(infoLines.join("\n						"));
    this.emitSpecialLog(infoLines.join("\n						"));
  }
  onBlockchainSynced(syncedCallback) {
    const checkSynced = (displayNotSynced) => {
      this.daemon.cmd(
        "getblocktemplate",
        [
          {
            capabilities: ["coinbasetxn", "workid", "coinbase/append"],
            rules: ["segwit"]
          }
        ],
        (results) => {
          const synced = Array.isArray(results) ? results.every((x) => x.code !== 500 && x.code !== -10) : results.code !== 500 && results.code !== -10;
          if (synced) {
            syncedCallback();
          } else {
            if (displayNotSynced) {
              displayNotSynced();
            }
            setTimeout(checkSynced, 5e3);
            if (!process.env.forkId || process.env.forkId === "0") {
              generateProgress();
            }
          }
        }
      );
    };
    checkSynced(() => {
      if (!process.env.forkId || process.env.forkId === "0") {
        const err = "Daemon is still syncing with network (download blockchain) - server will be started once synced";
        this.emitErrorLog(err);
      }
    });
    const generateProgress = () => {
      this.daemon.cmd("getinfo", [], (results) => {
        const res = Array.isArray(results) ? results : [results];
        let blockCount = res.sort((a, b) => {
          return b.blocks - a.blocks;
        })[0].blocks;
        this.daemon.cmd("getpeerinfo", [], (results2) => {
          const peers = Array.isArray(results2) ? results2 : [results2];
          let totalBlocks = peers.sort(
            (a, b) => b.startingheight - a.startingheight
          )[0].startingheight;
          let percent = (blockCount / totalBlocks * 100).toFixed(2);
          this.emitWarningLog(
            "Downloaded " + percent + "% of blockchain from " + peers.length + " peers"
          );
        });
      });
    };
  }
  setupApi() {
    if (typeof this._options.api !== "object" || typeof this._options.api.start !== "function") {
    } else {
      this._options.api.start(this);
    }
  }
  setupVarDiff() {
    this.varDiff = {};
    Object.keys(this._options.ports).forEach((port) => {
      const p = this._options.ports[port];
      if (p.varDiff) {
        this.setVarDiff(port, p.varDiff);
      }
    });
  }
  submitBlock(blockHex, callback) {
    let rpcCommand, rpcArgs;
    if (this._options.hasSubmitMethod) {
      rpcCommand = "submitblock";
      rpcArgs = [blockHex];
    } else {
      rpcCommand = "getblocktemplate";
      rpcArgs = [{ mode: "submit", data: blockHex }];
    }
    this.daemon.cmd(rpcCommand, rpcArgs, (results) => {
      for (var i = 0; i < results.length; i++) {
        var result = results[i];
        if (result.error || result.response === "invalid-progpow") {
          this.emitErrorLog(
            "rpc error with daemon instance " + result.instance.index + " when submitting block with " + rpcCommand + " " + JSON.stringify(
              result.error + "  result.response=" + result.response
            )
          );
          return;
        } else if (result.response === "rejected") {
          this.emitErrorLog(
            "Daemon instance " + result.instance.index + " rejected a supposedly valid block"
          );
          return;
        }
      }
      this.emitLog(
        "Submitted Block using " + rpcCommand + " successfully to daemon instance(s)"
      );
      callback();
    });
  }
  setupRecipients() {
    const recipients = [];
    this._options.feePercent = 0;
    this._options.rewardRecipients = this._options.rewardRecipients || {};
    Object.keys(this._options.rewardRecipients).forEach((address2) => {
      var _a;
      const percent = (_a = this._options.rewardRecipients[address2]) != null ? _a : 0;
      this._options.feePercent += percent;
      recipients.push({
        address: address2,
        percent
      });
    });
    this._options.recipients = recipients;
  }
  setupJobManager() {
    this.jobManager = new JobManager(this._options);
    this.jobManager.on("newBlock", (blockTemplate) => {
      if (this.stratumServer) {
        this.stratumServer.broadcastMiningJobs(blockTemplate.getJobParams());
      }
    }).on("updatedBlock", (blockTemplate) => {
      if (this.stratumServer) {
        const job = blockTemplate.getJobParams();
        job[4] = false;
        this.stratumServer.broadcastMiningJobs(job);
      }
    }).on("share", (shareData, blockHex) => {
      let isValidShare = !shareData.error;
      let isValidBlock = !!blockHex;
      const emitShare = () => {
        this.emit("share", isValidShare, isValidBlock, shareData);
      };
      if (!isValidBlock) {
        emitShare();
      } else {
        if (this.jobManagerLastSubmitBlockHex === blockHex) {
          this.emitWarningLog("Warning, ignored duplicate submit block");
        } else {
          this.jobManagerLastSubmitBlockHex = blockHex;
          this.submitBlock(blockHex, () => {
            this.checkBlockAccepted(
              shareData.blockHash,
              (isAccepted, tx) => {
                isValidBlock = isAccepted === true;
                if (isValidBlock === true) {
                  shareData.txHash = tx;
                } else {
                  shareData.error = tx;
                }
                emitShare();
                this.getBlockTemplate(
                  (error, result, foundNewBlock) => {
                    if (foundNewBlock) {
                      this.emitLog(
                        "Block notification via RPC after block submission"
                      );
                    }
                  }
                );
              }
            );
          });
        }
      }
    }).on("log", (severity, message) => {
      this.emit("log", severity, message);
    });
  }
  setupDaemonInterface() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        if (!Array.isArray(this._options.daemons) || this._options.daemons.length < 1) {
          this.emitErrorLog(
            "No daemons have been configured - pool cannot start"
          );
          return;
        }
        this.daemon = new DaemonInterface(
          this._options.daemons,
          (severity, message) => {
            this.emit("log", severity, message);
          }
        );
        this.daemon.once("online", () => {
          resolve();
        }).on("connectionFailed", (error) => {
          this.emitErrorLog(
            "Failed to connect daemon(s): " + JSON.stringify(error)
          );
          reject();
        }).on("error", (message) => {
          this.emitErrorLog(message);
          reject();
        });
        this.daemon.init();
      });
    });
  }
  detectCoinData() {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const batchRpcCalls = [
          ["validateaddress", [this._options.address]],
          ["getdifficulty", []],
          ["getinfo", []],
          ["getmininginfo", []],
          ["submitblock", ["dummy"]]
        ];
        this.daemon.batchCmd(batchRpcCalls, (results) => {
          if (!results) {
            this.emitErrorLog(
              "Could not start pool, error with init batch RPC call"
            );
            return reject();
          }
          const rpcResults = {};
          for (let i = 0; i < results.length; i++) {
            const rpcCall = batchRpcCalls[i][0];
            rpcResults[rpcCall] = results[i];
            if (rpcCall !== "submitblock" && results[i].code === 500) {
              console.log("Could not start pool, error with init RPC");
              this.emitErrorLog(
                "Could not start pool, error with init RPC " + rpcCall + " - " + JSON.stringify(results[i].message)
              );
              return reject();
            }
          }
          if (!rpcResults.validateaddress.isvalid) {
            console.log("Daemon reports address is not valid");
            this.emitErrorLog("Daemon reports address is not valid");
            return reject();
          }
          if (isNaN(rpcResults.getdifficulty) && "proof-of-stake" in rpcResults.getdifficulty) {
            this._options.coin.reward = "POS";
          } else {
            this._options.coin.reward = "POW";
          }
          if (this._options.coin.reward === "POS" && typeof rpcResults.validateaddress.pubkey === "undefined") {
            console.log(
              "The address provided is not from the daemon wallet - this is required for POS coins."
            );
            this.emitErrorLog(
              "The address provided is not from the daemon wallet - this is required for POS coins."
            );
            return reject();
          }
          this._options.poolAddressScript = (() => {
            return addressToScript(rpcResults.validateaddress.address);
          })();
          this._options.testnet = rpcResults.getinfo.testnet;
          this._options.protocolVersion = rpcResults.getinfo.protocolversion;
          this._options.initStats = {
            connections: rpcResults.getinfo.connections,
            difficulty: rpcResults.getinfo.difficulty * this._algorithm.multiplier,
            networkHashRate: rpcResults.getmininginfo.networkhashps
          };
          if (rpcResults.submitblock.message === "Method not found") {
            this._options.hasSubmitMethod = false;
          } else if (rpcResults.submitblock.code === -1 || rpcResults.submitblock.message === "Block decode failed") {
            this._options.hasSubmitMethod = true;
          } else {
            this.emitErrorLog(
              "Could not detect block submission RPC method, " + JSON.stringify(results)
            );
            return reject();
          }
          resolve();
        });
      });
    });
  }
  startStratumServer(finishedCallback) {
    const _this = this;
    this.stratumServer = new StratumServer(this._options, this._authorizeFn);
    this.stratumServer.on("started", () => {
      this._options.initStats.stratumPorts = Object.keys(
        this._options.ports
      ).map((x) => Number(x));
      this.stratumServer.broadcastMiningJobs(
        this.jobManager.currentJob.getJobParams()
      );
      finishedCallback();
    }).on("broadcastTimeout", () => {
      this.emitLog(
        "No new blocks for " + this._options.jobRebroadcastTimeout + " seconds - updating transactions & rebroadcasting work"
      );
      this.getBlockTemplate(
        (error, rpcData, processedBlock) => __async(this, null, function* () {
          if (error || processedBlock) {
            return;
          }
          yield this.jobManager.updateCurrentJob(rpcData);
        })
      );
    }).on("client.connected", (client) => {
      if (typeof this.varDiff[client.socket.localPort] !== "undefined") {
        this.varDiff[client.socket.localPort].manageClient(client);
      }
      client.on("difficultyChanged", (diff) => {
        this.emit("difficultyUpdate", client.workerName, diff);
      }).on(
        "subscription",
        (params, resultCallback) => {
          let extraNonce = _this.jobManager.extraNonceCounter.next();
          resultCallback(null, extraNonce, extraNonce);
          if (typeof _this._options.ports[client.socket.localPort] !== "undefined" && _this._options.ports[client.socket.localPort].diff) {
            client.sendDifficulty(
              _this._options.ports[client.socket.localPort].diff
            );
          } else {
            client.sendDifficulty(8);
          }
          client.sendMiningJob(
            _this.jobManager.currentJob.getJobParams()
          );
        }
      ).on("authorization", (params) => {
        console.log("worker authorized", params.publicAddress);
      }).on("submit", (params, resultCallback) => {
        this.jobManager.processShare(
          params.jobId,
          client.previousDifficulty,
          client.difficulty,
          params.extraNonce2,
          client.remoteAddress,
          client.socket.localPort,
          params.workerName,
          params.nTime,
          params.nOnce,
          client.extraNonce1,
          (result) => {
            resultCallback(result.error, result.result ? true : null);
          }
        );
      }).on("malformedMessage", (message) => {
        this.emitWarningLog(
          "Malformed message from " + client.getLabel() + ": " + message
        );
      }).on("socketError", (err) => {
        this.emitWarningLog(
          "Socket error from " + client.getLabel() + ": " + JSON.stringify(err)
        );
      }).on("socketTimeout", (reason) => {
        this.emitWarningLog(
          "Connected timed out for " + client.getLabel() + ": " + reason
        );
      }).on("socketDisconnect", () => {
      }).on("kickedBannedIP", (remainingBanTime) => {
        this.emitLog(
          "Rejected incoming connection from " + client.remoteAddress + " banned for " + remainingBanTime + " more seconds"
        );
      }).on("forgaveBannedIP", () => {
        this.emitLog("Forgave banned IP " + client.remoteAddress);
      }).on("unknownStratumMethod", (fullMessage) => {
        this.emitLog(
          "Unknown stratum method from " + client.getLabel() + ": " + fullMessage.method
        );
      }).on("socketFlooded", () => {
        this.emitWarningLog(
          "Detected socket flooding from " + client.getLabel()
        );
      }).on("tcpProxyError", (data) => {
        this.emitErrorLog(
          "Client IP detection failed, tcpProxyProtocol is enabled yet did not receive proxy protocol message, instead got data: " + data
        );
      }).on("bootedBannedWorker", () => {
        this.emitWarningLog(
          "Booted worker " + client.getLabel() + " who was connected from an IP address that was just banned"
        );
      }).on("triggerBan", (reason) => {
        this.emitWarningLog(
          "Banned triggered for " + client.getLabel() + ": " + reason
        );
        this.emit("banIP", client.remoteAddress, client.workerName);
      });
    });
  }
  setupBlockPolling() {
    if (typeof this._options.blockRefreshInterval !== "number" || this._options.blockRefreshInterval <= 0) {
      this.emitLog("Block template polling has been disabled");
      return;
    }
    const pollingInterval = this._options.blockRefreshInterval;
    this.blockPollingIntervalId = setInterval(() => {
      this.getBlockTemplate(
        (error, result, foundNewBlock) => {
          if (foundNewBlock) {
            this.emitLog("Block notification via RPC polling");
          }
        }
      );
    }, pollingInterval);
  }
  getBlockTemplate(callback) {
    this.daemon.cmd(
      "getblocktemplate",
      [
        {
          capabilities: ["coinbasetxn", "workid", "coinbase/append"],
          rules: ["segwit"]
        }
      ],
      (result) => __async(this, null, function* () {
        var _a;
        if (result.code === 500) {
          this.emitLog("result.error = %s " + result.message);
          this.emitErrorLog(
            "getblocktemplate call failed for daemon instance " + ((_a = result == null ? void 0 : result.instance) == null ? void 0 : _a.index) + " with error " + JSON.stringify(result.error)
          );
          callback(result.message);
        } else {
          const processedNewBlock = yield this.jobManager.processTemplate(result);
          callback(null, result, processedNewBlock);
          callback = () => {
          };
        }
      }),
      true
    );
  }
  checkBlockAccepted(blockHash, callback) {
    this.daemon.cmd("getblock", [blockHash], (results) => {
      const res = Array.isArray(results) ? results : [results];
      const validResults = res.filter((result) => {
        return result && result.hash === blockHash;
      });
      if (validResults.length >= 1) {
        if (validResults[0].confirmations >= 0) {
          callback(true, validResults[0].tx[0]);
        } else {
          callback(false, {
            confirmations: validResults[0].confirmations
          });
        }
        return;
      }
      callback(false, { unknown: "check coin daemon logs" });
    });
  }
  processBlockNotify(blockHash, sourceTrigger) {
    this.emitLog("Block notification via " + sourceTrigger);
    if (typeof this.jobManager !== "undefined") {
      if (typeof this.jobManager.currentJob !== "undefined" && blockHash !== this.jobManager.currentJob.rpcData.previousblockhash) {
        this.getBlockTemplate(
          (error, result) => {
            if (error) {
              this.emitErrorLog(
                "Block notify error getting block template for " + this._options.coin.name
              );
            }
          }
        );
      }
    }
  }
  relinquishMiners(filterFn, resultCback) {
    const _this = this;
    const origStratumClients = this.stratumServer.getStratumClients();
    const stratumClients = [];
    Object.keys(origStratumClients).forEach((subId) => {
      stratumClients.push({
        subId,
        client: origStratumClients[subId]
      });
    });
    async2.filter(stratumClients, filterFn, function(clientsToRelinquish) {
      clientsToRelinquish.forEach((cObj) => {
        cObj.client.removeAllListeners();
        _this.stratumServer.removeStratumClientBySubId(cObj.subId);
      });
      process.nextTick(() => {
        resultCback(
          clientsToRelinquish.map((item) => {
            return item.client;
          })
        );
      });
    });
  }
  attachMiners(miners) {
    miners.forEach((clientObj) => {
      this.stratumServer.manuallyAddStratumClient(clientObj);
    });
    this.stratumServer.broadcastMiningJobs(
      this.jobManager.currentJob.getJobParams()
    );
  }
  getStratumServer() {
    return this.stratumServer;
  }
  setVarDiff(port, varDiffConfig) {
    if (typeof this.varDiff[port] !== "undefined") {
      this.varDiff[port].removeAllListeners();
    }
    this.varDiff[port] = new VarDiff(port, varDiffConfig);
    this.varDiff[port].on("newDifficulty", (client, newDiff) => {
      client.enqueueNextDifficulty(newDiff);
    });
  }
};

// src/peer.ts
import { EventEmitter as EventEmitter7 } from "node:events";
import { Buffer as Buffer9 } from "node:buffer";
import crypto4 from "node:crypto";
import net2 from "node:net";
var Peer = class extends EventEmitter7 {
  constructor(options) {
    var _a;
    super();
    this.verack = false;
    this.validConnectionConfig = true;
    this.invCodes = {
      error: 0,
      tx: 1,
      block: 2
    };
    this.networkServices = Buffer9.from("0100000000000000", "hex");
    // //NODE_NETWORK services (value 1 packed as uint64)
    this.emptyNetAddress = Buffer9.from(
      "010000000000000000000000000000000000ffff000000000000",
      "hex"
    );
    this.userAgent = varStringBuffer("/node-stratum/");
    this.blockStartHeight = Buffer9.from("00000000", "hex");
    this._options = options;
    this.magic = Buffer9.from(
      options.testnet ? options.coin.peerMagicTestnet : options.coin.peerMagic,
      "hex"
    );
    this.magicInt = this.magic.readUInt32LE(0);
    this.relayTransactions = ((_a = options == null ? void 0 : options.p2p) == null ? void 0 : _a.disableTransactions) === true ? Buffer9.from([0]) : Buffer9.from([]);
    this.commands = {
      version: this.commandStringBuffer("version"),
      inv: this.commandStringBuffer("inv"),
      verack: this.commandStringBuffer("verack"),
      addr: this.commandStringBuffer("addr"),
      getblocks: this.commandStringBuffer("getblocks")
    };
    this.init();
  }
  init() {
    this.connect();
  }
  connect() {
    this.client = net2.connect(
      {
        host: this._options.p2p.host,
        port: this._options.p2p.port
      },
      () => {
        this.sendVersion();
      }
    );
    this.client.on("close", () => {
      if (this.verack) {
        this.emit("disconnected");
        this.verack = false;
        this.connect();
      } else if (this.validConnectionConfig) {
        this.emit("connectionRejected");
      }
    });
    this.client.on("error", (e) => {
      if (e.code === "ECONNREFUSED") {
        this.validConnectionConfig = false;
        this.emit("connectionFailed");
      } else {
        this.emit("socketError", e);
      }
    });
    this.setupMessageParser(this.client);
  }
  sendVersion() {
    const payload = Buffer9.concat([
      packUInt32LE(this._options.protocolVersion),
      this.networkServices,
      packInt64LE(Date.now() / 1e3 | 0),
      this.emptyNetAddress,
      this.emptyNetAddress,
      crypto4.pseudoRandomBytes(8),
      this.userAgent,
      this.blockStartHeight,
      this.relayTransactions
    ]);
    this.sendMessage(this.commands.version, payload);
  }
  sendMessage(command, payload) {
    const message = Buffer9.concat([
      this.magic,
      command,
      packUInt32LE(payload.length),
      sha256d(payload).slice(0, 4),
      payload
    ]);
    this.client.write(message);
    this.emit("sentMessage", message);
  }
  setupMessageParser(client) {
    const beginReadingMessage = (preRead) => {
      this.readFlowingBytes(
        client,
        24,
        preRead,
        (header, lopped) => {
          const msgMagic = header.readUInt32LE(0);
          if (msgMagic !== this.magicInt) {
            this.emit("error", "bad magic number from peer");
            while (header.readUInt32LE(0) !== this.magicInt && header.length >= 4) {
              header = header.slice(1);
            }
            if (header.readUInt32LE(0) === this.magicInt) {
              beginReadingMessage(header);
            } else {
              beginReadingMessage(Buffer9.from([]));
            }
            return;
          }
          const msgCommand = header.slice(4, 16).toString();
          const msgLength = header.readUInt32LE(16);
          const msgChecksum = header.readUInt32LE(20);
          this.readFlowingBytes(
            client,
            msgLength,
            lopped,
            (payload, lopped2) => {
              if (sha256d(payload).readUInt32LE(0) !== msgChecksum) {
                this.emit("error", "bad payload - failed checksum");
                beginReadingMessage(null);
                return;
              }
              this.handleMessage(msgCommand, payload);
              beginReadingMessage(lopped2);
            }
          );
        }
      );
    };
    beginReadingMessage(null);
  }
  handleMessage(command, payload) {
    this.emit("peerMessage", { command, payload });
    switch (command) {
      case this.commands.inv.toString():
        this.handleInv(payload);
        break;
      case this.commands.verack.toString():
        if (!this.verack) {
          this.verack = true;
          this.emit("connected");
        }
        break;
      default:
        break;
    }
  }
  handleInv(payload) {
    let count = payload.readUInt8(0);
    payload = payload.slice(1);
    if (count >= 253) {
      count = payload.readUInt16LE(0);
      payload = payload.slice(2);
    }
    while (count--) {
      switch (payload.readUInt32LE(0)) {
        case this.invCodes.error:
          break;
        case this.invCodes.tx:
          break;
        case this.invCodes.block: {
          const block = payload.slice(4, 36).toString("hex");
          this.emit("blockFound", block);
          break;
        }
      }
      payload = payload.slice(36);
    }
  }
  commandStringBuffer(s) {
    return this.fixedLenStringBuffer(s, 12);
  }
  fixedLenStringBuffer(s, len) {
    const buff = Buffer9.alloc(len);
    buff.fill(0);
    buff.write(s);
    return buff;
  }
  readFlowingBytes(stream, amount, preRead, callback) {
    let buff = preRead ? preRead : Buffer9.from([]);
    const readData = (data) => {
      buff = Buffer9.concat([buff, data]);
      if (buff.length >= amount) {
        const returnData = buff.slice(0, amount);
        const lopped = buff.length > amount ? buff.slice(amount) : null;
        callback(returnData, lopped);
      } else {
        stream.once("data", readData);
      }
    };
    readData(Buffer9.from([]));
  }
};

// src/index.ts
function createPool(poolOptions, authorizeFn) {
  return new Pool(poolOptions, authorizeFn);
}
export {
  BlockTemplate,
  DaemonInterface,
  ExtraNonceCounter,
  JobCounter,
  JobManager,
  Peer,
  Pool,
  RingBuffer,
  StratumClient,
  StratumServer,
  SubscriptionCounter,
  VarDiff,
  algorithms,
  createGeneration,
  createPool,
  getFees,
  getRoot
};
