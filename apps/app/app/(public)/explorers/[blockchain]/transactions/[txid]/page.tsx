"use client";

import { Vin } from "./_components/Vin";
import { Vout } from "./_components/Vout";
import { config } from "~/_lib/config";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { SectionHeader } from "~/_components/SectionHeader";
import { useGetRawTransactionQuery } from "~/_api/client/transactions/get-raw-transaction";
import { useGetRawMempoolQuery } from "~/_api/client/mempool/get-raw-mempool";
import { ExplorerHeader } from "@/_components/ExplorerHeader";
import { Details } from "./_components/Details";
import Loading from "./loading";

export default function Page({
  params: { txid, blockchain },
}: {
  params: { txid: string; blockchain: string };
}) {
  const getRawTransactionQuery = useGetRawTransactionQuery({
    id: txid,
    blockchain,
  });
  const getRawMempoolQuery = useGetRawMempoolQuery({
    blockchain,
  });

  const transaction = getRawTransactionQuery.data;
  const mempool = getRawMempoolQuery.data;

  const inMempool =
    !!(mempool as string[])?.find?.((x) => x === transaction?.txid) ?? false;

  if (getRawTransactionQuery.isLoading || getRawMempoolQuery.isLoading) {
    return <Loading />;
  }

  if (
    (transaction as any)?.message ||
    !transaction ||
    !Object.keys(transaction as any)
  ) {
    return (
      <Container>
        <PageHeader>Transaction Not Found</PageHeader>
      </Container>
    );
  }

  const chain = config.chains[blockchain];

  return (
    <Container>
      <ExplorerHeader title="Transaction" />
      <Details
        blockchain={blockchain}
        transaction={transaction}
        inMempool={inMempool}
        coinbase={chain?.coinbase}
      />
      <section className="my-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <SectionHeader>Inputs</SectionHeader>
            <Vin
              vin={transaction.vin}
              coinbase={chain?.coinbase}
              blockchain={blockchain}
            />
          </div>
          <div className="flex-1">
            <SectionHeader>Outputs</SectionHeader>
            <Vout vout={transaction.vout} blockchain={blockchain} />
          </div>
        </div>
      </section>
    </Container>
  );
}
