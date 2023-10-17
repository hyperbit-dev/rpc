import { Container, PageHeader, SectionHeader } from "@/components";
import { getRawTransaction } from "@/lib/api/transactions";
import { Content } from "./components/Content";
import { Vin } from "./components/Vin";
import { Vout } from "./components/Vout";
import { getRawMempool } from "@/lib/api/mempool";
import { config } from "@/lib/config";

export default async function Page({
  params,
}: {
  params: { txid: string; subdomain: string };
}) {
  const transaction = await getRawTransaction(params.txid, params.subdomain);
  const mempool = await getRawMempool(params.subdomain);

  const inMempool =
    (mempool as string[])?.find?.((x) => x === transaction?.txid) ?? false;

  if (transaction?.message || !Object.keys(transaction)) {
    return (
      <Container>
        <PageHeader>Transaction Not Found</PageHeader>
      </Container>
    );
  }

  const chain = config.chains[params.subdomain];

  return (
    <Container>
      <section className="flex items-center justify-between mt-8 mb-4">
        <h1 className="m-0 text-xl font-normal">Transaction</h1>
      </section>
      <Content
        transaction={transaction}
        inMempool={inMempool}
        coinbase={chain.coinbase}
      />
      <section className="my-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <SectionHeader>Inputs</SectionHeader>
            <Vin vin={transaction.vin} coinbase={chain.coinbase} />
          </div>
          <div className="flex-1">
            <SectionHeader>Outputs</SectionHeader>
            <Vout vout={transaction.vout} />
          </div>
        </div>
      </section>
    </Container>
  );
}
