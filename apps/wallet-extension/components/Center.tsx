"use client";

import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";

export function Center({
  className,
  children,
  ...props
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx("flex flex-col items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
