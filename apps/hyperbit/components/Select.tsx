import clsx from "clsx";
import { forwardRef } from "react";

type SelectProps = {
  className?: string;
  Error?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, Error, ...props }, ref) => (
    <select
      className={clsx(
        "border border-gray-200 p-2 w-full rounded",
        { "border-red-500": Error },
        className
      )}
      {...props}
      ref={ref}
    />
  )
);

Select.displayName = "Select";
