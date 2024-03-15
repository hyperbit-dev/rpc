import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Chip } from "@hyperbitui/react";
import { useNavigate } from "react-router-dom";
import { ListCard } from "~/components";

export function MoreToolsPage() {
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
        <div className="font-medium text-md">Tools</div>
        <div>&nbsp;</div>
      </div>
      <div className="flex-1 px-2 overflow-y-auto">
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          <ListCard SlotRight={<Chip size="sm">Coming Soon</Chip>}>
            Calculator
          </ListCard>
          <ListCard SlotRight={<Chip size="sm">Coming Soon</Chip>}>
            Node Settings
          </ListCard>
          {/* <ListCard>Display Currency</ListCard>
          <ListCard>Notifications</ListCard>
          <ListCard>Language</ListCard> */}
        </div>
        {/* <div className="mt-3 mb-1 text-sm font-medium">Social</div>
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          <ListCard>Website</ListCard>
          <ListCard>Github</ListCard>
          <ListCard>X (Twitter)</ListCard>
        </div> */}
      </div>
    </div>
  );
}
