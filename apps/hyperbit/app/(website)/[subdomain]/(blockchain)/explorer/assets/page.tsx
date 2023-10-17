import { listAssets } from "@/lib/api/assets";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";
import { Content } from "./components/Content";

export default async function Page({
  params: { subdomain },
}: {
  params: { subdomain: string };
}) {
  const chain = config.chains[subdomain];
  if (!chain.features.assetsEnabled) {
    return redirect("/");
  }

  const assets = await listAssets({
    blockchain: subdomain,
    count: 100000000,
    start: 0,
    verbose: true,
  });

  return <Content blockchain={subdomain} assets={assets} />;
}
