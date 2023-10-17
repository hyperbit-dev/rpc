import { forwardRef } from "react";
import { Input } from "..";
import { ToggleProps } from ".";
import clsx from "clsx";

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ children, size = "md", variant = "primary", ...props }, ref) => {
    const divClasses = clsx(
      size && [
        { "w-11 h-6 after:h-5 after:w-5": size === "md" },
        {
          "w-14 h-8 after:h-7 after:w-7 peer-checked:after:-ml-[4px]":
            size === "lg",
        },
      ],
      variant !== "custom" && [
        {
          "peer-focus:ring-brand-300 dark:peer-focus:ring-brand-400 peer-checked:bg-brand-500":
            variant === "primary",
        },
        {
          "peer-focus:ring-gray-300 dark:peer-focus:ring-gray-400 peer-checked:bg-gray-500":
            variant === "secondary",
        },
        {
          "peer-focus:ring-sky-300 dark:peer-focus:ring-sky-400 peer-checked:bg-sky-500":
            variant === "success",
        },
        {
          "peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-400 peer-checked:bg-yellow-500":
            variant === "warning",
        },
        {
          "peer-focus:ring-red-300 dark:peer-focus:ring-red-400 peer-checked:bg-red-500":
            variant === "danger",
        },
        {
          "peer-focus:ring-cyan-300/80 dark:peer-focus:ring-cyan-400/80 peer-checked:bg-cyan-500/80":
            variant === "info",
        },
      ],
      "after:top-[1.5px] after:left-[1.5px]",
      "peer-checked:after:translate-x-full",
      "rounded-full peer bg-gray-200",
      "peer-focus:outline-none peer-focus:ring-4 ",
      "dark:bg-gray-700",
      "peer-checked:after:border-white after:content-[''] after:absolute",
      "after:bg-white after:border-gray-300 after:border after:rounded-full",
      "after:transition-all dark:border-gray-600"
    );

    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <Input {...props} ref={ref} type="checkbox" className="sr-only peer" />
        <div className={divClasses}></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {children}
        </span>
      </label>
    );
  }
);
