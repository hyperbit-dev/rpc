import { ReactNode } from "react";

export function CardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-between mb-4">
      {children}
    </div>
  );
}
