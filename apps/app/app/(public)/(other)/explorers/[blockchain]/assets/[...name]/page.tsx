import { getAssetData, listAddressesByAsset } from "~/_api/client/assets";
import { Content } from "./_components/Content";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";

export default async function Page({
  params,
}: {
  params: { name: string | string[]; blockchain: string };
}) {
  const assetName = Array.isArray(params.name)
    ? params.name.join("-")
    : params.name;
  const asset = await getAssetData(assetName, params.blockchain);

  if (asset?.result === null) {
    return (
      <Container>
        <PageHeader>Asset Not Found</PageHeader>
      </Container>
    );
  }

  const addresses = await listAddressesByAsset(asset.name, params.blockchain);
  return (
    <Container>
      <PageHeader>Asset: {asset.name ?? assetName.toUpperCase()}</PageHeader>
      <Content
        blockchain={params.blockchain}
        asset={asset}
        addresses={addresses}
      />
    </Container>
  );
}
