import ExplorerTransactionClient from "./components/Client";

export async function ExplorerTransactionContainer({
  params,
}: {
  params: Promise<{ txid: string; blockchain: string }>;
}) {
  const { txid, blockchain } = await params;
  return <ExplorerTransactionClient txid={txid} blockchain={blockchain} />;
}
