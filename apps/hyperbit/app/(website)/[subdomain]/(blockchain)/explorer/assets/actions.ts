"use server";

import { listAssets } from "@/lib/api/assets";

export async function assetSearch({
  blockchain,
  count,
  start,
  verbose,
}: {
  blockchain: string;
  count: number;
  start: number;
  verbose: boolean;
}) {
  return listAssets({
    blockchain,
    count,
    start,
    verbose,
  });
}
