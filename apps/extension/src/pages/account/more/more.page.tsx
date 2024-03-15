import { Chip } from "@hyperbitui/react";
import { ListCard, NavLinkCard } from "~/components";

export function MorePage() {
  return (
    <div className="flex flex-col flex-1 h-full py-2 select-none">
      <div className="flex items-center justify-center px-2 pt-1 pb-3">
        <div className="font-medium text-md">More</div>
      </div>
      <div className="flex-1 px-2 overflow-y-auto">
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          <NavLinkCard to="/account/more/settings">Settings</NavLinkCard>
          <ListCard SlotRight={<Chip size="sm">Coming Soon</Chip>}>
            Connections
          </ListCard>
          <NavLinkCard to="/account/more/security">Security</NavLinkCard>
          <NavLinkCard to="/account/more/tools">Tools</NavLinkCard>
        </div>
      </div>
    </div>
  );
}
