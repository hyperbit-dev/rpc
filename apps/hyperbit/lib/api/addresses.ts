import {
  AddressBalanceResponse,
  AddressTxIdsResponse,
  AddressUtxosResponse,
  AssetDataResponse,
} from "@/types/api";
import { api } from "../api";
import { config } from "../config";
import { GenerateAddressSet } from "@hyperbitjs/mnemonic";

export function getAddressBalance(address: string, blockchain: string) {
  return api<AddressBalanceResponse[]>(
    `/api/v1/${blockchain}/addresses/${address}/balance`,
    {
      cache: "no-store",
    }
  );
}

export function listAssetBalancesByAddress(
  address: string,
  blockchain: string
) {
  const chain = config.chains[blockchain];
  if (chain.features.assetsEnabled) {
    return api<AssetDataResponse>(
      `/api/v1/${blockchain}/addresses/${address}/assets`,
      {
        cache: "no-store",
      }
    );
  } else {
    return Promise.reject();
  }
}

export function getAddressTxIds(address: string, blockchain: string) {
  return api<AddressTxIdsResponse[]>(
    `/api/v1/${blockchain}/addresses/${address}/txids`,
    {
      cache: "no-store",
    }
  );
}

export function getAddressUtxos(address: string, blockchain: string) {
  return api<AddressUtxosResponse[]>(
    `/api/v1/${blockchain}/addresses/${address}/utxos`,
    {
      cache: "no-store",
    }
  );
}

export function bulkAddAddresses(
  walletId: string,
  addresses: GenerateAddressSet[]
) {
  return api<AddressUtxosResponse[]>(`/api/v1/addresses/bulk`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({
      walletId,
      addresses,
    }),
  });
}
