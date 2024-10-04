"use client";
import { Container } from "@/_components/Container";
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  GlobeAmericasIcon,
  ServerStackIcon,
  Squares2X2Icon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const session = JSON.parse(sessionStorage.getItem("auth") ?? "{}");

  if (!session?.token) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside
        style={{ minWidth: "200px" }}
        className="bg-gray-100 border-r border-gray-200"
      >
        {/* <aside style={{ backgroundColor: "#1C1D22", minWidth: "175px" }}> */}
        <header
          className="flex items-center justify-start gap-2 px-6 border-b border-gray-300"
          style={{ height: "50px" }}
          // style={{ borderColor: "#1C1D22", height: "50px" }}
        >
          <Image src="/logo.svg" alt="Logo" width="25" height="25" />
          <span className="font-medium">Hyperbit</span>
        </header>
        <nav className="flex flex-col gap-1 p-4 text-sm text-gray-800 list-none">
          <li>
            <Link
              className={clsx(
                "flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-brand-500",
                pathname === "/account" && "bg-brand-500 text-white"
              )}
              href="/account"
            >
              <Squares2X2Icon className="w-5 h-5 group-action:stroke-white" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-brand-500",
                pathname === "/account/wallets" && "bg-brand-500 text-white"
              )}
              href="/account/wallets"
            >
              <WalletIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Wallets</span>
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-brand-500",
                pathname === "/account/portfolio" && "bg-brand-500 text-white"
              )}
              href="/account/portfolio"
            >
              <ServerStackIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Masternodes</span>
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-brand-500",
                pathname === "/account/marketplace" && "bg-brand-500 text-white"
              )}
              href="/account/marketplace"
            >
              <GlobeAmericasIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Marketplace</span>
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-brand-500",
                pathname === "/account/messages" && "bg-brand-500 text-white"
              )}
              href="/account/messages"
            >
              <EnvelopeIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link
              className={clsx(
                "flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-brand-500",
                pathname === "/account/settings" && "bg-brand-500 text-white"
              )}
              href="/account/settings"
            >
              <Cog6ToothIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Settings</span>
            </Link>
          </li>
        </nav>
      </aside>
      <main className="flex flex-col flex-1 overflow-hidden">
        <div
          className="border-b border-gray-300"
          style={{ height: "50px" }}
        ></div>
        <div className="flex-1 overflow-auto">
          <Container className="my-4">{children}</Container>
        </div>
      </main>
    </div>
  );
}
