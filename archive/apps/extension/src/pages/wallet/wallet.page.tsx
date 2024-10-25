import { ChevronLeftIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetWalletQuery } from "~/services/api";
import { ActivityTab, AddressesTab, TokensTab } from "./_components";

export function WalletPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "addresses" | "tokens" | "activity"
  >("addresses");

  const getWalletQuery = useGetWalletQuery({ walletId: id as string });
  const wallet = getWalletQuery.data;

  function renderTab() {
    switch (activeTab) {
      case "tokens":
        return <TokensTab wallet={wallet} />;
      case "activity":
        return <ActivityTab wallet={wallet} />;
      default:
      case "addresses":
        return <AddressesTab wallet={wallet} />;
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="py-2 border-b">
        <div className="flex items-center justify-between px-2 pt-1 pb-3">
          <button
            type="button"
            className="outline-brand-500 action:text-brand-500"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon className="w-5" />
          </button>
          {/* @ts-expect-error TODO */}
          <div className="font-medium text-md">{wallet?.label}</div>
          <div>
            <PencilSquareIcon className="w-5" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 mb-2 border-b-4 border-gray-200 justify-evenly">
        <button
          type="button"
          className={clsx(
            activeTab === "addresses"
              ? "border-brand-500"
              : "border-transparent",
            "w-full p-1 font-medium text-md outline-none action:text-brand-500 border-b-4 -mb-[4px]",
          )}
          onClick={() => setActiveTab("addresses")}
        >
          Addresses
        </button>
        <button
          type="button"
          className={clsx(
            activeTab === "tokens" ? "border-brand-500" : "border-transparent",
            "w-full p-1 font-medium text-md outline-none action:text-brand-500 border-b-4 -mb-[4px]",
          )}
          onClick={() => setActiveTab("tokens")}
        >
          Tokens
        </button>
        <button
          type="button"
          className={clsx(
            activeTab === "activity"
              ? "border-brand-500"
              : "border-transparent",
            "w-full p-1 font-medium text-md outline-none action:text-brand-500 border-b-4 -mb-[4px]",
          )}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </button>
      </div>
      {renderTab()}
    </div>
  );
}
