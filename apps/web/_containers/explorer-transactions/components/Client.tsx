"use client";

import { useGetTransactionsQuery } from "~/_api/client";
import { Container } from "~/_components/Container";
import { Loading } from "./Loading";
import Table from "@/_components/table/Table";
import { NextLink } from "@/_components/NextLink";
import { ClipboardButton } from "@/_components/ClipboardButton";
import { useState } from "react";

export default function ExplorerTransactionsClient({
  skip: initialOffset = "0",
  count = "20",
  blockchain,
}: {
  skip: string;
  count: string;
  blockchain: string;
}) {
  const [skip, setOffset] = useState(Number(initialOffset));
  const getTransactionsQuery = useGetTransactionsQuery({
    skip: skip.toString(),
    count,
    blockchain,
  });
  const transactions = getTransactionsQuery.data;
  if (getTransactionsQuery.isLoading) {
    return <Loading />;
  }

  if (!transactions) {
    return null;
  }

  const disabled = Number(skip) - Number(count) <= 0;

  function handlePrev() {
    if (disabled) return;
    setOffset(skip - Number(count));
  }

  function handleNext() {
    setOffset(skip + Number(count));
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl">Transactions</h1>
        <div className="flex space-x-2 text-sm justify-end">
          <button
            type="button"
            disabled={disabled}
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
              "",
              "Transaction ID",
              "Block Hash",
              "Time",
              "Confirmations",
              "Movement",
            ]}
          />
          <Table.Body>
            {transactions?.map((transaction: any, index: number) => {
              const hash = `${transaction.blockhash.slice(0, 8)}...${transaction.blockhash.slice(
                transaction.blockhash.length - 8,
                transaction.blockhash.length
              )}`;

              return (
                <Table.Row key={`${transaction.txid}-${index}`}>
                  <Table.Cell>
                    <ClipboardButton value={transaction.txid} />
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/transactions/${transaction.txid}`}
                    >
                      {transaction.txid}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/blocks/${transaction.blockhash}`}
                    >
                      {hash}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(transaction.time * 1000).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>{transaction.confirmations}</Table.Cell>
                  <Table.Cell>{transaction.amount}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Card>
      <div className="flex space-x-2 text-sm justify-end">
        <button
          type="button"
          disabled={disabled}
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
