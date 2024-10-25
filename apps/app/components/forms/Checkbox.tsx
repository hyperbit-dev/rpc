import clsx from "clsx";
import { forwardRef, useId } from "react";
import { Label } from "./Label";

type CheckboxProps = React.HTMLProps<HTMLDivElement> & {};

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, children, ...props }, ref) => {
    const id = useId();

    return (
      <div ref={ref} className="flex" {...props}>
        <input
          type="checkbox"
          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
          id={id}
        />
        <label
          htmlFor={id}
          className="text-sm ms-3 dark:text-neutral-400 cursor-pointer select-none"
        >
          {children}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
