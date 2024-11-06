import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import Table from "@/_components/table/Table";
import { NextLink } from "@/_components/NextLink";
import { useGetAssetAddressesQuery } from "@/_api/client/assets/get-asset-addresses";

type TabAddressesProps = {
  name: string;
  blockchain: string;
  start: string;
  count: string;
};

const COUNT = 25;

export function TabAddresses({
  name,
  blockchain,
  start: initialStart,
  count,
}: TabAddressesProps) {
  const [start, setStart] = useState(Number(initialStart));
  const getAssetAddressesQuery = useGetAssetAddressesQuery({
    asset: name,
    blockchain,
    start: start.toString(),
    count,
  });

  function handlePrev() {
    if (start <= 0) return;
    setStart(start - 1 - COUNT);
  }

  function handleNext() {
    setStart(start + 1 + COUNT);
  }

  if (getAssetAddressesQuery.isLoading) {
    return <Skeleton count={5} />;
  }

  if (getAssetAddressesQuery.isError) {
    return <div className="p-1">Addresses not found</div>;
  }

  const addresses = Object.keys(getAssetAddressesQuery.data).length
    ? Object.keys(getAssetAddressesQuery.data).map((key) => {
        return {
          address: key,
          amount: getAssetAddressesQuery.data[key],
        };
      })
    : [];

  return (
    <>
      <div className="flex space-x-2 text-sm justify-end">
        <button
          type="button"
          disabled={start <= 0}
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handlePrev()}
        >
          &lt; Prev
        </button>
        <button
          type="button"
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handleNext()}
          disabled={addresses.length < COUNT}
        >
          Next &gt;
        </button>
      </div>
      <Table.Card>
        <Table>
          <Table.Head headers={["Address", "Amount"]} />
          <Table.Body>
            {addresses.map((address: any) => {
              return (
                <Table.Row key={address.address}>
                  <Table.Cell>
                    <NextLink
                      href={`/explorers/${blockchain}/addresses/${address.address}`}
                      className="text-cerulean-500 hover:text-cerulean-600 active:text-cerulean-600 focus:text-cerulean-600"
                    >
                      {address.address}
                    </NextLink>
                  </Table.Cell>
                  <Table.Cell>{address.amount}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Table.Card>
      <div className="flex space-x-2 text-sm justify-end">
        <button
          type="button"
          disabled={start <= 0}
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handlePrev()}
        >
          &lt; Prev
        </button>
        <button
          type="button"
          className="disabled:cursor-not-allowed disabled:opacity-50 hover:brand-600 p-1"
          onClick={() => handleNext()}
          disabled={addresses.length < COUNT}
        >
          Next &gt;
        </button>
      </div>
    </>
  );
}
