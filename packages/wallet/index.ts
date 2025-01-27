import Mnemonic, { Address, GenerateAddressSet } from "@hyperbitjs/mnemonic";
import PouchDB from "pouchdb";
import { v4 as uuidv4 } from "uuid";
import { Account, Accounts, Options, PouchDBWallet } from "./types";

export class Wallet {
  public id?: string;
  public externalId?: string;
  public encryptionKey!: string;
  public mnemonic!: Mnemonic;
  public accounts: Accounts = {};

  private _pouchDb: any;
  private rev?: string;

  constructor({ database }: { database: string }) {
    this._pouchDb = new PouchDB(database);
  }

  public async init(
    options: Omit<Options, "database">
  ): Promise<PouchDBWallet> {
    this.id = options?.id?.includes("wallets_")
      ? options.id
      : `wallets_${uuidv4()}`;
    this.externalId = options.externalId;
    this.encryptionKey = options.encryptionKey;
    this.mnemonic = new Mnemonic({
      mnemonic: options.mnemonic,
      passphrase: options.passphrase ?? "",
      network: options.network,
      language: options.language,
    });
    await this.mnemonic.encrypt(this.encryptionKey);

    const res = await this._pouchDb
      .put({
        _id: this.id,
        externalId: this.externalId,
        mnemonic: this.mnemonic,
        accounts: this.accounts,
      })
      .then((res: PouchDBWallet) => {
        this.rev = res.rev;
        return res;
      })
      .catch((error: any) => {
        console.log("error", error);
      });
    return res;
  }

  public async toJSON() {
    return structuredClone({
      id: this.id,
      externalId: this.externalId,
      accounts: this.accounts,
    });
  }

  public getAccounts(): Accounts {
    return this.accounts;
  }

  public getAccount(num: number = 0): Account | undefined {
    return this.accounts[num];
  }

  public async generateAddress({
    account = 0,
    index,
    count,
  }: {
    account?: number;
    index: number;
    count?: number;
  }): Promise<GenerateAddressSet[] | undefined> {
    if(this.mnemonic.encrypted) {
      await this.mnemonic?.decrypt(this.encryptionKey);
    }
    const addresses = this.mnemonic?.generateAddresses({
      account,
      index,
      count,
    });
    if (addresses) {
      if (account && this.accounts[account?.toString()]) {
        this.accounts[account].external.push(addresses[0].external);
        this.accounts[account].change.push(addresses[account].change);
      } else {
        this.accounts[account] = {
          external: [addresses[account].external],
          change: [addresses[account].change],
        };
      }
    }
    await this.mnemonic.encrypt(this.encryptionKey);
    await this.updatePouchDb();
    return addresses;
  }

  private async updatePouchDb(): Promise<PouchDBWallet> {
    if(!this.mnemonic.encrypted) {
      await this.mnemonic.encrypt(this.encryptionKey);
    }
    return this._pouchDb
      .put({
        _id: this.id,
        externalId: this.externalId,
        mnemonic: this.mnemonic,
        accounts: this.accounts,
        _rev: this.rev,
      })
      .then((res: PouchDBWallet) => {
        this.rev = res.rev;
        return res;
      });
  }

  public getAddresses(): Address[] {
    const addresses = [];
    for (const account of Object.keys(this.accounts)) {
      for (const address of this.accounts[account].external) {
        addresses.push(address);
      }
      for (const address of this.accounts[account].change) {
        addresses.push(address);
      }
    }
    return addresses;
  }

  public getSimpleAddresses(): (string | Address)[] {
    const addresses = [];
    for (const account of Object.keys(this.accounts)) {
      for (const address of this.accounts[account].external) {
        addresses.push(address.address);
      }
      for (const address of this.accounts[account].change) {
        addresses.push(address.address);
      }
    }
    return addresses;
  }

  public depositAddress({
    generate,
    account = 0,
  }: {
    generate?: boolean;
    account?: number;
  }) {
    if (generate) {
      this.generateAddress({ account, index: 0, count: 1 });
    }
    return this._getLastAddress({ account });
  }

  private _getLastAddress({ account = 0 }: { account?: number }) {
    if (this.accounts[account]) {
      const addresses = Array.from(
        this.accounts[account]["external"].values()
      ).sort((a, b) => (a.path < b.path ? 1 : -1));
      return addresses[0];
    } else {
      throw new Error("account does not exist");
    }
  }
}
