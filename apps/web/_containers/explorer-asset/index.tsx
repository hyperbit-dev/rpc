import { Wrapper } from "./components/Wrapper";

export async function ExplorerAssetContainer({
  params,
}: {
  params: Promise<{ name: string | string[]; blockchain: string }>;
}) {
  const name = (await params).name;
  const blockchain = (await params).blockchain;
  const assetName = Array.isArray(name) ? name.join("-") : name;

  return <Wrapper assetName={assetName} blockchain={blockchain} />;
}
