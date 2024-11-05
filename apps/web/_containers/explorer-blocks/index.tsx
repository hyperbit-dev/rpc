import ExplorerBlocksClient from "./components/Client";

export async function ExplorerBlocksContainer({
  params,
}: {
  params: Promise<{ offset: string; limit: string; blockchain: string }>;
}) {
  const { offset, limit, blockchain } = await params;
  return (
    <ExplorerBlocksClient
      offset={offset}
      limit={limit}
      blockchain={blockchain}
    />
  );
}
