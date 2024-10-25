import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl mb-4 p-4 bg-white dark:bg-secondary-500 border border-gray-200">
      {children}
    </div>
  );
}
