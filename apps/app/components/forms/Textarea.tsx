import clsx from "clsx";
import { forwardRef } from "react";

export type TextareaProps = React.HTMLProps<HTMLTextAreaElement> & {
  "data-hs-combo-box-input"?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          "py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
