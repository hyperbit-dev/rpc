import clsx from "clsx";
import { ReactNode } from "react";

export function PageHeader({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h1 className={clsx("mb-4 text-xl font-normal", className)}>{children}</h1>
  );
}
