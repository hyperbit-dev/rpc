import clsx from "clsx";
import React, { ReactNode } from "react";

export function Cell({
  className,
  children,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={clsx("p-2 group-hover:bg-gray-100", className)}>{children}</div>;
}
