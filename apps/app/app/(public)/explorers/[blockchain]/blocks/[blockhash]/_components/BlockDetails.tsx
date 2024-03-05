"use client";

import { Description } from "@/_components/Description";
import { DescriptionList } from "@/_components/DescriptionList";
import { useState } from "react";

export function BlockDetails({ block }: { block: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DescriptionList>
        <Description name="Hash" value={block.hash} />
        <Description name="Confirmations" value={block.confirmations} />
        <Description
          name="Timestamp"
          value={new Date(block.time * 1000).toLocaleString()}
        />
        <Description name="Height" value={block.height} />
        <Description name="Number of Transactions" value={block.tx.length} />
        <Description name="Difficulty" value={block.difficulty} />
        {open ? (
          <>
            <Description name="Merkle Root" value={block.merkleroot} />

            <Description name="Header Hash" value={block.headerhash} />

            <Description name="Chainwork" value={block.chainwork} />

            <Description name="Mix Hash" value={block.mixhash} />
            <Description name="Version" value={block.version} />

            <Description name="Version Hex" value={block.versionHex} />

            <Description name="Bits" value={block.bits} />

            <Description name="Weight" value={block.weight} />
            <Description name="Size" value={`${block.size} bytes`} />
            <Description
              name="Stripped Size"
              value={`${block.strippedsize} bytes`}
            />

            <Description name="Nonce" value={block.nonce} />
            <Description name="Nonce 64" value={block.nonce64} />
            {/* <Description
            name="Transaction Volume"
            value={totalValue}
            />*/}
          </>
        ) : undefined}
      </DescriptionList>
      <button
        type="button"
        className="w-full p-2 text-sm text-brand-500 hover:text-brand-600 focus:text-brand-600 active:text-brand-600"
        onClick={() => setOpen(!open)}
      >
        See {open ? "Less" : "More"}
      </button>
    </>
  );
}
