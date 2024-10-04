import clsx from "clsx";
import { ReactNode } from "react";

export function CardHeading({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h3
      className={clsx(
        "text-md font-medium text-gray-700 leading-none m-0",
        className
      )}
    >
      {children}
    </h3>
  );
}
