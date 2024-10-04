"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: ReactNode }) {
  const session = JSON.parse(sessionStorage.getItem("auth") ?? "{}");

  if (!session?.token) {
    return redirect("/auth/login");
  }

  return (
    <>
      <Sidebar />
      <main className="ps-56 bg-gray-50 h-full py-4">{children}</main>
    </>
  );
}
