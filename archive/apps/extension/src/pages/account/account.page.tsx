import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ActivityTab, WalletsTab, TokensTab } from "./_components";

export function AccountPage() {
  const [activeTab, setActiveTab] = useState("assets");

  function renderTab() {
    switch (activeTab) {
      case "tokens":
        return <TokensTab />;
      case "activity":
        return <ActivityTab />;
      default:
      case "assets":
        return <WalletsTab />;
    }
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center pt-4 leading-none text-center text-white pb-14 bg-brand-500">
        <h2 className="text-lg">Assets Balance</h2>
        <span className="flex items-center gap-1 text-xs">
          <svg
            className="w-3 h-3 text-white animate-spin"
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
          Syncing Balances...
        </span>
        {/* <span className="text-lg font-medium">$0.00</span> */}
        {/* <span className="text-sm">↗ 0.01% Last Day</span> */}
      </div>
      <ul className="relative z-20 flex justify-center max-w-xs gap-4 px-6 py-2 mx-auto mb-2 -mt-8 text-white bg-gray-800 rounded">
        <li>
          <Link
            to="/account/buy"
            className="flex flex-col items-center gap-1 px-2 py-1 outline-none action:text-yellow-500"
          >
            <SparklesIcon className="w-5" />
            <span className="text-xs">Buy</span>
          </Link>
        </li>
        <li>
          <Link
            to="/account/swap"
            className="flex flex-col items-center gap-1 px-2 py-1 outline-none action:text-blue-500"
          >
            <ArrowsRightLeftIcon className="w-5" />
            <span className="text-xs">Swap</span>
          </Link>
        </li>
        <li>
          <Link
            to="/account/receive"
            className="flex flex-col items-center gap-1 px-2 py-1 outline-none action:text-orange-500"
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
      <div className="flex items-center gap-2 mt-2 border-b-4 border-gray-200 justify-evenly">
        <button
          type="button"
          className={clsx(
            activeTab === "assets" ? "border-brand-500" : "border-transparent",
            "w-full p-1 font-medium text-md outline-none action:text-brand-500 border-b-4 -mb-[4px] bg-transparent",
          )}
          onClick={() => setActiveTab("assets")}
        >
          Assets
        </button>
        <button
          type="button"
          className={clsx(
            activeTab === "tokens" ? "border-brand-500" : "border-transparent",
            "w-full p-1 font-medium text-md outline-none action:text-brand-500 border-b-4 -mb-[4px] bg-transparent",
          )}
          onClick={() => setActiveTab("tokens")}
        >
          NFTs
        </button>
        <button
          type="button"
          className={clsx(
            activeTab === "activity"
              ? "border-brand-500"
              : "border-transparent",
            "w-full p-1 font-medium text-md outline-none action:text-brand-500 border-b-4 -mb-[4px] bg-transparent",
          )}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
      </div>
      <div className="flex flex-col flex-1 px-1 py-2 overflow-y-auto">
        {renderTab()}
      </div>
    </>
  );
}
