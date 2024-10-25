"use client";

import { config } from "~/_lib/config";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import {
  useGetAddressBalanceQuery,
  useGetAddressAssetBalancesQuery,
  useGetAddressTxidsQuery,
  useGetAddressUtxosQuery,
  useGetLatestMarketQuery,
} from "~/_api/client";
import { Content } from "./Content";

export function ExplorerAddressWrapper(params: {
  address: string;
  blockchain: string;
}) {
  const { address, blockchain } = params;
  const chain = config.chains[blockchain];

  const getAddressBalanceQuery = useGetAddressBalanceQuery({
    address,
    blockchain,
  });

  const getAddressAssetBalancesQuery = useGetAddressAssetBalancesQuery({
    address,
    blockchain,
  });

  const getAddressTxidsQuery = useGetAddressTxidsQuery({
    address,
    blockchain,
  });

  const getAddressUtxosQuery = useGetAddressUtxosQuery({
    address,
    blockchain,
  });

  const getLatestMarketQuery = useGetLatestMarketQuery({
    blockchain,
  });

  const balances = getAddressBalanceQuery.data;
  const assetBalances = getAddressAssetBalancesQuery.data;
  const addressTxids = getAddressTxidsQuery.data;
  const addressUtxos = getAddressUtxosQuery.data;
  const marketLatest = getLatestMarketQuery.data;

  // @ts-ignore
  if (balances?.message) {
    return (
      <Container>
        {/* @ts-ignore */}
        <PageHeader>{balances.message}</PageHeader>
      </Container>
    );
  }

  const addressBalance = Array.isArray(balances)
    ? balances?.find?.((x) => x.assetName === blockchain.toUpperCase())
    : balances;

  return (
    <Container>
      <PageHeader>Address</PageHeader>
      <Content
        address={address}
        marketLatest={marketLatest}
        assetBalances={assetBalances}
        assetsEnabled={chain?.features?.assetsEnabled}
        addressBalance={addressBalance}
        balances={balances}
        addressTxids={addressTxids}
        addressUtxos={addressUtxos}
        blockchain={blockchain}
      />
    </Container>
  );
}
