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
  function getMovement(blockStats: any): number {
    switch (blockchain) {
      case "tpgn":
      case "pgn":
        return blockStats.subsidy + blockStats.total_out;
      default:
        return blockStats?.tx?.reduce?.((a: any, c: any) => {
          return (a += c.vout?.reduce?.((a: any, c: any) => (a += c.value), 0));
        }, 0);
    }
  }

  function getSize(blockStats: any) {
    let size;
    switch (blockchain) {
      case "tpgn":
      case "pgn":
        size = blockStats.total_size;
        break;
      default:
        size = blockStats.size;
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
            {blocks.map(({ blockHeader, blockStats }) => {
              const movement = getMovement(blockStats);
              const size = getSize(blockStats);
              const hash = `${blockHeader.hash.slice(
                0,
                8
              )}...${blockHeader.hash.slice(
                blockHeader.hash.length - 8,
                blockHeader.hash.length
              )}`;

              return (
                <Table.Row key={blockHeader.hash}>
                  <Table.Cell>
                    <ClipboardButton value={blockHeader.hash} />
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/blocks/${blockHeader.hash}`}
                    >
                      {blockHeader.height}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/blocks/${blockHeader.hash}`}
                    >
                      {hash}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(blockHeader.time * 1000).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    {Array.isArray(blockStats.tx)
                      ? blockStats.tx.length
                      : blockStats.txs}
                  </Table.Cell>
                  <Table.Cell>{size}</Table.Cell>
                  <Table.Cell>{blockHeader.confirmations}</Table.Cell>
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
