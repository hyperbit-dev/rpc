import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";

export function NextLink({
  className,
  children,
  href,
  ...props
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-brand-500 hover:text-brand-600 focus:text-brand-600 active:text-brand-600",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
