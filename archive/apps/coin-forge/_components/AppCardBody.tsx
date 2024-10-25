import clsx from "clsx";
import { ReactNode } from "react";

export function AppCardBody({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}
