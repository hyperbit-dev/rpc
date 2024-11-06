import { Wrapper } from "./components/Wrapper";

export async function ExplorerAssetContainer({
  params,
}: {
  params: Promise<{
    name: string | string[];
    blockchain: string;
    start: string;
    count: string;
  }>;
}) {
  const name = (await params).name;
  const blockchain = (await params).blockchain;
  const start = (await params).start;
  const count = (await params).count;

  return (
    <Wrapper name={name} blockchain={blockchain} start={start} count={count} />
  );
}
