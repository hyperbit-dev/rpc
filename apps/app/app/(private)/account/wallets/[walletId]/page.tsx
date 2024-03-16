"use client";

import { useGetWalletQuery } from "@/_api/client";
import { useGetWalletPouchDbQuery } from "@/_api/client/wallets/queries/get-wallet-pouchdb";
import { Container } from "@/_components/Container";
import { PageHeader } from "@/_components/PageHeader";
import { useMemo } from "react";

export default function WalletPage({
  params,
}: {
  params: { walletId: string };
}) {
  const { walletId } = params;
  const getWalletQueryPouchDb = useGetWalletPouchDbQuery({ walletId });
  const data = getWalletQueryPouchDb.data;
  console.log("data", data);

  const addresses = useMemo(() => {
    if (!getWalletQueryPouchDb.data) {
      return [];
    }

    let addresses: string[] = [];
    Object.keys(getWalletQueryPouchDb.data.accounts).forEach((key) => {
      const account = getWalletQueryPouchDb.data.accounts[key];
      const external = account.external.map((address: any) => address.address);
      const change = account.change.map((address: any) => address.address);
      addresses = addresses.concat(external, change);
    });
    return addresses;
  }, [getWalletQueryPouchDb.data]);

  const getWalletQuery = useGetWalletQuery(
    { walletId, chainId: data?.wallet?._network?.id, addresses },
    {
      enabled: addresses.length > 0 && !!data,
    }
  );
  console.log("getWalletQuery", getWalletQuery.data);

  if (!getWalletQueryPouchDb.data) {
    return null;
  }

  return (
    <Container className="py-4">
      <PageHeader>{data.label}</PageHeader>
    </Container>
  );
}
