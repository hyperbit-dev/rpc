import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const to = `/account${href ? `${href}` : ""}`;

  return (
    <Link
      className={clsx(
        "flex items-center gap-x-3 p-2 text-sm rounded-lg text-gray-500 outline-none border border-transparent leading-none",
        "hover:text-brand-600 active:text-brand-600 focus:text-brand-600",
        "hover:bg-brand-100/50 active:bg-brand-100/50 focus:bg-brand-100/50",
        "hover:border-brand-200 active:border-brand-200 focus:border-brand-200",
        pathname === to && "text-brand-600 bg-brand-100/50 border-brand-200"
      )}
      href={to}
    >
      {children}
    </Link>
  );
}
