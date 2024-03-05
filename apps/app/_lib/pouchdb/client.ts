import merge from "lodash.merge";
import pouchDb from "./config";

/**
 * Should reconcile internal and API data before sending back to client or API
 */

class PouchClient {
  getWallets() {
    return pouchDb.allDocs({
      startkey: "wallets",
      include_docs: true,
    });
  }
  getWallet(id: string) {
    console.log('id', id)
    return pouchDb.get(id, { attachments: true });
  }
  createWallet(doc: any, res?: any) {
    return pouchDb.put(merge({ ...doc }, res));
  }
  updateWallet() {}
  deleteWallet() {}

  getAddresses() {}
  getAddress() {}
  updateAddress() {}
  deleteAddress() {}
}

export const pouchClient = new PouchClient();
