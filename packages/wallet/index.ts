import Mnemonic from "@hyperbitjs/mnemonic";
import { encrypt } from "@metamask/browser-passworder";
import PouchDB from "pouchdb";
import { v4 as uuidv4 } from "uuid";
import { Account, Accounts, Options } from "./types";

export class Wallet {
  public id: string;
  public externalId?: string;
  public label: string;
  public mnemonic: Mnemonic;
  public accounts: Accounts = {};

  private _options: Options;
  private _pouchDb: any;

  constructor(options: Options) {
    this.id = options?.id?.includes("wallets_")
      ? options.id
      : `wallets_${uuidv4()}`;
    this.externalId = options.externalId;
    this.label = options.label;

    this._options = options;
    this._pouchDb = new PouchDB(options.database);

    this.mnemonic = new Mnemonic({
      mnemonic: this._options.mnemonic,
      passphrase: this._options.passphrase ?? "",
      network: this._options.network,
      language: this._options.language,
    });
  }

  async init() {
    const addresses = this.mnemonic.generateAddresses({
      index: 0,
      count: 20,
      account: 0,
    });
    this.accounts = {
      "0": {
        external: [],
        change: [],
      },
    };

    addresses.forEach(async (address) => {
      const external = {
        ...address.external,
        privateKey: await encrypt(
          this._options.passphrase ?? "",
          address.external.privateKey
        ),
        wif: await encrypt(
          this._options.passphrase ?? "",
          address.external.wif
        ),
      };
      this.accounts[0].external.push(external);

      const change = {
        ...address.change,
        privateKey: await encrypt(
          this._options.passphrase ?? "",
          address.change.privateKey
        ),
        wif: await encrypt(this._options.passphrase ?? "", address.change.wif),
      };
      this.accounts[0].change.push(change);
    });

    await this.mnemonic.encrypt(this._options.passphrase ?? "");

    if (this._options.id) {
      // check for pouch db _id. put/update
    } else {
      this._pouchDb.put({
        _id: this.id,
        externalId: this.externalId,
        label: this.label,
        wallet: this.mnemonic,
        accounts: this.accounts,
      });
    }
  }

  async toJSON() {
    return structuredClone({
      id: this.id,
      externalId: this.externalId,
      label: this.label,
      wallet: await this.mnemonic.inspect(),
      accounts: this.accounts,
    });
  }

  // setExternalId(externalId: string) {
  //   this._externalId = externalId;
  //   this._syncToClient({ externalId });
  // }

  getAccounts(): Accounts {
    return this.accounts;
  }

  getAccount(num: number = 0): Account | undefined {
    return this.accounts[num];
  }

  // depositAddress({
  //   generate,
  //   account = 0,
  // }: {
  //   generate?: boolean;
  //   account?: number;
  // }) {
  //   if (generate) {
  //     this.generateAddress(account, 1);
  //   }
  //   return this._getLastAddress({ account, type: "external" });
  // }

  // private _getLastAddress({
  //   account = 0,
  //   type = "external",
  // }: {
  //   account?: number;
  //   type?: "external" | "change";
  // }) {
  //   if (this.accounts[account]) {
  //     const addresses = Array.from(this.accounts[account][type].values()).sort(
  //       (a, b) => (a.path < b.path ? 1 : -1)
  //     );
  //     return addresses[0];
  //   } else {
  //     throw new Error("account does not exist");
  //   }
  // }

  // private _syncToClient(params: any) {
  //   const wallet = this._pouchDb.get(this._id, { attachments: true });
  //   this._pouchDb.put({ ...wallet, ...params });
  // }

  // private _syncFromClient() {
  //   const wallet = this._pouchDb.get(this._id, { attachments: true });
  // }
}
