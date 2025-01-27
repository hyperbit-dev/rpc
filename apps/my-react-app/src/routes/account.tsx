import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import clsx from "clsx";
import { useState } from "react";
import { AppSidebar } from "~/components/app-sidebar";
import { useAuth } from "~/hooks/use-auth";

export const Route = createFileRoute("/account")({
  component: AccountLayout,
  beforeLoad: async ({ location }) => {
    const auth = useAuth();
    if (!auth) {
      throw redirect({
        to: "/auth/login",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

function AccountLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-row overflow-hidden h-full bg-white">
      <AppSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={clsx(
          "flex flex-col flex-1 overflow-y-auto bg-[#1F1F1F] text-gray-200",
          "duration-500 transition-all",
          isOpen ? "pl-[200px]" : "pl-[72px]"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
