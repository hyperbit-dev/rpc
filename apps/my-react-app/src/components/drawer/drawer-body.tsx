import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const DrawerBody = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "flex-1 p-4",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-track]:bg-secondary-300",
        "[&::-webkit-scrollbar-thumb]:bg-secondary-400",
        className
      )}
      {...props}
    />
  );
});
DrawerBody.displayName = "Drawer.Body";
