import { rpcClients } from "@/lib/rpc";
import FaucetClient from "./client";
import { config } from "@/lib/config";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { blockchain: string };
}) {
  const chain = config.chains[params.blockchain];
  if (!chain.features.faucetEnabled) {
    return redirect("/");
  }
  const res = await rpcClients[params.blockchain].request("getbalance", {});
  const balance = Number(res) ? res : 0;

  return <FaucetClient blockchain={params.blockchain} balance={balance} />;
}
