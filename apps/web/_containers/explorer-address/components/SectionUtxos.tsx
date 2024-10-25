"use client";

import { ClipboardButton } from "@/_components/ClipboardButton";
import { NextLink } from "@/_components/NextLink";
import Table from "@/_components/table/Table";
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

  if (!addressUtxos?.length) {
    return null;
  }

  const transactions =
    addressUtxos
      .filter(
        (x) =>
          x.txid.toString().toLowerCase().includes(query.toLocaleLowerCase()) ||
          x.height.toString().toLowerCase().includes(query.toLocaleLowerCase()),
      )
      .slice(0, MAX_COUNT) ?? addressUtxos;

  return (
    <>
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
      <Table.Card>
        <Table>
          <Table.Head headers={["", "Transaction ID", "Height", "Amount"]} />
          <Table.Body>
            {transactions.map((tx) => (
              <Table.Row key={tx.txid}>
                <Table.Cell>
                  <ClipboardButton value={tx.txid} />
                </Table.Cell>
                <Table.Cell>
                  <NextLink
                    className="text-cerulean-500 hover:text-cerulean-700"
                    href={`/explorers/${blockchain}/transactions/${tx.txid}`}
                  >
                    {tx.txid}
                  </NextLink>
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <NextLink
                    className="text-cerulean-500 hover:text-cerulean-700"
                    href={`/explorers/${blockchain}/blocks/${tx.height}`}
                  >
                    {tx.height}
                  </NextLink>
                </Table.Cell>
                <Table.Cell>{(tx.satoshis / 1e8).toFixed(8)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Card>
    </>
  );
}
