import clsx from "clsx";
import { forwardRef } from "react";

export type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  Variant?: "brand" | "secondary" | "outline";
  Width?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = "submit", Variant = "brand", Width, className, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type as "button" | "reset" | "submit"}
        className={clsx(
          "py-2 px-3 inline-flex items-center gap-x-2 transition duration-200",
          "text-sm font-medium rounded-lg border",
          `focus:outline-none disabled:opacity-50 disabled:pointer-events-none justify-center`,
          Variant && [
            Variant === "brand" &&
              "text-white bg-brand-500 border-brand-500 hover:border-brand-600 hover:bg-brand-600 focus:bg-brand-600",
            Variant === "secondary" &&
              "text-white bg-secondary-500 border-secondary-500 hover:border-secondary-900 hover:bg-secondary-900 focus:bg-secondary-900",
            Variant === "outline" &&
              "border-gray-300 text-gray-500 hover:border-brand-600 hover:text-brand-600 focus:outline-none focus:border-brand-600 focus:text-brand-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-brand-500 dark:hover:border-brand-600 dark:focus:text-brand-500 dark:focus:border-brand-600",
          ],
          Width && `w-${Width}`,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
