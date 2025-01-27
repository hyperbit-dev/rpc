import { DotsVerticalIcon } from "@radix-ui/react-icons";

const accounts = [
  {
    id: "1",
    label: "Account 1",
    balance: "9000",
    available: "4852",
  },
  {
    id: "2",
    label: "Account 2",
    balance: "1000",
    available: "500",
  },
  {
    id: "3",
    label: "Savings 1",
    balance: "1234",
    available: "1000",
  },
  {
    id: "4",
    label: "Savings 2",
    balance: "1000",
    available: "0",
  },
];

export function AccountsCard({ wallet }: { wallet: any }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {accounts.map((account) => (
        <div
          key={account.id}
          className="border border-secondary-500 bg-secondary-600 p-4 rounded-lg border-l-[6px] border-l-brand-700 rounded-l bg-secondary-500 text-gray-100 flex flex-col gap-4"
        >
          <header className="flex items-center justify-between">
            <span className="text-lg font-medium leading-none flex-1">
              {account.label}
            </span>
            <DotsVerticalIcon height={16} width={16} />
          </header>

          <dl className="grid grid-cols-3 text-gray-400 leading-none gap-x-2 gap-y-1">
            <dt>Balance:</dt>
            <dd className="col-span-2">
              {account.balance}{" "}
              <span className="uppercase">{wallet.blockchain.symbol}</span>
            </dd>
            <dt>Available:</dt>
            <dd className="col-span-2">
              {account.balance}{" "}
              <span className="uppercase">{wallet.blockchain.symbol}</span>
            </dd>
          </dl>
        </div>
      ))}
    </div>
  );
}
