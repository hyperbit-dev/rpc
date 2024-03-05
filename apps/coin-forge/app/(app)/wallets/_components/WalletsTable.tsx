"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PoubDbWallet, pouchClient } from "@/_lib/pouchdb";
import { getColumns } from "./columns";
import { SendDrawer } from "@/_components/SendDrawer";

export function WalletsTable() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<{
    offset: number;
    rows: PoubDbWallet[];
    total_rows: number;
  } | null>({
    total_rows: 1,
    rows: [],
    offset: 0,
  });

  console.log("data", data);

  useEffect(() => {
    const fetchData = async () => {
      const wallets = await pouchClient.getWallets();
      // @ts-ignore
      setData(wallets);
    };

    fetchData().catch(console.error);
  }, []);

  function handleRowClick(row: any) {
    router.push(`/wallets/${row.original.id}`);
  }

  const table = useReactTable({
    columns: getColumns(setOpen),
    data: data?.rows ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="w-full text-sm border-collapse table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 pt-0 pb-3 pl-8 font-medium text-left border-b"
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row)}
              className="duration-300 cursor-pointer hover:bg-brand-50/30 ease"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-4 pl-8 capitalize border-b border-slate-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <SendDrawer open={open} setOpen={setOpen} />
    </>
  );
}
