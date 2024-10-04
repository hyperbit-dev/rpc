import { ReactNode } from "react";

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-gray-50 dark:bg-neutral-700 border-x border-gray-200 dark:border-neutral-700">
      {children}
    </thead>
  );
}
