import passworder from "browser-passworder";
import merge from "lodash.merge";
import { v4 as uuidv4 } from "uuid";
import pouchdb from "../../pouchdb";
import { PouchDbUser, UserOptions } from "./types";

export class User {
  private _id?: string;
  private _password: string;

  constructor({ id, password }: UserOptions) {
    this._id = id ?? uuidv4();
    this._password = password;
  }

  async connect() {
    const doc: PouchDbUser = {
      _id: `user_${this._id}`,
      password: passworder.encrypt(this._password, this._password),
    };

    return pouchdb
      .get(this._id as string)
      .then((res) => {
        return pouchdb.put(merge(doc, res));
      })
      .catch((err) => {
        if (err.name === "not_found") {
          return pouchdb.put(doc);
        }
        return err;
      });
  }
}
