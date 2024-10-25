import clsx from "clsx";
import { ReactNode } from "react";

export function AppHeader({
  border,
  children,
  className,
}: {
  border?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "px-4 py-2 sticky top-0",
        { "border-b border-gray-700": border },
        className,
      )}
    >
      {children}
    </div>
  );
}
