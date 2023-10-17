import clsx from "clsx";
import React, { ReactNode } from "react";

export function SectionCard({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "p-4 text-sm bg-white border border-gray-200 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}
