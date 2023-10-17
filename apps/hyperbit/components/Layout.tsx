"use client";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { useSession } from "next-auth/react";

export default function Layout({
  children,
  params,
}: {
  children?: ReactNode;
  params: { subdomain: string };
}) {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <>
      <Navbar subdomain={params.subdomain} />
      <main className="relative z-10 flex flex-col flex-1 w-full h-full overflow-auto">
        {children}
      </main>
    </>
  );
}
