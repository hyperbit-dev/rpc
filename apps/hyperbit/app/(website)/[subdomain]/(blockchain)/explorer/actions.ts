"use server";

import { getBlockHeight } from "@/lib/api/blocks";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";

export async function search(data: FormData) {
  const query = data.get("query");
  const type = data.get("type");
  const blockchain = data.get("blockchain") as string;
  const chain = config.chains[blockchain];

  if (!query) {
    return;
  }

  switch (type) {
    case "height":
      const hash = await getBlockHeight(query as string, blockchain);
      return redirect(`/explorer/blocks/${hash}`);
    case "height":
      return redirect(`/explorer/blocks/${query}`);
    case "transaction":
      return redirect(`/explorer/transactions/${query}`);
    case "asset":
      if (chain.features.assetsEnabled) {
        return redirect(`/explorer/assets/${query}`);
      }
    case "address":
    default:
      return redirect(`/explorer/addresses/${query}`);
  }
}
