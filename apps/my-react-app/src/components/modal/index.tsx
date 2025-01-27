import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { useState } from "react";
import { baseModal } from "./styles";
import { ModalContext } from "~/hooks/use-modal";

type ModalProps = {
  Title: React.ReactNode;
  Description?: React.ReactNode;
  Trigger: React.ReactNode;
  Content: React.ReactNode;
  Size?: keyof (typeof baseModal)["variants"]["size"];
};

export function Modal({
  Trigger,
  Title,
  Description,
  Content,
  Size: size = "md",
}: ModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, onOpenChange: setOpen }}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{Trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="z-20 fixed inset-0 bg-gray-700/50 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className={clsx(baseModal({ size }))}>
            <div className="mb-5">
              <Dialog.Title className="m-0 text-[17px] font-medium">
                {Title}
              </Dialog.Title>
              {Description ? (
                <Dialog.Description className="mt-2.5 text-[15px] leading-normal">
                  {Description}
                </Dialog.Description>
              ) : undefined}
            </div>
            {Content}
            <Dialog.Close asChild>
              <button
                className="absolute right-3 top-6 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ModalContext.Provider>
  );
}
