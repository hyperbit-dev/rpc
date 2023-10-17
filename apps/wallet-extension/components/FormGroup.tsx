import clsx from "clsx";
import React, { ReactNode } from "react";

export function FormGroup({
  children,
  className,
  ...props
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx("flex flex-col items-start w-full mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
