"use client";

import { ClipboardButton, NextLink, NoDataAvailable } from "@/components";
import { useState } from "react";

const MAX_COUNT = 100;

export function SectionUtxos({
  blockchain,
  addressUtxos,
}: {
  blockchain: string;
  addressUtxos: any[];
}) {
  const [query, setQuery] = useState("");

  if (!addressUtxos.length) {
    return <NoDataAvailable />;
  }

  const transactions =
    addressUtxos
      .filter(
        (x) =>
          x.txid.toString().toLowerCase().includes(query.toLocaleLowerCase()) ||
          x.height.toString().toLowerCase().includes(query.toLocaleLowerCase())
      )
      .slice(0, MAX_COUNT) ?? addressUtxos;

  return (
    <>
      <hr className="my-4" />
      <div className="mb-4 text-sm">
        Total: {addressUtxos.length} (Showing{" "}
        {addressUtxos.length < MAX_COUNT ? addressUtxos.length : MAX_COUNT})
      </div>
      <input
        type="text"
        name="query"
        placeholder="Search by id or height..."
        className="w-full p-3 mb-4 text-sm bg-white border border-gray-200 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="px-2 pb-2 grid gap-4 grid-cols-[50px_minmax(175px,auto)_125px_175px] text-sm">
        <div></div>
        <div>Transaction ID</div>
        <div>Height</div>
        <div className="text-right">Amount</div>
      </div>
      <section className="p-2 mb-4 text-sm bg-white border border-gray-200 rounded-md">
        {transactions.map((transaction) => (
          <div
            key={transaction.txid}
            className="py-3 grid gap-4 grid-cols-[50px_minmax(175px,auto)_125px_175px]"
          >
            <div>
              <ClipboardButton value={transaction.txid} />
            </div>
            <div>
              <NextLink
                className="text-cerulean-500 hover:text-cerulean-700"
                href={`/explorers/${blockchain}/transactions/${transaction.txid}`}
              >
                {transaction.txid}
              </NextLink>
            </div>
            <div>
              <NextLink
                className="text-cerulean-500 hover:text-cerulean-700"
                href={`/explorers/${blockchain}/blocks/${transaction.height}`}
              >
                {transaction.height}
              </NextLink>
            </div>
            <div className="text-right">
              {(transaction.satoshis / 1e8).toFixed(8)}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
