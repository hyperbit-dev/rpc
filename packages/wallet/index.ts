import Mnemonic from "@hyperbitjs/mnemonic";
import PouchDB from "pouchdb";
import { v4 as uuidv4 } from "uuid";
import { Accounts, AccountsJSON, Addresses, Options } from "./types";

// TODO: Tie wallet to user and encryption

export class Wallet {
  private _id: string;
  private _externalId?: string;
  private _label: string;
  private _wallet: Mnemonic;
  private _accounts: Accounts = {
    0: { external: new Map(), change: new Map() },
  };
  private _pouchDb: any;

  constructor(options: Options) {
    this._id = options?.id?.includes("wallet_")
      ? options.id
      : `wallet_${uuidv4()}`;
    this._externalId = options.externalId;
    this._label = options.label;
    this._pouchDb = new PouchDB(options.database);

    this._wallet = new Mnemonic({
      mnemonic: options.mnemonic,
      passphrase: options.passphrase,
      network: options.network,
      language: options.language,
    });
    this.generateAddress(0, 20);

    if (options.id) {
      // check for pouch db _id. put/update
    } else {
      this._pouchDb.put({
        _id: this._id,
        externalId: this._externalId,
        label: this._label,
        wallet: this._wallet,
        accounts: this._accounts,
      });
    }
  }

  toJSON({ scrub = true }: { scrub?: boolean }) {
    const clone = structuredClone(this._accounts);
    let accounts: AccountsJSON = {};
    Object.keys(clone).forEach((key) => {
      const _key = Number(key);
      accounts[_key] = {
        external: Object.fromEntries(clone[_key].external),
        change: Object.fromEntries(clone[_key].change),
      };
      if (scrub) {
        Object.keys(accounts[_key].external).forEach((k) => {
          delete accounts[_key].external[k].privateKey;
          delete accounts[_key].external[k].wif;
        });
        Object.keys(accounts[_key].change).forEach((k) => {
          delete accounts[_key].change[k].privateKey;
          delete accounts[_key].change[k].wif;
        });
      }
    });

    return structuredClone({
      id: this._id,
      externalId: this._externalId,
      label: this._label,
      accounts: { ...clone, ...accounts },
    });
  }

  setExternalId(externalId: string) {
    this._externalId = externalId;
    this._syncToClient({ externalId });
  }

  wallet() {
    return this._wallet;
  }

  accounts(): Accounts {
    return this._accounts;
  }

  account(num: number = 0): Addresses | undefined {
    return this._accounts[num];
  }

  generateAddress(account: number = 0, count?: number) {
    const addressSet = this._wallet.generateAddresses({
      count: count ?? 1,
      account,
    });
    addressSet.forEach((set) => {
      this._accounts[account].external.set(set.external.path, set.external);
      this._accounts[account].change.set(set.change.path, set.change);
    });
  }

  depositAddress({
    generate,
    account = 0,
  }: {
    generate?: boolean;
    account?: number;
  }) {
    if (generate) {
      this.generateAddress(account, 1);
    }
    return this._getLastAddress({ account, type: "external" });
  }

  private _getLastAddress({
    account = 0,
    type = "external",
  }: {
    account?: number;
    type?: "external" | "change";
  }) {
    if (this._accounts[account]) {
      const addresses = Array.from(this._accounts[account][type].values()).sort(
        (a, b) => (a.path < b.path ? 1 : -1)
      );
      return addresses[0];
    } else {
      throw new Error("account does not exist");
    }
  }

  private _syncToClient(params: any) {
    const wallet = this._pouchDb.get(this._id, { attachments: true });
    this._pouchDb.put({ ...wallet, ...params });
  }

  private _syncFromClient() {
    const wallet = this._pouchDb.get(this._id, { attachments: true });
  }
}
