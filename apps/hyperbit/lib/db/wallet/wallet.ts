// import * as PouchDB from 'pouchdb';
import { Options } from "@hyperbitjs/rpc";
import Mnemonic from "@hyperbitjs/mnemonic";

type CWOptions = Options & {
  id?: string;
};

export class Wallet {
  private _mnemonic?: Mnemonic;
  constructor(options: CWOptions) {
    Object.assign(this, options);
  }
}
