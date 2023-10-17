import { rpcClients } from "@/lib/rpc";
import FaucetClient from "./client";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { subdomain: string };
}) {
  const chain = config.chains[params.subdomain];
  if (!chain.features.faucetEnabled) {
    return redirect("/");
  }
  const res = await rpcClients[params.subdomain].request("getbalance", {});
  const balance = Number(res) ? res : 0;

  return <FaucetClient blockchain={params.subdomain} balance={balance} />;
}
