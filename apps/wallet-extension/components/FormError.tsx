import clsx from "clsx";
import { ReactNode } from "react";

export function FormError({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={clsx("text-red-500 text-sm", className)}>{children}</span>
  );
}
