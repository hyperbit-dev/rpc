import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";

export const DrawerDescription = forwardRef<
  ElementRef<typeof DrawerPrimitives.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitives.Description>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPrimitives.Description
      ref={forwardedRef}
      className={clsx("text-gray-100", className)}
      {...props}
    />
  );
});

DrawerDescription.displayName = "DrawerDescription";
