"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import pouchdb from "@/services/pouchdb";
import {
  PouchDbWallet,
  PouchDbWalletAddress,
  PouchDbWalletAccounts,
} from "@/services/wallet";
import { useParams } from "next/navigation";
import React from "react";
import {
  AppTable,
  AppTableDef,
  AppTableTbody,
  AppTableTh,
  AppTableThead,
  AppTableTrow,
  Input,
  SectionCard,
} from "@/components";

type TableRow = PouchDbWalletAddress & {
  type: string;
  account: string;
};

export function Addresses() {
  const [accounts, setAccounts] = React.useState<PouchDbWalletAccounts | null>(
    null
  );
  const columnHelper = createColumnHelper<TableRow>();
  const params = useParams();

  const columns = [
    // createColumnHelper.accessor("address", {
    //   header: "",
    //   size: 50,
    //   maxSize: 50,
    //   cell: (info) => {
    //     const blockchain = info.getValue() as Prisma.BlockchainCreateInput;
    //     const networks = getNetworks(blockchain);
    //     // @ts-ignore
    //     const Icon = icons[networks[blockchain.network].unit];
    //     return Icon ? <CryptoIcon Icon={Icon} size={25} /> : null;
    //   },
    // }),
    columnHelper.accessor("label", {
      header: "Label",
    }),
    columnHelper.accessor("address", {
      header: "Address",
      minSize: 400,
    }),
    columnHelper.accessor("type", {
      header: "Type",
    }),
    columnHelper.accessor("path", {
      header: "Path",
    }),
  ];

  React.useEffect(() => {
    if (params.walletId && !accounts) {
      pouchdb.get(params.walletId, { attachments: true }).then((doc) => {
        setAccounts((doc as unknown as PouchDbWallet).accounts);
      });
    }
  }, [params, accounts]);

  const data = React.useMemo(() => {
    console.log("memo accounts", accounts);
    if (accounts) {
      const data: TableRow[] = [];
      Object.keys(accounts).forEach((key: string) => {
        const account = accounts[key];
        account.addresses.external.forEach((address: PouchDbWalletAddress) => {
          data.push({ ...address, type: "external", account: key });
        });
        account.addresses.change.forEach((address: PouchDbWalletAddress) => {
          data.push({ ...address, type: "change", account: key });
        });
      });
      return data.sort((a, b) =>
        a.path > b.path ? 1 : a.type === "external" ? 1 : -1
      );
    }
    return [];
  }, [accounts]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <SectionCard>
      <div className="flex mb-4">
        <Input className="w-full md:w-1/3" placeholder="Search by address..." />
      </div>
      <AppTable className="w-full">
        <AppTableThead className="text-sm border-t border-b border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <AppTableTrow key={headerGroup.id} className="flex w-[fit-content]">
              {headerGroup.headers.map((header) => (
                <AppTableTh
                  key={header.id}
                  className="p-2 text-sm font-normal text-left"
                  {...{
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </AppTableTh>
              ))}
            </AppTableTrow>
          ))}
        </AppTableThead>
        <AppTableTbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <AppTableTrow
                key={row.id}
                className="flex w-[fit-content] items-center hover:bg-blue-50 active:bg-blue-50 focus:bg-blue-50 cursor-pointer w-full"
                // onClick={() =>
                //   router.push(`/account/wallets/${row.original.id}`)
                // }
              >
                {row.getVisibleCells().map((cell) => (
                  <AppTableDef
                    key={cell.id}
                    className="p-2"
                    {...{
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </AppTableDef>
                ))}
              </AppTableTrow>
            );
          })}
        </AppTableTbody>
      </AppTable>
    </SectionCard>
  );
}
