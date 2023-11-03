import { config } from "@/lib/config";
import { redirect } from "next/navigation";
import FaucetClient from "./_components/FaucetClient";
import { api } from "@/lib/api";
import { FaucetBalance } from "@/app/api/v1/[blockchain]/faucet/_types";

export default async function Page({
  params,
}: {
  params: { blockchain: string };
}) {
  const chain = config.chains[params.blockchain];
  if (!chain.features.faucetEnabled) {
    return redirect("/");
  }
  const faucet = await api<FaucetBalance>(
    `/api/v1/${params.blockchain}/faucet`
  );

  return <FaucetClient blockchain={params.blockchain} faucet={faucet} />;
}
