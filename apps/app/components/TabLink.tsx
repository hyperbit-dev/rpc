"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabLink({
  href,
  selected = false,
  children,
}: {
  href: string;
  selected?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSelected = selected || pathname.startsWith(href);
  return (
    <Link
      href={href}
      type="button"
      className={clsx(
        "py-3 px-2 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-brand-600 focus:outline-none focus:text-brand-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-brand-500",
        isSelected && "border-brand-600 text-brand-600"
      )}
      aria-selected={isSelected}
      role="tab"
    >
      {children}
    </Link>
  );
}
