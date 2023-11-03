import { Container, PageHeader, SectionHeader } from "@/components";
import { getRawTransaction } from "@/lib/api/transactions";
import { Content } from "./_components/Content";
import { Vin } from "./_components/Vin";
import { Vout } from "./_components/Vout";
import { getRawMempool } from "@/lib/api/mempool";
import { config } from "@/lib/config";

export default async function Page({
  params,
}: {
  params: { txid: string; blockchain: string };
}) {
  const transaction = await getRawTransaction(params.txid, params.blockchain);
  const mempool = await getRawMempool(params.blockchain);

  const inMempool =
    (mempool as string[])?.find?.((x) => x === transaction?.txid) ?? false;

  if (transaction?.message || !Object.keys(transaction)) {
    return (
      <Container>
        <PageHeader>Transaction Not Found</PageHeader>
      </Container>
    );
  }

  const chain = config.chains[params.blockchain];

  return (
    <Container>
      <section className="flex items-center justify-between mt-8 mb-4">
        <h1 className="m-0 text-xl font-normal">Transaction</h1>
      </section>
      <Content
        blockchain={params.blockchain}
        transaction={transaction}
        inMempool={inMempool}
        coinbase={chain.coinbase}
      />
      <section className="my-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <SectionHeader>Inputs</SectionHeader>
            <Vin
              vin={transaction.vin}
              coinbase={chain.coinbase}
              blockchain={params.blockchain}
            />
          </div>
          <div className="flex-1">
            <SectionHeader>Outputs</SectionHeader>
            <Vout vout={transaction.vout} blockchain={params.blockchain} />
          </div>
        </div>
      </section>
    </Container>
  );
}
