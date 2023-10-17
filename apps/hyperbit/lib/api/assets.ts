import { Asset, GetAssetDataResponse } from "@/types/api";
import { api } from "../api";
import { config } from "../config";

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
}): Promise<Record<string, Asset>> {
  const chain = config.chains[blockchain];
  if (chain.features.assetsEnabled) {
    const params: Record<string, string> = {
      count: count?.toString() ?? "25",
      start: start?.toString() ?? "0",
      verbose: verbose?.toString() ?? "true",
    };
    const url =
      `/api/v1/${blockchain}/assets?` + new URLSearchParams(params).toString();
    return api<Record<string, Asset>>(url.toString(), {
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
  const chain = config.chains[blockchain];
  if (chain.features.assetsEnabled) {
    return api<any>(`/api/v1/${blockchain}/assets/cache`, {
      cache: "no-store",
    });
  } else {
    return Promise.reject();
  }
}

export function getAssetData(
  name: string,
  blockchain: string
): Promise<GetAssetDataResponse> {
  const chain = config.chains[blockchain];
  if (chain.features.assetsEnabled) {
    return api<GetAssetDataResponse>(`/api/v1/${blockchain}/assets/${name}`, {
      cache: "no-store",
    });
  } else {
    return Promise.reject();
  }
}

export function listAddressesByAsset(name: string, blockchain: string) {
  const chain = config.chains[blockchain];
  if (chain.features.assetsEnabled) {
    return api<any>(`/api/v1/${blockchain}/assets/${name}/addresses`, {
      cache: "no-store",
    });
  } else {
    return Promise.reject();
  }
}
