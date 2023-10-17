import { Container, PageHeader } from "@/components";
import {
  getAddressBalance,
  getAddressTxIds,
  getAddressUtxos,
  listAssetBalancesByAddress,
} from "@/lib/api/addresses";
import { Content } from "./components/Content";
import { config } from "@/lib/config";
import { getMarketLatest } from "@/lib/api/market";

export default async function Page({
  params: { address, blockchain },
}: {
  params: { address: string; blockchain: string };
}) {
  const chain = config.chains[blockchain];
  const balances = await getAddressBalance(address, blockchain);

  if (balances?.message) {
    return (
      <Container>
        <PageHeader>{balances.message}</PageHeader>
      </Container>
    );
  }
  const marketLatest = await getMarketLatest(blockchain);
  const assets = chain.features.assetsEnabled
    ? await listAssetBalancesByAddress(address, blockchain)
    : [];
  const addressTxIds = await getAddressTxIds(address, blockchain);
  const addressUtxos = await getAddressUtxos(address, blockchain);
  const addressBalance = Array.isArray(balances)
    ? balances?.find?.((x) => x.assetName === blockchain.toUpperCase())
    : balances;

  return (
    <Container>
      <PageHeader>Address</PageHeader>
      <Content
        address={address}
        marketLatest={marketLatest}
        assets={assets}
        assetsEnabled={chain.features.assetsEnabled}
        addressBalance={addressBalance}
        balances={balances}
        addressTxIds={addressTxIds}
        addressUtxos={addressUtxos}
        blockchain={blockchain}
      />
    </Container>
  );
}
