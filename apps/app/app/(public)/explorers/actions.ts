"use server";

import { redirect } from "next/navigation";
import { getBlockHeight } from "~/_api/client/blocks";
import { config } from "~/_config";

export async function search(data: FormData) {
  const query = data.get("query");
  const type = data.get("type");
  const blockchain = data.get("blockchain") as string;
  const chain = config.blockchains.chains[blockchain];

  if (!query) {
    return;
  }

  switch (type) {
    case "height":
      const hash = await getBlockHeight({
        queryKey: [
          "",
          "",
          {
            height: query as string,
            blockchain,
          },
        ],
      });
      return redirect(`/explorers/${blockchain}/blocks/${hash}`);
    case "height":
      return redirect(`/explorers/${blockchain}/blocks/${query}`);
    case "transaction":
      return redirect(`/explorers/${blockchain}/transactions/${query}`);
    case "asset":
      if (chain?.features?.assetsEnabled) {
        return redirect(`/explorers/${blockchain}/assets/${query}`);
      }
    case "address":
    default:
      return redirect(`/explorers/${blockchain}/addresses/${query}`);
  }
}
