import clsx from "clsx";
import { ReactNode } from "react";
import { AppCardHeader } from "./AppCardHeader";
import { AppCardBody } from "./AppCardBody";

export function AppCard({
  className,
  Header,
  Content,
}: {
  className?: string;
  Header?: ReactNode;
  Content?: ReactNode;
}) {
  return (
    <div
      className={clsx("bg-white border border-gray-300 rounded-lg", className)}
    >
      {Header ? <AppCardHeader>{Header}</AppCardHeader> : undefined}
      {Content ? <AppCardBody>{Content}</AppCardBody> : undefined}
    </div>
  );
}
