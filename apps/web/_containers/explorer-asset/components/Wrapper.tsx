"use client";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { useGetAssetQuery } from "@/_api/client/assets/get-asset";
import { useGetAssetAddressesQuery } from "@/_api/client/assets/get-asset-addresses";
import { Content } from "./Content";

export function Wrapper({
  assetName,
  blockchain,
}: {
  assetName: string;
  blockchain: string;
}) {
  const assetQuery = useGetAssetQuery({ asset: assetName, blockchain });
  const asset = assetQuery.data;
  const getAssetAddressesQuery = useGetAssetAddressesQuery({
    asset: assetName,
    blockchain,
  });
  const addresses = getAssetAddressesQuery.data;

  const isLoading = assetQuery.isLoading || getAssetAddressesQuery.isLoading;

  if (isLoading) {
    return null;
  }

  if (asset?.result === null) {
    return (
      <Container>
        <PageHeader>Asset Not Found</PageHeader>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader>Asset: {asset?.name ?? assetName.toUpperCase()}</PageHeader>
      <Content blockchain={blockchain} asset={asset} addresses={addresses} />
    </Container>
  );
}
