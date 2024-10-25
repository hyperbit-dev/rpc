import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button, Toggle } from "@hyperbit-private/react";
import { useNavigate } from "react-router-dom";
import { LinkCard, ListCard, NavLinkCard } from "~/components";
import { useAuth } from "~/hooks";

export function MoreSettingsPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  function logout() {
    auth.logout();
    navigate("/");
  }

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
        <div className="font-medium text-md">Settings</div>
        <div>&nbsp;</div>
      </div>
      <div className="flex-1 px-2 overflow-y-auto">
        <div className="mb-1 text-sm font-medium">Account</div>
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          <NavLinkCard to="/account/more/settings/wallet-limits">
            Wallet Limits
          </NavLinkCard>
        </div>

        <div className="mt-3 mb-1 text-sm font-medium">General</div>
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          <ListCard SlotRight={<Toggle disabled />}>Dark Mode</ListCard>
          <ListCard SlotRight={<span>US Dollar</span>}>
            Display Currency
          </ListCard>
          <ListCard SlotRight={<Toggle disabled />}>Autohide Balances</ListCard>
          <ListCard SlotRight={<Toggle disabled />}>Notifications</ListCard>
          <ListCard SlotRight={<span>English</span>}>Language</ListCard>
        </div>
        <div className="mt-3 mb-1 text-sm font-medium">Social</div>
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          <LinkCard href="https://hyperbit.app">Website</LinkCard>
          <LinkCard href="https://github.com/hyperbit-dev">Github</LinkCard>
          <LinkCard href="https://twitter.com/hyperbit_app">Twitter/X</LinkCard>
        </div>
        <div className="mt-3 mb-1 text-sm font-medium">Support</div>
        <div className="mb-2 border border-gray-300 divide-y rounded-md">
          {/* <ListCard SlotRight={<Chip size="sm">Coming Soon</Chip>}>
              Send Feedback
            </ListCard> */}
          <LinkCard href="mailto:support@hyperbit.app">Help & Support</LinkCard>
          <LinkCard href="https://hyperbit.app/terms-of-service">
            Terms of Service
          </LinkCard>
          <LinkCard href="https://hyperbit.app/privacy-policy">
            Privacy Policy
          </LinkCard>
          {/* <ListCard SlotRight={<Chip size="sm">Coming Soon</Chip>}>
            Accessibility Statement
          </ListCard> */}
        </div>
        <div className="mt-4 mb-2 border border-gray-300 divide-y rounded-md">
          <Button type="button" fullWidth onClick={logout}>
            Sign out
          </Button>
        </div>
        <div className="text-xs text-center">Hyperbit v1.0.0</div>
      </div>
    </div>
  );
}
