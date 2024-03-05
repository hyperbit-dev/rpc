import clsx from "clsx";
import { ReactNode } from "react";

export function PageHeader({
  children,
  className,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <h1 className={clsx("text-xl font-medium", className)}>{children}</h1>;
}
