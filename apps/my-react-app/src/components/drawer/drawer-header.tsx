import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as DrawerPrimitives from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../button";

export const DrawerHeader = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="flex items-start justify-between gap-x-4 border-b border-gray-900 pb-4 px-4"
      {...props}
    >
      <div className={clsx("mt-1 flex flex-col gap-y-1", className)}>
        {children}
      </div>
      <DrawerPrimitives.Close asChild>
        <Button Variant="dark">
          <Cross1Icon />
        </Button>
      </DrawerPrimitives.Close>
    </div>
  );
});

DrawerHeader.displayName = "Drawer.Header";
