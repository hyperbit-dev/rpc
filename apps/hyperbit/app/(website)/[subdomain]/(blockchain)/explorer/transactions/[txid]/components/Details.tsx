import { NextLink, SectionCard } from "@/components";
import { GetRawTransactionResponse } from "@/types/api/v1/transactions";
import React from "react";

function getMiningFee(vin, vout, coinbase): string {
  let inputsTotalValue = 0;
  let outputsTotalValue = 0;

  vin.forEach((v) => {
    inputsTotalValue += v.value;
  });

  inputsTotalValue += coinbase;

  vout.forEach((v) => {
    outputsTotalValue += v.value;
  });
  return Math.abs(outputsTotalValue - inputsTotalValue).toFixed(8);
}

export function Details({
  transaction,
  inMempool,
  coinbase,
}: {
  transaction: GetRawTransactionResponse;
  inMempool: boolean;
  coinbase: number;
}) {
  const miningFee: string = getMiningFee(
    transaction.vin,
    transaction.vout,
    coinbase
  );

  const resultFee = isNaN(Number(miningFee)) ? 0 : miningFee;

  return (
    <SectionCard>
      <dl className="grid sm:grid-cols-[25%_auto] sm:divide-y overflow-x-auto">
        <dt className="p-2">ID</dt>
        <dd className="p-2 border-b border-t-transparent sm:text-right sm:border-b-transparent">
          {transaction.txid}
        </dd>
        <dt className="p-2">Hash</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.hash}
        </dd>
        <dt className="p-2">Blockhash</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.blockhash && (
            <NextLink
              href={`/explorer/blocks/${transaction.blockhash}`}
              className="text-cerulean-500 hover:text-cerulean-700"
            >
              {transaction.blockhash}
            </NextLink>
          )}
        </dd>
        <dt className="p-2">Height</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.height ? (
            <NextLink
              href={`/explorer/blocks/${transaction.height}`}
              className="text-cerulean-500 hover:text-cerulean-700"
            >
              {transaction.height}
            </NextLink>
          ) : inMempool ? (
            <span className="text-red-500">Pending Mempool Transaction</span>
          ) : (
            <span className="text-red-500">Not in Block</span>
          )}
        </dd>
        <dt className="p-2">Time</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.time ? (
            new Date(transaction.time * 1000).toLocaleString()
          ) : (
            <span className="text-red-500">Not Available</span>
          )}
        </dd>
        <dt className="p-2">Confirmations</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.confirmations ?? (
            <span className="text-red-500">Unconfirmed</span>
          )}
        </dd>
        <dt className="p-2">Size</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.size}
        </dd>
        <dt className="p-2">Virtual Size</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.vsize}
        </dd>
        <dt className="p-2">Lock Time</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.locktime}
        </dd>
        <dt className="p-2">VINs</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.vin.length}
        </dd>
        <dt className="p-2">VOUTs</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {transaction.vout.length}
        </dd>
        <dt className="p-2">Mining Fee</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {resultFee} RVN
        </dd>
        <dt className="p-2">Fee Rate</dt>
        <dd className="p-2 border-b sm:text-right sm:border-b-transparent">
          {(Number(resultFee) / transaction.size) * 1000} per kB
        </dd>
      </dl>
    </SectionCard>
  );
}
