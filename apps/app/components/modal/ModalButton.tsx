"use client";

import { Button, ButtonProps } from "../base";
import { useModal } from "./ModalContext";

type ModalButtonProps = Omit<ButtonProps, "type" | "onClick">;

export const ModalButton = ({ ...props }: ModalButtonProps) => {
  const { handleOpen, isOpen } = useModal();

  return (
    <Button
      {...props}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      onClick={handleOpen}
    />
  );
};
