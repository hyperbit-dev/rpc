import clsx from "clsx";
import { ReactNode } from "react";

export function AppTableDef({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <td className={clsx("p-2", className)} {...props}>
      {children}
    </td>
  );
}
