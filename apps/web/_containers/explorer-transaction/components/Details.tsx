import { NextLink } from "~/_components/NextLink";
import React from "react";
import { DescriptionList } from "@/_components/DescriptionList";
import { Description } from "@/_components/Description";
import { config } from "@/_config";
import {
  ApiRawTransaction,
  ApiVin,
  ApiVout,
} from "@/app/api/v1/explorer/transactions/[id]/types";

function getMiningFee(
  vin: ApiVin[],
  vout: ApiVout[],
  coinbase: number
): string {
  let inputsTotalValue = 0;
  let outputsTotalValue = 0;

  vin.forEach((v) => {
    inputsTotalValue += v?.value ? v.value : 0;
  });

  inputsTotalValue += coinbase;

  vout.forEach((v) => {
    outputsTotalValue += v.value;
  });
  return Math.abs(outputsTotalValue - inputsTotalValue).toFixed(8);
}

export function Details({
  blockchain,
  transaction,
  inMempool,
  coinbase,
}: {
  blockchain: string;
  transaction: ApiRawTransaction;
  inMempool: boolean;
  coinbase: number;
}) {
  const miningFee: string = getMiningFee(
    transaction.vin,
    transaction.vout,
    coinbase
  );

  const resultFee = isNaN(Number(miningFee)) ? 0 : miningFee;
  const configChain = config.blockchains.chains[blockchain];

  return (
    <DescriptionList>
      <Description name="ID" value={transaction.txid} />
      <Description name="Hash" value={transaction.hash} />
      {transaction.blockhash ? (
        <Description
          name="Blockhash"
          value={
            <NextLink
              href={`/explorers/${blockchain}/blocks/${transaction.blockhash}`}
              className="text-cerulean-500 hover:text-cerulean-700"
            >
              {transaction.blockhash}
            </NextLink>
          }
          copyValue={transaction.blockhash}
        />
      ) : undefined}
      <Description
        name="Height"
        value={
          transaction.height ? (
            <NextLink
              href={`/explorers/${blockchain}/blocks/${transaction.height}`}
              className="text-cerulean-500 hover:text-cerulean-700"
            >
              {transaction.height}
            </NextLink>
          ) : inMempool ? (
            <span className="text-red-500">Pending Mempool Transaction</span>
          ) : (
            <span className="text-red-500">Not in Block</span>
          )
        }
        copyValue={transaction.height ?? undefined}
      />
      <Description
        name="Time"
        value={
          transaction.time ? (
            new Date(transaction.time * 1000).toLocaleString()
          ) : (
            <span className="text-red-500">Not Available</span>
          )
        }
      />
      <Description
        name="Confirmations"
        value={
          transaction.confirmations ? (
            transaction.confirmations
          ) : (
            <span className="text-red-500">Unconfirmed</span>
          )
        }
      />
      <Description name="Size" value={transaction.size} />
      <Description name="Virtual Size" value={transaction.vsize} />
      <Description name="Lock Time" value={transaction.locktime} />
      <Description name="VINs" value={transaction.vin.length} />
      <Description name="VOUTs" value={transaction.vout.length} />
      <Description
        name="Mining Fee"
        value={`${resultFee} ${configChain.unit}`}
      />
      <Description
        name="Fee Rate"
        value={`${(Number(resultFee) / transaction.size) * 1000} per kB`}
      />
    </DescriptionList>
  );
}
