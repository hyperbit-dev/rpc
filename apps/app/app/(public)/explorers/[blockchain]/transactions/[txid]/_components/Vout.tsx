import React from "react";
import { NextLink } from "~/_components/NextLink";
import Table from "@/_components/table/Table";
import { ApiVout } from "@/app/(server)/api/v1/explorer/transactions/[id]/types";

export function Vout({
  blockchain,
  vout,
}: {
  blockchain: string;
  vout: ApiVout[];
}) {
  if (!vout.length) {
    return null;
  }

  return (
    <Table.Card>
      <Table>
        <Table.Head headers={["Address", "Amount"]} />
        <Table.Body>
          {vout
            .sort((a, b) => (a?.value > b?.value ? -1 : 1))
            .map((vout, index) => (
              <Table.Row key={index}>
                {vout.scriptPubKey?.asset &&
                vout.scriptPubKey?.addresses?.length ? (
                  <>
                    <Table.Cell>
                      {vout.scriptPubKey.addresses.map((addr) => (
                        <div key={addr}>
                                                <NextLink
                        className="text-brand-500 hover:text-brand-600"
                        href={`/explorers/${blockchain}/addresses/${addr}`}
                      >
                        {addr}
                      </NextLink>
                        </div>
                      ))}
                    </Table.Cell>
                    <Table.Cell>
                      <NextLink
                        className="text-brand-500 hover:text-brand-600"
                        href={`/explorers/${blockchain}/assets/${vout.scriptPubKey.asset.name}`}
                      >
                        {vout.scriptPubKey.asset.name}
                      </NextLink>
                    </Table.Cell>
                    <Table.Cell>{vout.scriptPubKey.asset.amount}</Table.Cell>
                  </>
                ) : vout.scriptPubKey.type === "nulldata" ? (
                  <>
                    <Table.Cell>nulldata</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </>
                ) : (
                  <>
                    {vout.scriptPubKey.addresses?.map((address) => (
                      <>
                        <Table.Cell>
                          <NextLink
                            className="text-brand-500 hover:text-brand-600"
                            href={`/explorers/${blockchain}/addresses/${address}`}
                          >
                            {address}
                          </NextLink>
                        </Table.Cell>
                        <Table.Cell>{vout.value}</Table.Cell>
                      </>
                    ))}
                  </>
                )}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Table.Card>
  );
}
