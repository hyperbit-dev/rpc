import React from "react";
import { NextLink } from "~/_components/NextLink";
import Table from "@/_components/table/Table";
import { ApiVin } from "@/app/(server)/api/v1/explorer/transactions/[id]/types";

export function Vin({
  blockchain,
  vin,
  coinbase,
}: {
  blockchain: string;
  vin: ApiVin[];
  coinbase: number;
}) {
  const vins = vin?.reduce?.((a: (ApiVin & { value: number })[], c: ApiVin) => {
    const i = a.findIndex((x) => x.address === c.address);
    if (i > -1) {
      a[i].value += c?.value ? c.value : 0;
    } else {
      a.push({
        ...c,
        address: c.address,
        value: c.coinbase ? 5000 : c?.value ?? 0,
      });
    }
    return a;
  }, []);

  if (!vins.length) {
    return null;
  }

  return (
    <Table.Card>
      <Table>
        <Table.Head headers={["Address", "Amount"]} />
        <Table.Body>
          {vins.map((vin, index) => (
            <Table.Row key={`${index}-${vin.address}`}>
              {vin.coinbase ? (
                <>
                  <Table.Cell>Coinbase</Table.Cell>
                  <Table.Cell>{coinbase}</Table.Cell>
                </>
              ) : !vin.address ? (
                <>
                  <Table.Cell>Internal</Table.Cell>
                  <Table.Cell>{vin.value}</Table.Cell>
                </>
              ) : (
                <>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/addresses/${vin.address}`}
                    >
                      {vin.address}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>{vin.value}</Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Table.Card>
  );
}
