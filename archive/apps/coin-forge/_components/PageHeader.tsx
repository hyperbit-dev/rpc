import clsx from "clsx";
import { ReactNode } from "react";

export function PageHeader({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <h1 className={clsx("text-lg", className)}>{children}</h1>;
}
