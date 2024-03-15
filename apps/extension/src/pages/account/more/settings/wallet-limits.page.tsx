import { ChevronLeftIcon } from "@heroicons/react/24/outline";
// import { Toggle } from "@hyperbitui/react";
import { useNavigate } from "react-router-dom";
// import { ListCard, NavLinkCard } from "~/components";

export function WalletLimitsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 h-full py-2 select-none">
      <div className="flex items-center justify-between px-2 pt-1 pb-3">
        <button
          type="button"
          className="outline-brand-500 action:text-brand-500"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon className="w-5" />
        </button>
        <div className="font-medium text-md">Wallet Limits</div>
        <div>&nbsp;</div>
      </div>
      {/* <div className="flex-1 px-2 overflow-y-auto">
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          <ListCard SlotRight={<Toggle disabled />}>Lock App</ListCard>
          <ListCard SlotRight={<span>Never</span>}>Auto Lock</ListCard>
          <NavLinkCard to="/account/more/security/change-password">
            Change WalletLimits Password
          </NavLinkCard>
        </div>
      </div> */}
    </div>
  );
}
