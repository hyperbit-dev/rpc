import Content from "./_components/Content";
import { config } from "~/_lib/config";
import { getBlockchainInfo } from "~/_api/client/blockchain";
import { redirect } from "next/navigation";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";

export default async function Page({
  params,
}: {
  params: { blockchain: string };
}) {
  const chain = config.chains[params.blockchain];
  if (!chain.features.masternodesEnabled) {
    return redirect("/explorer");
  }
  // const masternodes = await getMasternodes(params.blockchain);
  const masternodes = {};
  const blockchainInfo = await getBlockchainInfo(params.blockchain);

  if (!Object.keys(masternodes).length) {
    return (
      <Container>
        <PageHeader>Masternodes Not Found</PageHeader>
      </Container>
    );
  }

  return (
    <Content
      masternodes={masternodes}
      blockchainInfo={blockchainInfo}
      blockchain={params.blockchain}
    />
  );
}
