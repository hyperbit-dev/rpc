import Mnemonic, { Address, Options } from "@hyperbitjs/mnemonic";
import { pouchClient } from "@/_lib/pouchdb";
import merge from "lodash.merge";
import { v4 as uuidv4 } from "uuid";
import { PouchDbWallet, PouchDbWalletAccounts } from "./types";

type WalletOptions = Options & {
  id?: string;
  name?: string;
};

export class Wallet {
  private _id: string;
  private _name?: string;
  private _mnemonic?: Mnemonic;
  private _options: Omit<WalletOptions, "id" | "name">;
  private _accounts: PouchDbWalletAccounts = {};

  constructor({ id, name, ...options }: WalletOptions) {
    this._id = id ?? uuidv4();
    this._name = name;
    this._options = options;
  }

  public init() {
    if (!this._mnemonic) {
      this._mnemonic = new Mnemonic(this._options);
      const external: Address[] = [];
      const change: Address[] = [];
      this._mnemonic
        .generateAddresses({ count: 20, index: 0 })
        .forEach((addressPair) => {
          external.push(addressPair.external);
          change.push(addressPair.change);
        });
      this._accounts[0] = {
        addresses: {
          external,
          change,
        },
      };
    }
    this._setWallet();
  }

  private _setWallet() {
    const mnemonic = this._mnemonic?.inspect();
    const doc: PouchDbWallet = {
      _id: this._id,
      name: this._name,
      words: mnemonic?.mnemonic,
      passphrase: this._options.passphrase,
      networkId: mnemonic?.network.id,
      language: this._options.language,
      accounts: this._accounts,
    };

    pouchClient
      .getWallet(this._id)
      .then((res) => {
        pouchClient.createWallet(merge(doc, res));
      })
      .catch((err) => {
        if (err.name === "not_found") {
          pouchClient.createWallet(doc);
        }
      });
  }

  public getAccounts() {
    return JSON.parse(JSON.stringify(this._accounts));
  }

  //   private _createDbWallet() {
  //     const mnemonic = this._mnemonic;
  //     const account = this._accounts;
  //   }

  /**
   * Sync local and db data
   */
  //   public syncWallet() {}
}
