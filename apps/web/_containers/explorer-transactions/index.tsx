import ExplorerTransactionsClient from "./components/Client";

export async function ExplorerTransactionsContainer({
  params,
}: {
  params: Promise<{ skip: string; count: string; blockchain: string }>;
}) {
  const { skip, count, blockchain } = await params;
  return (
    <ExplorerTransactionsClient
      skip={skip}
      count={count}
      blockchain={blockchain}
    />
  );
}
