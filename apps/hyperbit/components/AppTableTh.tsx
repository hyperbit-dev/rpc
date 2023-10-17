import clsx from "clsx";
import { ReactNode } from "react";

export function AppTableTh({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <th
      className={clsx("p-2 text-sm font-normal text-left", className)}
      {...props}
    >
      {children}
    </th>
  );
}
