import {
  AdjustmentsVerticalIcon,
  ArchiveBoxIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";

export function AccountPage() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center pt-4 pb-10 leading-none text-center text-white bg-brand-500">
        <h2 className="text-lg">Wallet Label</h2>
        <span className="text-xs">Syncing Balances...</span>
        <span className="text-lg font-medium">$0.00</span>
      </div>
      <ul className="relative z-20 flex max-w-xs gap-1 px-4 py-2 mx-auto -mt-8 text-white bg-gray-800 rounded">
        <li>
          <Link
            to="/account/backup"
            className="flex flex-col items-center gap-1 px-2 py-1 outline-none action:text-brand-500"
          >
            <ArchiveBoxIcon className="w-5" />
            <span className="text-xs">Backup</span>
          </Link>
        </li>
        <li>
          <Link
            to="/account/buy"
            className="flex flex-col items-center gap-1 px-2 py-1 outline-none action:text-brand-500"
          >
            <PlusIcon className="w-5" />
            <span className="text-xs">Buy</span>
          </Link>
        </li>
        <li>
          <Link
            to="/account/receive"
            className="flex flex-col items-center gap-1 px-2 py-1 outline-none action:text-brand-500"
          >
            <ArrowDownLeftIcon className="w-5" />
            <span className="text-xs">Receive</span>
          </Link>
        </li>
        <li>
          <Link
            to="/account/send"
            className="flex flex-col items-center gap-1 px-2 py-1 outline-none action:text-brand-500"
          >
            <ArrowUpRightIcon className="w-5" />
            <span className="text-xs">Send</span>
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="font-medium text-md">History (100+)</div>
        <AdjustmentsVerticalIcon className="w-5" />
      </div>
      <div className="flex flex-col flex-1 px-1 py-2 overflow-y-auto">
        <Virtuoso
          style={{ height: "100%" }}
          totalCount={200}
          itemContent={(index) => (
            <div className="p-3 mx-1 mb-1 leading-tight border border-gray-300 rounded">
              Item {index}
            </div>
          )}
        />
      </div>
    </>
  );
}
