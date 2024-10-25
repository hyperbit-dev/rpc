import { ClipboardButton } from "~/_components/ClipboardButton";
import { NextLink } from "~/_components/NextLink";
import { getOutput } from "~/_lib/explorer/block";
import { getSlice } from "~/_lib/explorer/transaction";
import Table from "~/_components/table/Table";
import { ApiBlock } from "@/app/api/v1/explorer/blocks";

type BlockTransactionsProps = {
  block: ApiBlock;
  blockchain: string;
};

export function BlockTransactions({
  block,
  blockchain,
}: BlockTransactionsProps) {
  return (
    <>
      <h2 className="py-2 text-lg">{block.tx.length} Transaction(s)</h2>
      <Table.Card>
        <Table>
          <Table.Head
            headers={["", "Transaction ID", "Size", "VIN", "VOUT", "Output"]}
          />
          <Table.Body>
            {block.tx.map((tx) => {
              const output = getOutput(block);
              return (
                <Table.Row key={tx.txid}>
                  <Table.Cell>
                    <ClipboardButton value={tx.txid} />
                  </Table.Cell>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/transactions/${tx.txid}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {getSlice(tx.txid)}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>{tx.size} bytes</Table.Cell>
                  <Table.Cell>{tx.vin.length}</Table.Cell>
                  <Table.Cell>{tx.vout.length}</Table.Cell>
                  <Table.Cell>{output}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Card>
    </>
  );
}
