"use client";

import {
  Button,
  Card,
  Container,
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
import { usePouchDbWallet } from "@/lib/hooks/usePouchDbWallet";
import { useListAddressesQuery } from "@/lib/queries";
import { useImportAddressMutation } from "@/lib/queries/addresses/mutations";

export default function WalletAddresses({
  params: { walletId },
}: {
  params: { walletId: string };
}) {
  const listAddressesQuery = useListAddressesQuery({
    walletId: walletId,
  });

  const importAddressMutation = useImportAddressMutation();

  const addresses = listAddressesQuery.data;

  const { wallet } = usePouchDbWallet(walletId);
  console.log("wallet", wallet);

  async function generateAddress() {
    const lastAddress = getLastAddress();
    let index = 0;
    if (lastAddress) {
      const path = lastAddress.path.split("/");
      index = path[path.length - 1];
    }
    if (wallet) {
      const addresses = await wallet.generateAddress({
        account: 0,
        index: index + 1,
        count: 1,
      });
      if (addresses) {
        importAddressMutation.mutate({
          walletId: walletId,
          addresses: addresses.reduce((acc: any, address: any) => {
            acc.push({
              address: address.external.address,
              label: address.external.label,
              path: address.external.path,
            });
            acc.push({
              address: address.change.address,
              label: address.change.label,
              path: address.change.path,
            });
            return acc;
          }, []),
        });
      }
    }
  }

  function getLastAddress() {
    return addresses.data.reduce((prev: any, current: any) => {
      return prev?.path > current.path ? prev : current;
    }, undefined);
  }

  return (
    <Container>
      <Card>
        <TableCard>
          <div className="pb-3 flex gap-3 items-center justify-between">
            <TableTitle>Addresses</TableTitle>
            <div className="flex items-center justify-between gap-3">
              <SearchInput />
              {/* <ImportWalletModal /> */}
              <Button type="button" onClick={generateAddress}>
                Generate Address
              </Button>
            </div>
          </div>
          {addresses?.data?.length ? (
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
                      <TableHeading>Address</TableHeading>
                      <TableHeading>Balance</TableHeading>
                      <TableHeading>Path</TableHeading>
                      <TableHeading>Action</TableHeading>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {addresses.data.map((address: any) => {
                      return (
                        <TableRow key={address.id}>
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
                          <TableCell>{address.address}</TableCell>
                          <TableCell>$</TableCell>
                          <TableCell>{address.path}</TableCell>
                          <TableCell>$</TableCell>
                          {/* <TableCell> */}
                          {/* <Link href={`/account/wallets/${wallet.id}`}>
                              Details
                            </Link> */}
                          {/* </TableCell> */}
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
              Title="No addresses found"
              Description="Generate a new address to get started."
              // Actions={<CreateWalletModal ButtonText="Create Wallet" />}
            />
          )}
        </TableCard>
      </Card>
    </Container>
  );
}
