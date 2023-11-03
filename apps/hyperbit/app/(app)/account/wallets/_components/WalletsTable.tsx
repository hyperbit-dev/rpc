"use client";
import { AppTable, AppTableDef, AppTableTbody, AppTableTh, AppTableThead, AppTableTrow, CryptoIcon, Input, SectionCard } from "@/components";
import { chains } from "@hyperbitjs/chains";
import { Prisma } from "@prisma/client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import * as icons from "react-cryptoicon";

type WalletsTableProps = {
  wallets: Prisma.WalletCreateInput[];
};

function getNetworks(blockchain: Prisma.BlockchainCreateInput) {
  return Object.values(chains).filter(
    // @ts-ignore
    (chain) => chain[blockchain.network]?.id === blockchain.chainId
  )?.[0];
}

export function WalletsTable({ wallets }: WalletsTableProps) {
  const router = useRouter();
  const columnHelper = createColumnHelper<Prisma.WalletCreateInput>();

  const columns = [
    columnHelper.accessor("blockchain", {
      header: "",
      size: 50,
      maxSize: 50,
      cell: (info) => {
        const blockchain = info.getValue() as Prisma.BlockchainCreateInput;
        const networks = getNetworks(blockchain);
        // @ts-ignore
        const Icon = icons[networks[blockchain.network].unit];
        return Icon ? <CryptoIcon Icon={Icon} size={25} /> : null;
      },
    }),
    columnHelper.accessor("blockchain.name", {
      header: "Blockchain",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: wallets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <SectionCard className="p-4">
      <div className="flex mb-4">
        <Input className="w-full md:w-1/3" placeholder="Search by name..." />
      </div>
      <AppTable className="w-full">
        <AppTableThead className="border-t border-b border-gray-200">
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
                onClick={() =>
                  router.push(`/account/wallets/${row.original.id}`)
                }
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
