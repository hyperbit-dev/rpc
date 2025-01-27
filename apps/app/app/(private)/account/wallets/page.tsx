"use client";

import {
  Button,
  Card,
  Container,
  CreateWalletModal,
  ImportWalletModal,
  SearchInput,
  TableBody,
  TableCard,
  TableCell,
  TableEmptyState,
  TableHead,
  TableHeading,
  TableRow,
  TableTitle,
  TableWrapper,
} from "@/components";
import { LazySvg } from "@/components/LazySvg";
import { useListWalletsQuery } from "@/lib/queries";
import Link from "next/link";

export default function AccountWallets() {
  const listWalletsQuery = useListWalletsQuery({});

  const wallets = listWalletsQuery.data?.data;

  return (
    <Container>
      <Card>
        <TableCard>
          <div className="pb-3 flex gap-3 items-center justify-between">
            <TableTitle>Wallets</TableTitle>
            <div className="flex items-center justify-between gap-3">
              <SearchInput />
              <ImportWalletModal />
              <CreateWalletModal />
            </div>
          </div>
          {wallets?.length ? (
            <>
              <TableWrapper>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <TableHead>
                    <TableRow>
                      <TableHeading>
                        <div className="flex items-center h-5">
                          <input
                            id="hs-table-pagination-checkbox-all"
                            type="checkbox"
                            className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          />
                          <label
                            htmlFor="hs-table-pagination-checkbox-all"
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </TableHeading>
                      <TableHeading>Name</TableHeading>
                      <TableHeading>Balance</TableHeading>
                      <TableHeading>Price</TableHeading>
                      <TableHeading>Action</TableHeading>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wallets.map((wallet: any) => {
                      return (
                        <TableRow key={wallet.id}>
                          <TableCell className="w-8">
                            <div className="flex items-center h-5">
                              <input
                                id="hs-table-pagination-checkbox-1"
                                type="checkbox"
                                className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              />
                              <label
                                htmlFor="hs-table-pagination-checkbox-1"
                                className="sr-only"
                              >
                                Checkbox
                              </label>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-row gap-2 items-center">
                              <div>
                                <LazySvg name={wallet.blockchain.symbol} />
                              </div>
                              <div className="leading-none">
                                <div>{wallet.label}</div>
                                <div className="text-xs text-gray-500">
                                  {wallet.blockchain.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>$</TableCell>
                          <TableCell>$</TableCell>
                          <TableCell>
                            <Link href={`/account/wallets/${wallet.id}`}>
                              Details
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </table>
              </TableWrapper>
              <div className="py-1 px-4">
                <nav
                  className="flex items-center space-x-1"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button
                    type="button"
                    className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
                    aria-current="page"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    aria-label="Next"
                  >
                    <span className="sr-only">Next</span>
                    <span aria-hidden="true">»</span>
                  </button>
                </nav>
              </div>
            </>
          ) : (
            <TableEmptyState
              Title="No wallets found"
              Description="Create or import a new wallet to get started."
              Actions={<CreateWalletModal ButtonText="Create Wallet" />}
            />
          )}
        </TableCard>
      </Card>
    </Container>
  );
}
