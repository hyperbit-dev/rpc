import { chains } from "@hyperbitjs/chains";
import { getMeowcoinAddress } from "./meowcoin";
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

  async getAddresses({
    chainId,
    addresses,
  }: {
    chainId: string;
    addresses: string[];
  }) {
    const promises: Promise<any>[] = [];

    switch (chainId.toUpperCase()) {
      case chains.rvn.mainnet.id.toUpperCase():
        addresses.forEach((address) => {
          promises.push(getRavencoinAddress(address));
        });
        break;
      case chains.mewc.mainnet.id.toUpperCase():
        addresses.forEach((address) => {
          promises.push(getMeowcoinAddress(address));
        });
        break;
      default:
        break;
    }
    const response = (await Promise.all(promises)).filter(Boolean);
    return response;
  }
}

export const addressService = new AddressService();
