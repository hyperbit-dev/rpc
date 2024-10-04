import { ReactNode } from "react";

export function TableWrapper({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden">{children}</div>;
}
