import { Cell, NextLink, SectionCard } from "@/components";
import { Header } from "@/components/Header";
import React from "react";

export function Vout({ vout }: { vout: any }) {
  return (
    <SectionCard>
      <div className="grid grid-cols-[66%_34%]">
        <Header>Address</Header>
        <Header className="text-right">Amount</Header>
      </div>
      {vout
        .sort((a, b) => (a.address > b.address ? 1 : -1))
        .map((vout, index) => (
          <div key={index} className="grid grid-cols-[66%_34%]">
            {vout.scriptPubKey.asset ? (
              <>
                <Cell>{vout.scriptPubKey.addresses[0]}</Cell>
                <Cell>
                  <NextLink
                    className="text-brand-500 hover:text-brand-600"
                    href={`/explorer/assets/${vout.scriptPubKey.asset.name}`}
                  >
                    {vout.scriptPubKey.asset.name}
                  </NextLink>
                </Cell>
                <Cell className="text-right">
                  {vout.scriptPubKey.asset.amount}
                </Cell>
              </>
            ) : vout.scriptPubKey.type === "nulldata" ? (
              <>
                <Cell>nulldata</Cell>
                <Cell className="text-right">0</Cell>
              </>
            ) : (
              <>
                {vout.scriptPubKey.addresses.map((address) => (
                  <>
                    <Cell>
                      <NextLink
                        className="text-brand-500 hover:text-brand-600"
                        href={`/explorer/addresses/${address}`}
                      >
                        {address}
                      </NextLink>
                    </Cell>
                    <Cell className="text-right">{vout.value}</Cell>
                  </>
                ))}
              </>
            )}
          </div>
        ))}
    </SectionCard>
  );
}
