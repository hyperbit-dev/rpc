import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@hyperbit-private/react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { NavLinkCard, WalletCard } from "~/components";
import { useGetWalletsQuery } from "~/services/api";

export function WalletsTab() {
  const getWalletsQuery = useGetWalletsQuery();
  console.log("getWalletsQuery", getWalletsQuery.data);

  if (getWalletsQuery.isLoading) {
    return (
      <span className="flex items-center justify-center gap-2 my-4 font-medium leading-none text-gray-400 text-md">
        <svg
          className="w-5 h-5 text-brand-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </span>
    );
  }

  if (!getWalletsQuery.data?.length) {
    return (
      <div className="my-4">
        <Button
          type="button"
          asChild
          className="flex items-center justify-center gap-1 mx-4 text-center text-white action:text-white"
        >
          <Link to="/account/wallets/add">
            <PlusIcon className="w-4" />
            <span className="text-md">Create Wallet</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <Virtuoso
      totalCount={getWalletsQuery?.data?.meta?.total ?? 0}
      data={getWalletsQuery?.data?.data ?? []}
      // @ts-expect-error TODO
      itemContent={(index, data: { id: string; doc: unkonwn }) => {
        console.log("data", data);
        return (
          <NavLinkCard
            key={data.id}
            to={`/account/wallets/${data.id}`}
            className={clsx(
              "border border-gray-300 -mb-[1px]",
              index === 0 && "rounded-t-md",
              index === getWalletsQuery.data.meta.total - 1 && "rounded-b-md",
            )}
          >
            <WalletCard
              // @ts-expect-error TODO
              label={data.label}
              // @ts-expect-error TODO
              blockchain={data.blockchain.name}
              // @ts-expect-error TODO
              network={data.blockchain.network}
            />
          </NavLinkCard>
        );
      }}
    />
  );
}
