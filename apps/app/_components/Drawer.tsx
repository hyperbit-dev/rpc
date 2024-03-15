"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@hyperbitui/react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Drawer = DialogPrimitive.Root;

const DrawerTrigger = DialogPrimitive.Trigger;

const DrawerPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps & {
  className?: string;
}) => (
  // @ts-ignore
  <DialogPrimitive.Portal className={clsx(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:justify-end">
      {children}
    </div>
  </DialogPrimitive.Portal>
);

DrawerPortal.displayName = DialogPrimitive.Portal.displayName;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={clsx("fixed inset-0 z-50", className)}
    {...props}
    ref={ref}
  />
));

DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    open: boolean;
    Title: React.ReactNode;
    Footer: React.ReactNode;
    FormProps?: React.FormHTMLAttributes<HTMLFormElement>;
  }
>(({ Title, Footer, FormProps, className, children, open, ...props }, ref) => {
  //   const isMobile = useMediaQuery('(max-width: 640px)');
  const isMobile = false;
  return (
    <AnimatePresence>
      {open ? (
        <DrawerPortal forceMount>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DrawerOverlay className="bg-black/50" />
          </motion.div>
          <DialogPrimitive.Content asChild ref={ref} {...props}>
            {/* @ts-ignore */}
            <motion.form
              initial={isMobile ? { y: "100%" } : { x: "100%" }}
              animate={isMobile ? { y: 0 } : { x: 0 }}
              exit={isMobile ? { y: "100%" } : { x: "100%" }}
              transition={{ ease: "linear", duration: 0.15 }}
              className={clsx(
                "fixed z-50 mx-4 flex max-h-[80vh] w-full flex-col overflow-y-auto rounded-t-xl bg-white",
                "sm:max-h-none sm:mr-0 sm:h-screen sm:max-w-lg sm:rounded-none sm:shadow-lg",
                className
              )}
              {...FormProps}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-300 select-none">
                {Title}
                <DialogPrimitive.Close asChild>
                  <button
                    type="button"
                    className="action:outline-brand-500 action:bg-brand-50/50 action:text-brand-700"
                  >
                    <XMarkIcon className="block w-5 h-5" />
                  </button>
                </DialogPrimitive.Close>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">{children}</div>
              <div className="p-4 border-t border-gray-300">{Footer}</div>
            </motion.form>
          </DialogPrimitive.Content>
        </DrawerPortal>
      ) : null}
    </AnimatePresence>
  );
});
DrawerContent.displayName = DialogPrimitive.Content.displayName;

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("text-md", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx("hidden text-lg font-semibold", className)}
    {...props}
  />
));

DrawerTitle.displayName = DialogPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={clsx("text-md", className)}
    {...props}
  />
));

DrawerDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
};
