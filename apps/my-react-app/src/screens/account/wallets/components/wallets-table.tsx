import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "../columns";
import { WalletsSkeleton } from "./wallets-skeleton";
import { NexusWallet } from "~/utils/queries/wallets/types";
import { ConnectWalletBanner } from "./connect-wallet";
import { Container } from "~/components/container";

type WalletsTableProps = {
  isLoading: boolean;
  data: NexusWallet[];
};

export function WalletsTable({ isLoading, data }: WalletsTableProps) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <WalletsSkeleton />;
  }

  if (!data.length) {
    return <ConnectWalletBanner />;
  }

  return (
    <Container>
      <div className="relative overflow-x-auto sm:rounded-lg p-4 select-none">
        <table className="w-full text-sm text-left rtl:text-right text-gray-200">
          <thead className="text-sm text-gray-200 uppercase border-b border-secondary-400">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-gray-200 uppercase"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-4 py-3 font-medium text-left capitalize"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-secondary-400">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-brand-600 group/row"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div />
      </div>
    </Container>
  );
}
