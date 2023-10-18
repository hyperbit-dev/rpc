import { Address as AddressParams } from "../types/address";

// export class Address<T extends AddressParams> {
//   constructor(public readonly AddressClass: new () => T) {}
// }

export class Address {
  address: string;
  balance?: number;
  received?: number;

  constructor(params: AddressParams) {
    this.address = params.address;
    this.balance = params.balance;
    this.received = params.received;
  }
}
