import clsx from "clsx";
import { ReactNode } from "react";

export function SectionHeader({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <h2 className={clsx("my-4 text-lg", className)}>{children}</h2>;
}
