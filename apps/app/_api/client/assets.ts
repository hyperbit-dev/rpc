import { fetchClient } from "./fetchClient";
import { config } from "~/_config";

export function listAssets({
  count,
  start,
  verbose,
  blockchain,
}: {
  count?: number;
  start?: number;
  verbose?: boolean;
  blockchain: string;
}): Promise<Record<string, any>> {
  const chain = config.blockchains.chains[blockchain];
  if (chain.features.assetsEnabled) {
    const params: Record<string, string> = {
      count: count?.toString() ?? "25",
      start: start?.toString() ?? "0",
      verbose: verbose?.toString() ?? "true",
    };
    const url =
      `/api/v1/${blockchain}/assets?` + new URLSearchParams(params).toString();
    return fetchClient<Record<string, any>>(url.toString(), {
      cache: "no-store",
      query: {
        count,
        start,
        verbose,
      },
    });
  } else {
    return Promise.reject();
  }
}

export function getAssetsCache(blockchain: string): Promise<any> {
  const chain = config.blockchains.chains[blockchain];
  if (chain.features.assetsEnabled) {
    return fetchClient<any>(`/api/v1/${blockchain}/assets/cache`, {
      cache: "no-store",
    });
  } else {
    return Promise.reject();
  }
}

export function getAssetData(
  name: string,
  blockchain: string
): Promise<any> {
  const chain = config.blockchains.chains[blockchain];
  if (chain.features.assetsEnabled) {
    return fetchClient<any>(`/api/v1/explorer/assets/${name}?blockchain=${blockchain}`, {
      cache: "no-store",
    });
  } else {
    return Promise.reject();
  }
}

export function listAddressesByAsset(name: string, blockchain: string) {
  const chain = config.blockchains.chains[blockchain];
  if (chain.features.assetsEnabled) {
    return fetchClient<any>(`/api/v1/explorer/assets/${name}/addresses/?blockchain=${blockchain}`, {
      cache: "no-store",
    });
  } else {
    return Promise.reject();
  }
}
