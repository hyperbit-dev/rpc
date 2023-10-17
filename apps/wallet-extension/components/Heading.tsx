import clsx from "clsx";
import React, { ReactNode } from "react";

export function Heading({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <h1 className={clsx("text-xl font-medium my-4", className)} {...props}>
      {children}
    </h1>
  );
}
