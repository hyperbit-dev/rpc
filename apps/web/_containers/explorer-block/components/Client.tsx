"use client";

import { useGetBlockHeightQuery, useGetBlockQuery } from "~/_api/client";
import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { Loading } from "./Loading";
import { BlockHeader } from "./BlockHeader";
import { BlockDetails } from "./BlockDetails";
import { BlockTransactions } from "./BlockTransactions";

export default function ExplorerBlockClient({
  blockhash,
  blockchain,
}: {
  blockhash: string;
  blockchain: string;
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
