"use client";

import { ClipboardButton } from "@/_components/ClipboardButton";
import { NextLink } from "@/_components/NextLink";
import { SectionHeader } from "@/_components/SectionHeader";
import Table from "@/_components/table/Table";
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
      <Table.Card>
        <Table>
          <Table.Head headers={["", "Address", "Amount"]} />
          <Table.Body>
            {filteredAddresses.map((address) => {
              return (
                <Table.Row key={address.address}>
                  <Table.Cell>
                    <ClipboardButton value={address.address} />
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/addresses/${address.address}`}
                    >
                      {address.address}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>{address.amount}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Card>
    </>
  );
}
