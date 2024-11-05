"use client";

import { useGetBlocksQuery } from "~/_api/client";
import { Container } from "~/_components/Container";
import { Loading } from "./Loading";
import Table from "@/_components/table/Table";
import { NextLink } from "@/_components/NextLink";
import { ClipboardButton } from "@/_components/ClipboardButton";
import { useState } from "react";

const COUNT = 25;

export default function ExplorerBlocksClient({
  offset: initialOffset = "0",
  limit = "20",
  blockchain,
}: {
  offset: string;
  limit: string;
  blockchain: string;
}) {
  const [offset, setOffset] = useState(Number(initialOffset));
  const getBlocksQuery = useGetBlocksQuery({
    offset: offset.toString(),
    limit,
    blockchain,
  });
  const blocks = getBlocksQuery.data;
  if (getBlocksQuery.isLoading) {
    return <Loading />;
  }

  if (!blocks) {
    return null;
  }

  function handlePrev() {
    if (offset <= 0) return;
    setOffset(offset - 1);
  }

  function handleNext() {
    setOffset(offset + 1);
  }

  function getMovement(block: any): number {
    switch (blockchain) {
      case "tpgn":
      case "pgn":
        return block.subsidy + block.total_out;
      default:
        return block?.tx?.reduce?.((a: any, c: any) => {
          return (a += c.vout?.reduce?.((a: any, c: any) => (a += c.value), 0));
        }, 0);
    }
  }

  function getSize(block: any) {
    let size;
    switch (blockchain) {
      case "tpgn":
      case "pgn":
        size = block.total_size;
        break;
      default:
        size = block.size;
        break;
    }
    return Math.trunc(size * Math.pow(10, 3)) / Math.pow(10, 3);
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl">Blocks</h1>
        <div className="flex space-x-2 text-sm justify-end">
          <button
            type="button"
            disabled={offset <= 0}
            className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
            onClick={() => handlePrev()}
          >
            &lt; Prev
          </button>
          <button
            type="button"
            className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
            onClick={() => handleNext()}
          >
            Next &gt;
          </button>
        </div>
      </div>
      <Table.Card>
        <Table>
          <Table.Head
            headers={[
              "",
              "Height",
              "Hash",
              "Timestamp",
              "TXs",
              "Size (kB)",
              "Confirmations",
              "Movement",
            ]}
          />
          <Table.Body>
            {blocks?.map((block: any) => {
              const movement = getMovement(block);
              const size = getSize(block);
              const hash = `${block.hash.slice(0, 8)}...${block.hash.slice(
                block.hash.length - 8,
                block.hash.length
              )}`;

              return (
                <Table.Row key={block.hash}>
                  <Table.Cell>
                    <ClipboardButton value={block.hash} />
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/blocks/${block.hash}`}
                    >
                      {block.height}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/blocks/${block.hash}`}
                    >
                      {hash}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(block.time * 1000).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {Array.isArray(block.tx) ? block.tx.length : block.txs}
                  </Table.Cell>
                  <Table.Cell>{size}</Table.Cell>
                  <Table.Cell>{block.confirmations}</Table.Cell>
                  <Table.Cell>{movement}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Card>
      <div className="flex space-x-2 text-sm justify-end">
        <button
          type="button"
          disabled={offset <= 0}
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handlePrev()}
        >
          &lt; Prev
        </button>
        <button
          type="button"
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handleNext()}
        >
          Next &gt;
        </button>
      </div>
    </Container>
  );
}
