"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode, useState } from "react";

export function Dialog({
  children,
  Trigger,
  Title,
  MaxHeight,
}: {
  children: ReactNode;
  Trigger: ReactNode;
  Title: ReactNode;
  MaxHeight?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild>{Trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-40 bg-gray-900/50" />
        <RadixDialog.Content
          className="fixed inset-0 z-50 flex flex-col h-full max-w-lg m-auto bg-white border border-gray-300 rounded-lg"
          style={{ maxHeight: MaxHeight ?? "500px" }}
        >
          <RadixDialog.Title className="flex items-center justify-between p-4 border-b border-gray-300">
            {Title}
            <RadixDialog.Close asChild>
              <button
                className="action:text-brand-500 action:outline-brand-500"
                aria-label="Close"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </RadixDialog.Close>
          </RadixDialog.Title>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
