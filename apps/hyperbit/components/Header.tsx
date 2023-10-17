import clsx from "clsx";
import React, { ReactNode } from "react";

export function Header({
  className,
  children,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={clsx("p-2 font-semibold", className)}>{children}</div>;
}
