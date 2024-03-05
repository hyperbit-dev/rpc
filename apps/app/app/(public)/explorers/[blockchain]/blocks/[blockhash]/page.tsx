"use client";

import { useGetBlockHeightQuery, useGetBlockQuery } from "~/_api/client";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { BlockDetails, BlockHeader, BlockTransactions } from "./_components";
import Loading from "./loading";

export default function Page({
  params: { blockhash, blockchain },
}: {
  params: { blockhash: string; blockchain: string };
}) {
  const getBlockHeightQuery = useGetBlockHeightQuery({
    height: blockhash,
    blockchain,
  });

  blockhash =
    typeof getBlockHeightQuery.data === "string"
      ? getBlockHeightQuery.data
      : blockhash;

  const getBlockQuery = useGetBlockQuery({
    blockhash,
    blockchain,
    enabled: getBlockHeightQuery.isSuccess,
  });

  const block = getBlockQuery.data;

  if (getBlockHeightQuery.isLoading || getBlockQuery.isLoading) {
    return <Loading />;
  }

  if (!block) {
    return null;
  }

  if ((block as any)?.message) {
    return (
      <Container>
        <PageHeader>{(block as any).message}</PageHeader>
      </Container>
    );
  }

  return (
    <Container>
      <BlockHeader block={block} blockchain={blockchain} />
      <BlockDetails block={block} />
      <BlockTransactions block={block} blockchain={blockchain} />
    </Container>
  );
}
