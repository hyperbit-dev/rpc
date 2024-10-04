import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="p-4 border border-gray-300 rounded">{children}</div>;
}
