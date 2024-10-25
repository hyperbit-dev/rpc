import { listAssets } from "~/_api/client/assets";
import { config } from "~/_lib/config";
import { redirect } from "next/navigation";
import { Content } from "./components/Content";

export async function ExplorerAssetsContainer({
  params,
}: {
  params: Promise<{ blockchain: string }>;
}) {
  const blockchain = (await params).blockchain;
  const chain = config.chains[blockchain];
  if (!chain?.features?.assetsEnabled) {
    return redirect("/");
  }

  const assets = await listAssets({
    blockchain: blockchain,
    count: 100000000,
    start: 0,
    verbose: true,
  });

  return <Content blockchain={blockchain} assets={assets} />;
}
