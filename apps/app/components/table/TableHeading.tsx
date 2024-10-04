import { ReactNode } from "react";

export function TableHeading({ children }: { children: ReactNode }) {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
    >
      {children}
    </th>
  );
}
