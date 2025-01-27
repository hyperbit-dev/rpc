import clsx from "clsx";
import { useState } from "react";
import {
  ArchiveIcon,
  DashboardIcon,
  HamburgerMenuIcon,
  PieChartIcon,
} from "@radix-ui/react-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Link } from "@tanstack/react-router";
import Logo from "~/assets/logo.svg";

type AppSidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function AppSidebar({ isOpen, setIsOpen }: AppSidebarProps) {
  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 bg-secondary-600 h-full transition-all duration-500 z-20 border-r border-secondary-500",
        isOpen ? "w-[200px]" : "w-[72px]"
      )}
    >
      <header className="relative pl-6 py-3 pr-2">
        <span className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-6 h-6" />
          <span
            className={clsx(
              "font-medium text-md duration-500 text-gray-100",
              !isOpen && "opacity-0 pointer-events-none"
            )}
          >
            Hyperbit
          </span>
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 duration-300 text-gray-100",
            "h-6 w-6 flex items-center justify-center cursor-pointer",
            "transition-all leading-none rounded",
            "border border-gray-600 hover:bg-brand-600 hover:border-brand-600 hover:text-gray-100",
            isOpen ? "rotate-180 right-2" : "rotate-0 -right-3 bg-gray-900"
          )}
        >
          <HamburgerMenuIcon />
        </button>
      </header>
      <nav className="px-2">
        <ul className="px-1 py-3 flex flex-col gap-1">
          <li className="relative">
            <AppSidebarLink
              isOpen={isOpen}
              href=""
              Icon={<DashboardIcon />}
              Label="Dashboard"
              Content="Dashboard"
            />
          </li>
          <li className="relative">
            <AppSidebarLink
              isOpen={isOpen}
              href="/portfolio"
              Icon={<PieChartIcon />}
              Label="Portfolio"
              Content="Portfolio"
            />
          </li>
          <li className="relative">
            <AppSidebarLink
              isOpen={isOpen}
              href="/wallets"
              Icon={<ArchiveIcon />}
              Label="Wallets"
              Content="Wallets"
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function AppSidebarLink({
  isOpen,
  href,
  Label,
  Content,
  Icon,
}: {
  isOpen: boolean;
  href: string;
  Icon: React.ReactNode;
  Label: React.ReactNode;
  Content: React.ReactNode;
}) {
  return (
    <AppSidebarTooltip
      Disabled={isOpen}
      Trigger={
        <Link
          to={`/account/${href}`}
          className="px-1 flex items-center text-gray-300 whitespace-nowrap rounded-md border border-transparent hover:border-brand-600 hover:bg-brand-600 hover:text-gray-100 group"
          activeProps={{ className: 'text-brand-600' }}
          activeOptions={{ exact: true }}
        >
          <span className="p-3 flex items-center justify-center">{Icon}</span>
          <span
            className={clsx(
              "leading-none text-sm font-medium group-[&:not(:hover)]:duration-500",
              !isOpen && "opacity-0 pointer-events-none"
            )}
          >
            {Label}
          </span>
        </Link>
      }
      Content={Content}
    ></AppSidebarTooltip>
  );
}

function AppSidebarTooltip({
  Trigger,
  Content,
  Disabled,
}: {
  Trigger: React.ReactNode;
  Content: React.ReactNode;
  Disabled?: boolean;
}) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{Trigger}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={clsx(
              "text-sm select-none rounded bg-black px-[15px] py-2.5 text-[15px] leading-none text-gray-100 z-30",
              "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
              "will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
              "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
              "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
              "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
              Disabled ? "hidden" : "block"
            )}
            sideOffset={13}
            side="right"
          >
            {Content}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
