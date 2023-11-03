import { listAssets } from "@/lib/api/assets";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";
import { Content } from "./_components/Content";

export default async function Page({
  params: { blockchain },
}: {
  params: { blockchain: string };
}) {
  const chain = config.chains[blockchain];
  if (!chain.features.assetsEnabled) {
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
