import ExplorerBlockClient from "./components/Client";

export async function ExplorerBlockContainer({
  params,
}: {
  params: Promise<{ blockhash: string; blockchain: string }>;
}) {
  const { blockhash, blockchain } = await params;
  return <ExplorerBlockClient blockhash={blockhash} blockchain={blockchain} />;
}
