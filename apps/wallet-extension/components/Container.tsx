"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx("w-full px-4 mx-auto max-w-xl", className)}>
      {children}
    </div>
  );
}
