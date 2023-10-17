import { Container, PageHeader } from "@/components";
import { getMasternodes } from "@/lib/api/masternodes";
import Content from "./components/Content";
import { config } from "@/lib/config";
import { getBlockchainInfo } from "@/lib/api/blockchain";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { blockchain: string };
}) {
  const chain = config.chains[params.blockchain];
  if (!chain.features.masternodesEnabled) {
    return redirect("/explorer");
  }
  const masternodes = await getMasternodes(params.blockchain);
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
