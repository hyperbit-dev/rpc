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

  return <Content blockchain={blockchain} />;
}
