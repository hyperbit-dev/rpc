"use client";

import { useState } from "react";
import { Container } from "~/_components/Container";
import { NextLink } from "~/_components/NextLink";
import { useListAssetsQuery } from "@/_api/client/assets/list-assets";
import { Input } from "@hyperbit-private/react";
import Table from "@/_components/table/Table";
import useDebounce from "@/_lib/hooks/use-debounce";

const COUNT = 25;

export function Content({ blockchain }: { blockchain: string }) {
  const [start, setStart] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const listAssetsQuery = useListAssetsQuery({
    blockchain,
    name: debouncedSearch ? `${debouncedSearch.toUpperCase()}*` : '*',
    start: start.toString(),
    count: COUNT.toString(),
  });
  const assets = listAssetsQuery.data
    ? Object.values(listAssetsQuery.data)
    : [];

  function handlePrev() {
    if (start <= 0) return;
    setStart(start - 1 - COUNT);
  }

  function handleNext() {
    setStart(start + 1 + COUNT);
  }

  return (
    <Container className="flex flex-col flex-1 overflow-hidden">
      <h1 className="text-xl mb-4">Assets</h1>
      <div className="flex space-x-2 text-sm items-center justify-between mb-2">
        <div>
          <Input
            type="text"
            // @ts-ignore
            size="sm"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-1 flex items-center justify-end">
          <button
            type="button"
            disabled={start <= 0}
            className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
            onClick={() => handlePrev()}
          >
            &lt; Prev
          </button>
          <button
            type="button"
            className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
            onClick={() => handleNext()}
          >
            Next &gt;
          </button>
        </div>
      </div>
      <Table.Card>
        <Table>
          <Table.Head
            headers={[
              "Name",
              "Block Height",
              "Blockhash",
              "Ipfs",
              "Reissuable",
              "Units",
              "Amount",
            ]}
          />
          <Table.Body>
            {assets.map((asset: any) => {
              return (
                <Table.Row key={asset.name}>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/assets/${asset.name}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {asset.name}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>{asset.block_height}</Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/blocks/${asset.blockhash}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {asset.blockhash.slice(0, 4)}...
                      {asset.blockhash.slice(
                        asset.blockhash.length - 4,
                        asset.blockhash.length
                      )}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>{asset.has_ipfs === 1 ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell>
                    {asset.reissuable === 1 ? "Yes" : "No"}
                  </Table.Cell>
                  <Table.Cell>{asset.units}</Table.Cell>
                  <Table.Cell>{asset.amount}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Card>
      <div className="flex space-x-2 text-sm justify-end">
        <button
          type="button"
          disabled={start <= 0}
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handlePrev()}
        >
          &lt; Prev
        </button>
        <button
          type="button"
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handleNext()}
        >
          Next &gt;
        </button>
      </div>
    </Container>
  );
}
