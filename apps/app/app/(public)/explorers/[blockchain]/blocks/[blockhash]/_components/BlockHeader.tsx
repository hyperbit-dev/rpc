import { NextLink } from "~/_components/NextLink";
import { ApiBlock } from "@/app/(server)/api/v1/explorer/blocks";
import { ExplorerHeader } from "@/_components/ExplorerHeader";

type BlockHeaderProps = {
  block: ApiBlock;
  blockchain: string;
};

export function BlockHeader({ block, blockchain }: BlockHeaderProps) {
  return (
    <ExplorerHeader
      title={`Block: #${block.height}`}
      actions={
        <>
          {block.previousblockhash && (
            <NextLink
              href={`/explorers/${blockchain}/blocks/${block.height - 1}`}
              className="inline-block p-1"
            >
              <span className="text-lg text-cerulean-500">‹</span> Previous
            </NextLink>
          )}
          {block.nextblockhash && (
            <NextLink
              href={`/explorers/${blockchain}/blocks/${block.height + 1}`}
              className="inline-block p-1"
            >
              Next <span className="text-lg text-cerulean-500">›</span>
            </NextLink>
          )}
        </>
      }
    />
  );
}
