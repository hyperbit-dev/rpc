"use client";
import { useState } from "react";
import { Header } from "../../../_components/Header";
import { Cell } from "../../../_components/Cell";
import { ClipboardButton } from "@/_components/ClipboardButton";
import { NextLink } from "@/_components/NextLink";
import Table from "@/_components/table/Table";

const MAX_COUNT = 100;

export function SectionTxids({
  blockchain,
  addressTxids,
}: {
  blockchain: string;
  addressTxids: any[];
}) {
  const [query, setQuery] = useState("");

  if (!addressTxids?.length) {
    return null;
  }

  const txids =
    addressTxids
      .filter((x) => x.toLowerCase().includes(query.toLocaleLowerCase()))
      .slice(0, MAX_COUNT) ?? addressTxids;

  return (
    <>
      <div className="mb-4 text-sm">
        Total: {addressTxids.length} (Showing{" "}
        {addressTxids.length < MAX_COUNT ? addressTxids.length : MAX_COUNT})
      </div>
      <input
        type="text"
        name="query"
        placeholder="Search by id..."
        className="w-full p-3 mb-4 text-sm bg-white border border-gray-200 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mb-4 overflow-x-auto">
        <Table.Card>
          <Table>
            <Table.Head headers={["", "Transaction ID"]} />
            <Table.Body>
              {txids.map((txid, index) => (
                <Table.Row key={`${txid}-${index}`}>
                  <Table.Cell>
                    <ClipboardButton value={txid} />
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      className="text-cerulean-500 hover:text-cerulean-700"
                      href={`/explorers/${blockchain}/transactions/${txid}`}
                    >
                      {txid}
                    </NextLink>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Card>
      </div>
    </>
  );
}
