import { Cell, NextLink, SectionCard } from "@/components";
import { Header } from "@/components/Header";
import React from "react";

export function Vin({ vin, coinbase }: { vin: any; coinbase: number }) {
  const vins = vin.reduce((a, c) => {
    const i = a.findIndex((x) => x.address === c.address);
    if (i > -1) {
      a[i].value += c.value;
    } else {
      a.push({ ...c, address: c.address, value: c.coinbase ? 5000 : c.value });
    }
    return a;
  }, []);

  return (
    <SectionCard>
      <div className="grid grid-cols-[66%_34%]">
        <Header>Address</Header>
        <Header className="text-right">Amount</Header>
      </div>
      {vins.map((vin, index) => (
        <div
          key={`${index}-${vin.address}-${vin.amount}`}
          className="grid grid-cols-[66%_34%]"
        >
          {vin.coinbase ? (
            <>
              <Cell>Coinbase</Cell>
              <Cell className="text-right">{coinbase}</Cell>
            </>
          ) : (
            <>
              <Cell>
                <NextLink href={`/explorer/addresses/${vin.address}`}>
                  {vin.address}
                </NextLink>
              </Cell>
              <Cell className="text-right">{vin.value}</Cell>
            </>
          )}
        </div>
      ))}
    </SectionCard>
  );
}
