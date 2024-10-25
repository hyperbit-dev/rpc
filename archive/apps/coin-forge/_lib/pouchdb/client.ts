import passworder from "browser-passworder";
import merge from "lodash.merge";
import pouchDb from "./config";
import { PouchDbWalletDoc } from ".";

/**
 * Should reconcile internal and API data before sending back to client or API
 */

class PouchClient {
  getWallets() {
    return pouchDb.allDocs({
      startkey: "wallet",
      attachments: true,
      include_docs: true,
    });
  }

  async getWallet(id: string, password: string) {
    const wallet = (await pouchDb.get(id, {
      attachments: true,
    })) as PouchDbWalletDoc;

    if (typeof wallet.data === "string") {
      wallet.data = await passworder.decrypt(password, wallet.data);
    }
    return wallet;
  }

  async createWallet(doc: PouchDbWalletDoc, password: string) {
    doc.data = await passworder.encrypt(password, doc.data);
    return pouchDb.put(doc);
  }
  updateWallet() {}
  deleteWallet() {}

  getAddresses() {}
  getAddress() {}
  updateAddress() {}
  deleteAddress() {}
}

export const pouchClient = new PouchClient();
