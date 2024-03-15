import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { useGetWalletQuery } from "~/services/api";
// import { useGetWalletsQuery } from "~/services/api";

export function WalletPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getWalletQuery = useGetWalletQuery({ walletId: id as string });
  const data = getWalletQuery.data;

  return (
    <div className="flex-1 py-2">
      <div className="flex items-center justify-between px-2 pt-1 pb-3">
        <button
          type="button"
          className="outline-brand-500 action:text-brand-500"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="w-5" />
        </button>
        {/* @ts-expect-error TODO */}
        <div className="font-medium text-md">Wallet: {data?.label}</div>
        <div>&nbsp;</div>
      </div>
    </div>
  );
}
