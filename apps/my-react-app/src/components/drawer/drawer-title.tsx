import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";

export const DrawerTitle = forwardRef<
  ElementRef<typeof DrawerPrimitives.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitives.Title>
>(({ className, ...props }, forwardedRef) => (
  <DrawerPrimitives.Title
    ref={forwardedRef}
    className={clsx(
      // base
      "text-base font-semibold",
      // text color
      "text-gray-100",
      className
    )}
    {...props}
  />
));

DrawerTitle.displayName = "DrawerTitle";
