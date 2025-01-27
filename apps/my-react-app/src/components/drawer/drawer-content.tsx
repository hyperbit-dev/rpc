import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";
import { DrawerOverlay } from "./drawer-overlay";
import { DrawerPortal } from "./drawer-portal";

export const DrawerContent = forwardRef<
  ElementRef<typeof DrawerPrimitives.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitives.Content>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DrawerPortal>
      <DrawerOverlay>
        <DrawerPrimitives.Content
          ref={forwardedRef}
          className={clsx(
            // base
            "fixed inset-y-2 z-50 mx-auto flex w-[95vw] flex-1 flex-col overflow-y-auto rounded-md border shadow-lg focus:outline-none max-sm:inset-x-2 sm:inset-y-2 sm:right-2 sm:max-w-lg py-4",
            // border color
            "border-secondary-400",
            // background color
            "bg-secondary-600",
            // transition
            "data-[state=closed]:animate-drawerSlideRightAndFade data-[state=open]:animate-drawerSlideLeftAndFade",
            // focusRing,
            className
          )}
          {...props}
        />
      </DrawerOverlay>
    </DrawerPortal>
  );
});

DrawerContent.displayName = "DrawerContent";
