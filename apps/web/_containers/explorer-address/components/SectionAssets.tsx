import { ClipboardButton } from "@/_components/ClipboardButton";
import { NextLink } from "@/_components/NextLink";
import Table from "@/_components/table/Table";
import React from "react";

export function SectionAssets({
  blockchain,
  assetBalances,
}: {
  blockchain: string;
  assetBalances: any | any[];
}) {
  if (
    (!!assetBalances &&
      (!Object.keys(assetBalances).length || assetBalances.messages)) ||
    !assetBalances
  ) {
    return null;
  }

  return (
    <Table.Card>
      <Table>
        <Table.Head headers={["", "Name", "Amount"]} />
        <Table.Body>
          {Object.keys(assetBalances).map((key) => {
            const asset = assetBalances[key];
            return (
              <Table.Row key={key}>
                <Table.Cell style={{ width: "50px" }}>
                  <ClipboardButton value={key} />
                </Table.Cell>
                <Table.Cell>
                  <NextLink
                    className="text-cerulean-500 hover:text-cerulean-700"
                    href={`/explorers/${blockchain}/assets/${key}`}
                  >
                    {key}
                  </NextLink>
                </Table.Cell>
                <Table.Cell>{asset}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Table.Card>
  );
}
