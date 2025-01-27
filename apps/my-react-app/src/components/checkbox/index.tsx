import { forwardRef, useId } from "react";
import { Label } from "../label";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  Error?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, children, Error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex items-center gap-2">
        <input
          {...props}
          id={id}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          ref={ref}
        />
        <Label htmlFor={id} className="mb-0 select-none" Spacing="none">
          {children}
        </Label>
      </div>
    );
  }
);
