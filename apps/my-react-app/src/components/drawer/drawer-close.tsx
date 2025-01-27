import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";

export const DrawerClose = forwardRef<
  ElementRef<typeof DrawerPrimitives.Close>,
  ComponentPropsWithoutRef<typeof DrawerPrimitives.Close>
>(({ className, ...props }, ref) => {
  return (
    <DrawerPrimitives.Close ref={ref} className={clsx(className)} {...props} />
  );
});
DrawerClose.displayName = "Drawer.Close";
