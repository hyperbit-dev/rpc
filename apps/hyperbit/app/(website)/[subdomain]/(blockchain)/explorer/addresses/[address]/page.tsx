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
  params: { address, subdomain },
}: {
  params: { address: string; subdomain: string };
}) {
  const chain = config.chains[subdomain];
  const balances = await getAddressBalance(address, subdomain);

  if (balances?.message) {
    return (
      <Container>
        <PageHeader>{balances.message}</PageHeader>
      </Container>
    );
  }
  const marketLatest = await getMarketLatest(subdomain);
  const assets = chain.features.assetsEnabled
    ? await listAssetBalancesByAddress(address, subdomain)
    : [];
  const addressTxIds = await getAddressTxIds(address, subdomain);
  const addressUtxos = await getAddressUtxos(address, subdomain);
  const addressBalance = Array.isArray(balances)
    ? balances?.find?.((x) => x.assetName === subdomain.toUpperCase())
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
        subdomain={subdomain}
      />
    </Container>
  );
}
