import clsx from "clsx";
import { forwardRef, useId } from "react";

export type RadioGroupProps = React.InputHTMLAttributes<HTMLInputElement> & {
  Options: {
    label: string;
    value: string;
  }[];
};

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ Options = [], ...props }, ref) => {
    return (
      <ul className="grid w-full grid-cols-2">
        {Options.map((option) => {
          const id = useId();
          return (
            <li key={option.value} className="group">
              <input
                {...props}
                type="radio"
                id={id}
                value={option.value}
                className="hidden peer"
                ref={ref}
              />
              <label
                htmlFor={id}
                className={clsx(
                  "inline-flex items-center justify-center w-full px-4 py-2 group-first:rounded-l-lg group-last:rounded-r-lg cursor-pointer",
                  "border border-secondary-400",
                  "text-gray-100 bg-secondary-500 hover:bg-gray-700",
                  "peer-checked:bg-brand-600 peer-checked:border-brand-600 dark:peer-checked:bg-brand-600 peer-checked:text-gray-100"
                )}
              >
                {option.label}
              </label>
            </li>
          );
        })}
      </ul>
    );
  }
);
