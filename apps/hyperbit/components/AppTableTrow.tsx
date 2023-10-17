import clsx from "clsx";
import { ReactNode } from "react";

export function AppTableTrow({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <tr className={clsx("flex w-[fit-content]", className)} {...props}>
      {children}
    </tr>
  );
}
