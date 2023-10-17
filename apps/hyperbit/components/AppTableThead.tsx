import clsx from "clsx";
import { ReactNode } from "react";

export function AppTableThead({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <thead
      className={clsx("border-t border-b border-gray-200", className)}
      {...props}
    >
      {children}
    </thead>
  );
}
