"use client";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { AppSidebar } from "@/components/AppSidebar";

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
    <div className="flex flex-row h-full overflow-hidden bg-white">
      <AppSidebar />
      <main className="flex flex-col flex-1 w-full h-full overflow-auto">
        {children}
      </main>
    </div>
  );
}
