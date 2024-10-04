"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalFuncType {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

const ModalFunc = createContext<ModalFuncType | undefined>(undefined);

export const ModalWrapper = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <ModalFunc.Provider value={{ isOpen, handleOpen, handleClose }}>
      {children}
    </ModalFunc.Provider>
  );
};

export const useModal: () => ModalFuncType = () => {
  const context = useContext(ModalFunc);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalWrapper");
  }
  return context;
};
