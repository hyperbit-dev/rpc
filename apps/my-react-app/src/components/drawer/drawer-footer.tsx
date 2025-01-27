import clsx from "clsx";
import { HTMLAttributes } from "react";

export const DrawerFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "flex flex-col-reverse pt-4 px-4 sm:flex-row justify-between gap-2",
        className
      )}
      {...props}
    />
  );
};

DrawerFooter.displayName = "DrawerFooter";
