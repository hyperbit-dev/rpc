import { getAssetData, listAddressesByAsset } from "~/_api/client/assets";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { Content } from "./components/Content";

export async function ExplorerAssetContainer({
  params,
}: {
  params: Promise<{ name: string | string[]; blockchain: string }>;
}) {
  const name = (await params).name;
  const blockchain = (await params).blockchain;
  const assetName = Array.isArray(name) ? name.join("-") : name;
  const asset = await getAssetData(assetName, blockchain);

  if (asset?.result === null) {
    return (
      <Container>
        <PageHeader>Asset Not Found</PageHeader>
      </Container>
    );
  }

  const addresses = await listAddressesByAsset(asset.name, blockchain);
  return (
    <Container>
      <PageHeader>Asset: {asset.name ?? assetName.toUpperCase()}</PageHeader>
      <Content blockchain={blockchain} asset={asset} addresses={addresses} />
    </Container>
  );
}
