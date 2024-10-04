import { AdjustmentsVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Input } from "@hyperbitui/react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { NavLinkCard, WalletCard } from "~/components";
import { useGetWalletsQuery } from "~/services/api";

export function WalletsPage() {
  const getWalletsQuery = useGetWalletsQuery();
  console.log("getWalletsQuery", getWalletsQuery.data);

  return (
    <>
      <div className="flex items-center justify-between px-2 pt-3 pb-3">
        <div>&nbsp;</div>
        <div className="font-medium text-md">Wallets</div>
        <Link
          to="/account/wallets/add"
          className="outline-brand-500 action:text-brand-500"
        >
          <PlusIcon className="w-5" />
        </Link>
      </div>
      <div className="flex gap-3 px-2 mb-2">
        <Input type="text" placeholder="Search wallets..." />
        <button
          type="button"
          className="mr-2 outline-brand-500 action:text-brand-500"
        >
          <AdjustmentsVerticalIcon className="w-5" />
        </button>
      </div>
      <div className="flex-1 px-2 mb-2 overflow-auto">
        <Virtuoso
          totalCount={getWalletsQuery?.data?.meta?.total ?? 0}
          data={getWalletsQuery?.data?.data ?? []}
          // @ts-expect-error TODO
          itemContent={(index, data: { id: string; doc: unkonwn }) => {
            return (
              <NavLinkCard
                key={data.id}
                to={`/account/wallets/${data.id}`}
                className={clsx(
                  "border border-gray-300 -mb-[1px]",
                  index === 0 && "rounded-t-md",
                  index === getWalletsQuery.data.meta.total - 1 &&
                    "rounded-b-md"
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
      </div>
    </>
  );
}
