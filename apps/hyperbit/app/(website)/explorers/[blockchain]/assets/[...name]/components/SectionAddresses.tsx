"use client";

import { ClipboardButton, NextLink, SectionHeader } from "@/components";
import { SectionCard } from "@/components/SectionCard";
import { useState } from "react";

export function SectionAddresses({
  blockchain,
  addresses,
}: {
  blockchain: string;
  addresses: Record<string, number>;
}) {
  const [query, setQuery] = useState("");
  const filteredAddresses = Object.keys(addresses)
    .filter((key) => key.includes(query))
    .map((key) => ({
      address: key,
      amount: addresses[key],
    }));

  return (
    <>
      <SectionHeader>
        <div className="flex items-center justify-between">
          Addresses
          <span className="text-sm">
            Total: {Object.keys(addresses).length}
          </span>
        </div>
      </SectionHeader>
      <input
        type="text"
        name="query"
        placeholder="Search by address..."
        className="w-full p-3 mb-4 text-sm bg-white border border-gray-200 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="px-2 pb-2 grid gap-4 grid-cols-[50px_minmax(175px,auto)_175px] text-sm">
        <div></div>
        <div>Address</div>
        <div className="text-right">Amount</div>
      </div>
      <SectionCard>
        {filteredAddresses.map((address) => (
          <div
            key={address.address}
            className="py-3 grid gap-4 grid-cols-[50px_minmax(175px,auto)_175px]"
          >
            <div>
              <ClipboardButton value={address.address} />
            </div>
            <div>
              <NextLink
                href={`/explorers/${blockchain}/addresses/${address.address}`}
              >
                {address.address}
              </NextLink>
            </div>
            <div className="text-right">{address.amount}</div>
          </div>
        ))}
      </SectionCard>
    </>
  );
}
