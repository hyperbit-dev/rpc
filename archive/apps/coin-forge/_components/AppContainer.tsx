import clsx from "clsx";
import { ReactNode } from "react";

export function AppContainer({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("px-4 w-full max-w-6xl mx-auto", className)}>
      {children}
    </div>
  );
}
