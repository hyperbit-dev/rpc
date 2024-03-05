import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { authOptions } from "@/app/(website)/api/auth/[...nextauth]/options";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <nav className="relative flex flex-wrap items-center w-full px-2 py-3 mb-3 bg-gray-800">
        <div className="flex flex-wrap items-center justify-between flex-1 px-4">
          <div className="relative flex justify-between flex-1 sm:w-auto sm:static sm:block sm:justify-start">
            <Link
              className="inline-block mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-nowrap"
              href="/"
            >
              <div className="flex flex-row items-center gap-2">
                <Image src="/logo.svg" width={40} height={40} alt="logo" />
                <span className="text-lg font-bold leading-none uppercase">
                  Coin<br/>Forge
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center flex-grow sm:flex">
            <ul className="flex flex-row gap-2 list-none sm:ml-auto">
              <li>
                <Link
                  className="flex items-center px-3 py-2 text-xs font-medium leading-snug text-white uppercase"
                  href="/wallets"
                >
                  {session ? "Dashboard" : "Login"}
                </Link>
              </li>
              {session ? (
                <li>
                  <Link
                    className="flex items-center px-3 py-2 text-xs font-medium leading-snug text-white uppercase"
                    href="/api/auth/signout"
                  >
                    Logout
                  </Link>
                </li>
              ) : undefined}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
