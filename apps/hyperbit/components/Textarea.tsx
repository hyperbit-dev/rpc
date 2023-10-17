import clsx from "clsx";
import { forwardRef } from "react";

type TextareaProps = {
  className?: string;
  Error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, Error, ...props }, ref) => (
    <textarea
      className={clsx(
        "border border-gray-200 p-2 w-full rounded text-sm",
        { "border-red-500": Error },
        className
      )}
      {...props}
      ref={ref}
    />
  )
);

Textarea.displayName = "Textarea";
