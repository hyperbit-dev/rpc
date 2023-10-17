"use client";

import { SectionCard } from "@/components";
import { useState } from "react";

export function BlockDetails({ block }: { block: any }) {
  const [open, setOpen] = useState(false);

  return (
    <SectionCard>
      <dl className="grid sm:grid-cols-[25%_auto] sm:divide-y overflow-x-auto text-sm">
        <dt className="p-2">Hash</dt>
        <dd className="p-2 border-b border-t-transparent sm:text-right sm:border-b-transparent">
          {block.hash}
        </dd>
        <dt className="p-2">Confirmations</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {block.confirmations}
        </dd>
        <dt className="p-2">Timestamp</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {new Date(block.time * 1000).toLocaleString()}{" "}
        </dd>
        <dt className="p-2">Height</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {block.height}
        </dd>
        <dt className="p-2">Number of Transactions</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {block.tx.length}
        </dd>
        <dt className="p-2">Difficulty</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {block.difficulty}
        </dd>
        {open ? (
          <>
            <dt className="p-2">Merkle Root</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.merkleroot}
            </dd>
            <dt className="p-2">Header Hash</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.headerhash}
            </dd>
            <dt className="p-2">Chainwork</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.chainwork}
            </dd>
            <dt className="p-2">Mix Hash</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.mixhash}
            </dd>
            <dt className="p-2">Version</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.version}
            </dd>
            <dt className="p-2">Version Hex</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.versionHex}
            </dd>
            <dt className="p-2">Bits</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.bits}
            </dd>
            <dt className="p-2">Weight</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.weight}
            </dd>
            <dt className="p-2">Size</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.size} bytes
            </dd>
            <dt className="p-2">Stripped Size</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.strippedsize} bytes
            </dd>
            <dt className="p-2">Nonce</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.nonce}
            </dd>
            <dt className="p-2">Nonce 64</dt>
            <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
              {block.nonce64}
            </dd>
            {/* <dt className="p-2">Transaction Volume</dt>
            <dd className="p-2">{totalValue}</dd> */}
          </>
        ) : undefined}
      </dl>
      <button
        type="button"
        className="w-full p-2 text-sm text-brand-500 hover:text-brand-600 focus:text-brand-600 active:text-brand-600"
        onClick={() => setOpen(!open)}
      >
        See {open ? "Less" : "More"}
      </button>
    </SectionCard>
  );
}
