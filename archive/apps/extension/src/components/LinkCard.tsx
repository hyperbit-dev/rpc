import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export function LinkCard({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className={clsx(
        "flex items-center justify-between p-3 leading-tight",
        "action:bg-brand-100 action:text-black",
        "outline-none",
      )}
    >
      {children}
      <ArrowTopRightOnSquareIcon className="w-5 h-5" />
    </a>
  );
}
