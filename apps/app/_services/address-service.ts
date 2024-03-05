import { chains } from "@hyperbitjs/chains";
import { getRavencoinAddress } from "./ravencoin";

class AddressService {
  getAddress(chainId: string, address: string) {
    switch (chainId.toUpperCase()) {
      case chains.rvn.mainnet.id.toUpperCase():
        return getRavencoinAddress(address);
      default:
        return Promise.resolve();
    }
  }

  async getAddresses(
    wallets: any[]
  ) {
    const promises: Promise<any>[] = [];
    wallets.forEach((wallet) => {
      wallet.accounts.forEach((account: any) => {
        account.addresses.forEach((addr: any) => {
          promises.push(
            this.getAddress(wallet.blockchain.chainId, addr.address)
          );
        });
      });
    });
    const response = (await Promise.all(promises)).filter(Boolean);
    return response;
  }
}

export const addressService = new AddressService();
