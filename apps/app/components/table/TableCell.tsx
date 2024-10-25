import clsx from "clsx";
import { ReactNode } from "react";

export function TableCell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <td
      className={clsx(
        "px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200",
        className,
      )}
    >
      {children}
    </td>
  );
}
