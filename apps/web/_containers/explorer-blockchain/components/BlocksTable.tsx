import clsx from "clsx";
import { ClipboardButton } from "~/_components/ClipboardButton";
import { NextLink } from "~/_components/NextLink";
import { Header } from "./Header";
import { Cell } from "./Cell";
import Table from "@/_components/table/Table";

type BlocksTableProps = {
  blockchain: string;
  blocks: any[];
};

export function BlocksTable({ blockchain, blocks }: BlocksTableProps) {
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
    <div className="my-4 text-sm">
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
            {blocks.map((block: any) => {
              const movement = getMovement(block);
              const size = getSize(block);
              const hash = `${block.hash.slice(
                0,
                8,
              )}...${block.hash.slice(
                block.hash.length - 8,
                block.hash.length,
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
                    {Array.isArray(block.tx)
                      ? block.tx.length
                      : block.txs}
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
    </div>
  );
}
