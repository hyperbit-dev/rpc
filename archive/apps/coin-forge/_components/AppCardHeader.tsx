import clsx from "clsx";
import { ReactNode } from "react";

export function AppCardHeader({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "text-lg leading-none p-4 border-b border-gray-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
