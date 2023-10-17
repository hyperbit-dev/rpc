import clsx from "clsx";
import { ClipboardButton } from "../ClipboardButton";
import { NextLink } from "../NextLink";
import { Cell } from "../Cell";
import { Header } from "../Header";
import { SectionCard } from "../SectionCard";

type BlocksTableProps = {
  blockchain: string;
  blocks: any[];
};

export function BlocksTable({ blockchain, blocks }: BlocksTableProps) {
  function getMovement(blockStats: any) {
    switch (blockchain) {
      case "tpgn":
      case "pgn":
        return blockStats.subsidy + blockStats.total_out;
      default:
        return blockStats.tx.reduce((a, c) => {
          return (a += c.vout.reduce((a, c) => (a += c.value), 0));
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
    <SectionCard className="my-4 overflow-x-auto text-sm bg-white border border-gray-200 rounded-md">
      <div className="grid grid-cols-[50px_100px_minmax(200px,auto)_200px_minmax(75px,max-content)_100px_100px_minmax(200px,auto)]">
        <Header></Header>
        <Header>Height</Header>
        <Header>Hash</Header>
        <Header>Timestamp</Header>
        <Header>TXs</Header>
        <Header>Size (kB)</Header>
        <Header>Confirmations</Header>
        <Header className="text-right">Movement</Header>
      </div>
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
          <div
            key={blockHeader.hash}
            className={clsx(
              "grid grid-cols-[50px_100px_minmax(200px,auto)_200px_minmax(75px,max-content)_100px_100px_minmax(200px,auto)]",
              "group"
            )}
          >
            <Cell>
              <ClipboardButton value={blockHeader.hash} />
            </Cell>
            <Cell>
              <NextLink href={`/explorer/blocks/${blockHeader.hash}`}>
                {blockHeader.height}
              </NextLink>
            </Cell>
            <Cell>
              <NextLink href={`/explorer/blocks/${blockHeader.hash}`}>
                {hash}
              </NextLink>
            </Cell>
            <Cell>{new Date(blockHeader.time * 1000).toLocaleString()} </Cell>
            <Cell>
              {Array.isArray(blockStats.tx)
                ? blockStats.tx.length
                : blockStats.txs}
            </Cell>
            <Cell>{size}</Cell>
            <Cell>{blockHeader.confirmations}</Cell>
            <Cell className="text-right">{movement}</Cell>
          </div>
        );
      })}
    </SectionCard>
  );
}
