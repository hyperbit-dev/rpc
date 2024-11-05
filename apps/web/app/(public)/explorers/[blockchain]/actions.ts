"use server";

import { getBlockHeight } from "~/_api/client/blocks";
import { config } from "~/_config";
import { redirect } from "next/navigation";

export async function search(formData: FormData) {
  const query = formData.get("query");
  const type = formData.get("type");
  const blockchain = formData.get("blockchain") as string;
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
      return redirect(`/explorers/${blockchain}/blocks/${hash.hash}`);
    case "hash":
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
