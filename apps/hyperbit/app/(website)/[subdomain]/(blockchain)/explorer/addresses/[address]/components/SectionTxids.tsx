"use client";

import {
  Cell,
  ClipboardButton,
  NextLink,
  NoDataAvailable,
  SectionCard,
} from "@/components";
import { Header } from "@/components/Header";
import { useState } from "react";

const MAX_COUNT = 100;

export function SectionTxids({ addressTxIds }: { addressTxIds: any[] }) {
  const [query, setQuery] = useState("");

  if (!addressTxIds.length) {
    return <NoDataAvailable />;
  }

  const txids =
    addressTxIds
      .filter((x) => x.toLowerCase().includes(query.toLocaleLowerCase()))
      .slice(0, MAX_COUNT) ?? addressTxIds;

  return (
    <>
      <hr className="my-4" />
      <div className="mb-4 text-sm">
        Total: {addressTxIds.length} (Showing{" "}
        {addressTxIds.length < MAX_COUNT ? addressTxIds.length : MAX_COUNT})
      </div>
      <input
        type="text"
        name="query"
        placeholder="Search by id..."
        className="w-full p-3 mb-4 text-sm bg-white border border-gray-200 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SectionCard className="mb-4 overflow-x-auto">
        <div className="grid gap-4 grid-cols-[50px_minmax(175px,auto)]">
          <Header></Header>
          <Header>Transaction ID</Header>
        </div>
        {txids.map((txid) => (
          <div
            key={txid}
            className="grid gap-4 grid-cols-[50px_minmax(175px,auto)]"
          >
            <Cell>
              <ClipboardButton value={txid} />
            </Cell>
            <Cell>
              <NextLink
                className="text-cerulean-500 hover:text-cerulean-700"
                href={`/explorer/transactions/${txid}`}
              >
                {txid}
              </NextLink>
            </Cell>
          </div>
        ))}
      </SectionCard>
    </>
  );
}
