import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-5 overflow-auto">{children}</main>
    </div>
  );
}
