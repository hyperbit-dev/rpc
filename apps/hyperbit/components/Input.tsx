import clsx from "clsx";
import { forwardRef } from "react";

type InputProps = {
  className?: string;
  name?: string;
  type?: string;
  required?: boolean;
  Error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, Error, ...props }, ref) => (
    <input
      className={clsx(
        "border border-gray-200 p-2 rounded text-sm",
        { "w-full": props.type !== "checkbox" },
        { "border-red-500": Error },
        className
      )}
      {...props}
      ref={ref}
    />
  )
);

Input.displayName = "Input";
