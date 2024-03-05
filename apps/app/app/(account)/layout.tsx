"use client";
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  GlobeAmericasIcon,
  ServerStackIcon,
  Squares2X2Icon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <aside style={{ backgroundColor: "#1C1D22", minWidth: "175px" }}>
        <header
          className="flex items-center justify-center gap-2 px-4 border-b"
          style={{ borderColor: "#1C1D22", height: "50px" }}
        >
          <Image src="/logo.svg" alt="Logo" width="25" height="25" />
        </header>
        <nav className="flex flex-col gap-1 p-4 text-sm text-gray-300 list-none">
          <li>
            <Link
              className="flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-gray-600/50"
              href="/account"
            >
              <Squares2X2Icon className="w-5 h-5 group-action:stroke-white" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-gray-600/50"
              href="/account/wallets"
            >
              <WalletIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Wallets</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-gray-600/50"
              href="/account/portfolio"
            >
              <ServerStackIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Masternodes</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-gray-600/50"
              href="/"
            >
              <GlobeAmericasIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Marketplace</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-gray-600/50"
              href="/"
            >
              <EnvelopeIcon className="w-5 h-5 group-action:stroke-white" />
              <span>Message</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center block gap-2 p-2 border border-transparent rounded group action:text-white action:outline-none action:bg-gray-600/50"
              href="/"
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
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
