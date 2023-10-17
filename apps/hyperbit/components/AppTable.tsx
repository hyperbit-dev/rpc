import clsx from "clsx";
import { ReactNode } from "react";

export function AppTable({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <table className={clsx("w-full", className)}>{children}</table>;
}
