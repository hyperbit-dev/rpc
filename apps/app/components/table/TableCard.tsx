import { ReactNode } from "react";

export function TableCard({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white divide-y divide-gray-200 dark:divide-neutral-700">
      {children}
    </div>
  );
}
