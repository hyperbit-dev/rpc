"use client";

// import { listAssets } from "~/_api/client/assets";
import { useCallback, useMemo, useState } from "react";
import { assetSearch } from "../actions";
import { Container } from "~/_components/Container";
import { Header } from "./Header";
import { Cell } from "./Cell";
import { NextLink } from "~/_components/NextLink";

export function Content({
  blockchain,
  assets: initialAssets = {},
}: {
  blockchain: string;
  assets: Record<string, any>;
}) {
  const [assets, setAssets] = useState<any[]>(
    Object.values(initialAssets).slice(0, 25)
  );

  const [filters, setFilters] = useState({
    count: 25,
    start: 0,
  });

  const getAssets = useCallback(
    (filters: Record<string, number>) => {
      assetSearch({
        blockchain,
        count: filters.count,
        start: filters.start,
        verbose: true,
      }).then((assets) => {
        setAssets(Object.values(assets));
      });
    },
    [blockchain]
  );

  const meta = useMemo(() => {
    const assets = Object.values(initialAssets);
    const count = Math.ceil(assets.length / filters.count);
    return {
      total: assets.length,
      count,
      pages: Array.from({ length: count }, (_, i) => i + 1),
    };
  }, [initialAssets, filters.count]);

  function handlePrev() {
    const f = {
      ...filters,
      start:
        filters.start - filters.count < 0 ? 0 : filters.start - filters.count,
    };
    setFilters(f);
    getAssets(f);
  }

  function handleNext() {
    const f = {
      ...filters,
      start:
        filters.start + filters.count > meta.total
          ? meta.total
          : filters.start + filters.count,
    };
    setFilters(f);
    getAssets(f);
  }

  function handlePage(value: string) {
    const f = {
      ...filters,
      start: filters.count * (Number(value) - 1),
    };
    setFilters(f);
    getAssets(f);
  }

  return (
    <Container className="flex flex-col flex-1 mb-4 -mt-4 overflow-hidden">
      <div>Assets</div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex flex-col flex-1 overflow-auto">
            <div className="grid grid-cols-[75px_minmax(150px,auto)_150px_150px_75px_100px_150px_150px]">
              <Header>#</Header>
              <Header>Name</Header>
              <Header>Block Height</Header>
              <Header>Blockhash</Header>
              <Header>Ipfs</Header>
              <Header>Reissuable</Header>
              <Header>Units</Header>
              <Header>Amount</Header>
            </div>
            {assets.map((asset, i) => {
              return (
                <div
                  key={asset.name}
                  className="grid grid-cols-[75px_minmax(150px,auto)_150px_150px_75px_100px_150px_150px] group"
                >
                  <Cell>{filters.start + i + 1}</Cell>
                  <Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/assets/${asset.name}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {asset.name}
                    </NextLink>
                  </Cell>
                  <Cell>{asset.block_height}</Cell>
                  <Cell>
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
                  </Cell>
                  <Cell>{asset.has_ipfs === 1 ? "Yes" : "No"}</Cell>
                  <Cell>{asset.reissuable === 1 ? "Yes" : "No"}</Cell>
                  <Cell>{asset.units}</Cell>
                  <Cell>{asset.amount}</Cell>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between px-4 pt-3 pb-1 -mx-2 border-t border-gray-200">
            Total: {meta.total}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                Page:
                <select
                  name="page"
                  className="py-1 pl-2 pr-5 border border-gray-300 rounded"
                  value={filters.start / filters.count + 1}
                  onChange={(e) => handlePage(e.target.value)}
                >
                  {meta.pages.map((page) => (
                    <option key={page} value={page}>
                      {page}
                    </option>
                  ))}
                </select>
              </div>{" "}
              |
              <button
                type="button"
                disabled={filters.start <= 0}
                className="disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handlePrev()}
              >
                &lt; Prev
              </button>
              <button
                type="button"
                disabled={filters.start >= meta.total}
                className="disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => handleNext()}
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
