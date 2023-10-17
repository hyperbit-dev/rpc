import React, { ReactNode } from "react";

export function Alert({ children }: { children: ReactNode }) {
  return <div className="px-8 py-3 text-sm font-medium bg-yellow-500/50">{children}</div>;
}
