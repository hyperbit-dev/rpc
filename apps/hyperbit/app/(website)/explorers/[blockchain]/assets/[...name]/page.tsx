import { Container, PageHeader } from "@/components";
import { SectionCard } from "@/components/SectionCard";
import { getAssetData, listAddressesByAsset } from "@/lib/api/assets";
import { SectionAddresses } from "./_components/SectionAddresses";
import { Content } from "./_components/Content";

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
      <Content asset={asset} addresses={addresses} />
    </Container>
  );
}
