import clsx from "clsx";
import { ReactNode } from "react";

export function AppContent({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col flex-1 h-full", className)}>
      {children}
    </div>
  );
}
