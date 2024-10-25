import { PencilSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { ClipboardButton } from "~/components/ClipboardButton";

export function AddressesTab({
  wallet,
}: {
  wallet: (PouchDB.Core.IdMeta & PouchDB.Core.GetMeta) | undefined;
}) {
  const addresses = useMemo(() => {
    if (!wallet) return [];
    // @ts-expect-error TODO
    const accounts = Object.values(wallet.accounts);
    return (
      accounts?.reduce((acc, account) => {
        const addresses = [
          // @ts-expect-error TODO
          ...Object.values(account.external).map((a) => ({
            // @ts-expect-error TODO
            ...a,
            type: "EXTERNAL",
          })),
          // @ts-expect-error TODO
          ...Object.values(account.change).map((a) => ({
            // @ts-expect-error TODO
            ...a,
            type: "CHANGE",
          })),
        ]; // @ts-expect-error TODO
        return [...acc, ...addresses];
      }, []) ?? []
    );
  }, [wallet]);

  return (
    <Virtuoso
      // @ts-expect-error TODO
      totalCount={addresses.length ?? 0}
      // @ts-expect-error TODO
      data={addresses ?? []}
      // @ts-expect-error TODO
      itemContent={(index, data: { id: string; doc: unkonwn }) => {
        return (
          <div
            // @ts-expect-error TODO
            key={data.address}
            className={clsx(
              "border border-gray-300 -mb-[1px] mx-1",
              index === 0 && "rounded-t-md",
              // @ts-expect-error TODO
              index === addresses.length - 1 && "rounded-b-md",
            )}
          >
            <div className="flex flex-row items-center gap-3 p-2 leading-none">
              <div className="mx-1">
                {/* @ts-expect-error TODO */}
                <ClipboardButton value={data.address} />
              </div>
              <div className="flex flex-col flex-1 gap-[2px] overflow-hidden">
                {/* @ts-expect-error TODO */}
                <div className="truncate">{data.address}</div>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <svg
                    className="w-3 h-3 text-brand-500 animate-spin"
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
                  Syncing Balance...
                </span>
                <div className="text-xs text-gray-500">
                  {/* @ts-expect-error TODO */}
                  {data.path} &middot; {data.type}
                </div>
              </div>
              <Link
                // @ts-expect-error TODO
                to={`/account/wallets/${wallet?._id}/addresses/${data.address}/edit`}
              >
                <PencilSquareIcon className="w-4 outline-brand-500 action:text-brand-500" />
              </Link>
            </div>
          </div>
        );
      }}
    />
  );
}
