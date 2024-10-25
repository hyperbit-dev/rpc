import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link } from "react-router-dom";

export function NavLinkCard({
  to,
  children,
  className,
  ...props
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center justify-between p-3 leading-tight",
        "action:bg-brand-100 action:text-black",
        "outline-none",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="w-5 h-5" />
    </Link>
  );
}
