import Mnemonic, { Address, GenerateAddressSet } from "@hyperbitjs/mnemonic";
import PouchDB from "pouchdb";
import { v4 as uuidv4 } from "uuid";
import { Account, Accounts, Options } from "./types";

export class Wallet {
  public id?: string;
  public label?: string;
  public externalId?: string;
  public mnemonic?: Mnemonic;
  public accounts: Accounts = {};

  private _pouchDb: any;
  private rev?: string;

  constructor({ database }: { database: string }) {
    this._pouchDb = new PouchDB(database);
  }

  public async init(options: Omit<Options, "database">) {
    this.id = options?.id?.includes("wallets_")
      ? options.id
      : `wallets_${uuidv4()}`;
    this.externalId = options.externalId;
    this.label = options.label;

    this.mnemonic = new Mnemonic({
      mnemonic: options.mnemonic,
      passphrase: options.passphrase ?? "",
      network: options.network,
      language: options.language,
    });

    const res = await this._pouchDb
      .put({
        _id: this.id,
        externalId: this.externalId,
        label: this.label,
        mnemonic: this.mnemonic,
        accounts: this.accounts,
      })
      .then((res: any) => {
        this.rev = res.rev;
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }

  public async toJSON() {
    return structuredClone({
      id: this.id,
      label: this.label,
      externalId: this.externalId,
      mnemonic: await this.mnemonic?.inspect(),
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
    return addresses;
  }

  private updatePouchDb(): Promise<void> {
    return this._pouchDb
      .put({
        _id: this.id,
        externalId: this.externalId,
        label: this.label,
        mnemonic: this.mnemonic,
        accounts: this.accounts,
        _rev: this.rev,
      })
      .then((res: any) => {
        this.rev = res.rev;
      });
  }

  public getAddresses(expanded?: boolean): (string | Address)[] {
    const addresses = [];
    for (const account of Object.keys(this.accounts)) {
      for (const address of this.accounts[account].external) {
        if (expanded) {
          addresses.push(address);
        } else {
          addresses.push(address.address);
        }
      }
      for (const address of this.accounts[account].change) {
        if (expanded) {
          addresses.push(address);
        } else {
          addresses.push(address.address);
        }
      }
    }
    return addresses;
  }

  /**
   * Get addresses that are in the list of incoming addresses but not in the wallet
   */
  public getMissingWalletAddresses(addresses: Address[]): Address[] {
    return addresses.filter(
      (x) => !this.getAddresses().includes((x as Address).address)
    );
  }

  /**
   * Return addresses that are in the wallet but not in the list of incoming addresses
   */
  public getMissingExternalAddresses(addresses: Address[]): Address[] {
    return this.getAddresses(true).filter(
      (y): y is Address =>
        !addresses.some((addr) => addr.address === (y as Address).address)
    );
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

  // private _syncToClient(params: any) {
  //   const wallet = this._pouchDb.get(this._id, { attachments: true });
  //   this._pouchDb.put({ ...wallet, ...params });
  // }

  // private _syncFromClient() {
  //   const wallet = this._pouchDb.get(this._id, { attachments: true });
  // }

  public async syncFromExternal(addresses: Address[]) {
    const missingAddresses = this.getMissingWalletAddresses(addresses);
    if (missingAddresses.length > 0) {
      for (const address of missingAddresses) {
        this.assignAddresstoAccount(address);
      }
    }
    await this.updatePouchDb();
  }

  private assignAddresstoAccount(address: Address): void {
    const account = address.path.split("/")[3];
    const isExternal = address.path.split("/")[4] === "0";

    if (this.accounts[account]) {
      if (isExternal) {
        this.accounts[account].external.push(address);
      } else {
        this.accounts[account].change.push(address);
      }
    } else {
      if (isExternal) {
        this.accounts[account] = { 
          external: [address],
          change: [],
        };
      } else {
        this.accounts[account] = {
          external: [],
          change: [address],
        };
      }
    }
  }
}
