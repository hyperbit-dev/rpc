"use client";

import { createPortal } from "react-dom";
import { useModal } from "./ModalContext";
import { ReactNode } from "react";
import { Button } from "../base";

type ModalProps = {
  Title: ReactNode;
  children: ReactNode;
};

export const Modal = ({ Title, children }: ModalProps) => {
  const { isOpen, handleClose } = useModal();

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
      >
        <div className="mt-7 opacity-100 duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-xl sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4">
              <h3 className="font-medium mb-0 text-gray-800 dark:text-white">
                {Title}
              </h3>
              <button
                type="button"
                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                onClick={() => handleClose()}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 dark:bg-neutral-900 z-[79]"></div>
    </>,
    document.body,
  );
};

export default Modal;
