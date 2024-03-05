import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";

export function NextLink({
  children,
  className,
  href,
  ...props
}: {
  children?: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      {...props}
      className={clsx("text-brand-500 hover:brand-700", className)}
    >
      {children}
    </Link>
  );
}
