import { ExplorerAddressWrapper } from "./components/Wrapper";

export default async function ExplorerAddressContainer({
  params,
}: {
  params: Promise<{ address: string; blockchain: string }>;
}) {
  const address = (await params).address;
  const blockchain = (await params).blockchain;
  return <ExplorerAddressWrapper address={address} blockchain={blockchain} />;
}
