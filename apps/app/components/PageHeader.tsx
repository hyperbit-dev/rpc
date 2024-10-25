import clsx from "clsx";
import { ReactNode } from "react";

export function PageHeader({
  children,
  className,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <h1 className={clsx("text-3xl mb-2 font-semibold", className)}>
      {children}
    </h1>
  );
}
