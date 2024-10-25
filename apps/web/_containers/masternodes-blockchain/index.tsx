import { config } from "~/_lib/config";
import { getBlockchainInfo } from "~/_api/client/blockchain";
import { redirect } from "next/navigation";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import Content from "./components/Content";

export async function MasternodesBlockchainContainer({
  params,
}: {
  params: Promise<{ blockchain: string }>;
}) {
  const blockchain = (await params).blockchain;
  const chain = config.chains[blockchain];
  if (!chain.features.masternodesEnabled) {
    return redirect("/explorer");
  }
  // const masternodes = await getMasternodes(blockchain);
  const masternodes = {};
  const blockchainInfo = await getBlockchainInfo(blockchain);

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
      blockchain={blockchain}
    />
  );
}
