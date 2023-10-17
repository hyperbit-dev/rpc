import clsx from "clsx";
import { ReactNode } from "react";

export function AppTableTbody({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <tbody className={clsx(className)} {...props}>
      {children}
    </tbody>
  );
}
