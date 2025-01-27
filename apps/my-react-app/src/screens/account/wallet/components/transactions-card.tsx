import {
  ArrowBottomRightIcon,
  ArrowTopRightIcon,
  Link2Icon,
} from "@radix-ui/react-icons";
import { Button } from "~/components/button";
import { useListAddressesTransactionsQuery } from "~/utils/queries";
import type { NexusWallet } from "~/utils/queries/wallets/types";

type TransactionsCardProps = {
  wallet: NexusWallet;
};

export function TransactionsCard({ wallet }: TransactionsCardProps) {
  const listAddressesTransactionsQuery = useListAddressesTransactionsQuery({
    walletId: wallet.id,
  });

  const data = listAddressesTransactionsQuery.data;
  const transactions = data?.transactions ?? [];
  const addresses = data?.addresses ?? [];

  function getAddressAmounts(transaction: any, addressList: string[]) {
    const result: {
      [key: string]: { type: "withdrawal" | "deposit"; amount: number };
    } = {};

    // Process transaction inputs (vin) as withdrawals
    transaction.vin.forEach((input: any) => {
      if (addressList.includes(input.address)) {
        if (!result[input.address]) {
          result[input.address] = { type: "withdrawal", amount: 0 };
        }
        result[input.address].amount += input.value;
      }
    });

    // Process transaction outputs (vout) as deposits
    transaction.vout.forEach((output: any) => {
      if (output.scriptPubKey.addresses) {
        output.scriptPubKey.addresses.forEach((address: any) => {
          if (addressList.includes(address)) {
            if (!result[address]) {
              result[address] = { type: "deposit", amount: 0 };
            }
            result[address].amount += output.value;
          }
        });
      }
    });

    return result;
  }

  function formatBlockTime(blockTime: number) {
    const date = new Date(blockTime * 1000);
    return date.toLocaleString("en-US", { timeZone: "UTC" }); // Customize locale and time zone
  }

  return (
    <div className="border border-secondary-500 bg-secondary-600 p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl text-gray-100">Recent Transactions</h2>
        </div>
        <ul className="flex flex-col">
          {transactions.map((tx: any) => {
            const amounts = getAddressAmounts(tx, addresses);
            if (!Object.keys(amounts).length) return null;
            const arr = Object.values(amounts);
            const time = formatBlockTime(tx.blocktime);

            return (
              <li key={tx.txid} className="flex flex-col hover:bg-secondary-400 rounded-md px-1">
                {arr.map((item) => {
                  return (
                    <div
                      key={item.type}
                      className="flex items-center justify-between my-2 gap-4"
                    >
                      {item.type === "deposit" ? (
                        <ArrowBottomRightIcon height={20} width={20}/>
                      ) : (
                        <ArrowTopRightIcon height={20} width={20} />
                      )}

                      <div className="font-normal text-gray-100 flex-1">
                        {item.amount}{" "}
                        <div className="text-sm text-gray-400 flex-1">
                          {time}
                        </div>
                      </div>

                      <a
                        href={`https://hyperbit.app/explorers/mewc/transactions/${tx.txid}`}
                        target="_blank"
                        className="hover:bg-brand-500 p-1.5 inline-block rounded-xl"
                      >
                        <Link2Icon height={20} width={20} />
                      </a>
                    </div>
                  );
                })}
              </li>
            );
          })}
        </ul>
        <Button type="button" Width="full" Variant="dark">
          View All Transactions
        </Button>
      </div>
    </div>
  );
}
