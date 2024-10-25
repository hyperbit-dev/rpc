import clsx from "clsx";
import { forwardRef, useId } from "react";
import { CheckboxProps } from "./types";
import { Input, Label } from "..";

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      align = "start",
      children,
      disabled,
      id,
      invalid,
      labelProps,
      rounded = "md",
      size = "md",
      spanProps,
      variant = "primary",
      ...props
    },
    ref,
  ) => {
    const checkboxId = useId();

    const labelClasses = clsx(
      "sui--checkbox-label inline-flex gap-1.5 group/checkbox cursor-pointer",
      { [`items-${align}`]: align },
      labelProps?.className,
    );

    const inputClasses = clsx(
      "sui--checkbox-input form-checkbox",
      "outline-none focus:ring-1.5 hover:ring-0",
      variant !== "custom" && [
        variant === "primary" && [
          "checked:bg-brand-500 action:checked:bg-brand-500 group-action:checked:bg-brand-500",
          "ring-brand-500 focus:ring-brand-500",
        ],
        variant === "secondary" && [
          "checked:bg-gray-500 action:checked:bg-gray-500 group-action:checked:bg-gray-500",
          "ring-gray-500 focus:ring-gray-500",
        ],
        variant === "success" && [
          "checked:bg-sky-500 action:checked:bg-sky-500 group-action:checked:bg-sky-500",
          "ring-sky-500 focus:ring-sky-500",
        ],
        variant === "warning" && [
          "checked:bg-yellow-500 action:checked:bg-yellow-500 group-action:checked:bg-yellow-500",
          "ring-yellow-500 focus:ring-yellow-500",
        ],
        variant === "danger" && [
          "checked:bg-red-500 action:checked:bg-red-500 group-action:checked:bg-red-500",
          "ring-red-500 focus:ring-red-500",
        ],
        variant === "dark" && [
          "checked:bg-gray-800 action:checked:bg-gray-800 group-action:checked:bg-gray-800",
          "ring-gray-800 focus:ring-gray-800",
        ],
        variant === "info" && [
          "checked:bg-cyan-500/80 action:checked:bg-cyan-500/80 group-action:checked:bg-cyan-500/80",
          "ring-cyan-500/80 focus:ring-cyan-500/80",
        ],
        variant === "light" && [
          "checked:bg-gray-300 action:checked:bg-gray-300 group-action:checked:bg-gray-300",
          "ring-gray-300 focus:ring-gray-300",
        ],
      ],
      "px-[.5em] py-[.5em] ",
      size && [
        { "w-4 h-4 max-w-4 max-h-4 text-md": size === "md" },
        { "w-6 h-6 max-w-6 max-h-6 text-lg": size === "lg" },
      ],
      {
        "border-red-500": invalid,
      },
      rounded && [
        { "rounded-none": rounded === "none" },
        { "rounded-sm": rounded === "sm" },
        { "rounded-md": rounded === "md" },
        { "rounded-lg": rounded === "lg" },
        { "rounded-xl": rounded === "xl" },
        { "rounded-2xl": rounded === "2xl" },
        { "rounded-3xl": rounded === "3xl" },
        { "rounded-full": rounded === "full" },
      ],
    );

    const spanClasses = clsx(
      "sui--checkbox-span select-none leading-none",
      { "cursor-not-allowed": disabled },
      { "text-lg": size === "lg" },
      { "text-md": size === "md" },
    );

    return (
      <Label
        ref={ref}
        {...labelProps}
        className={labelClasses}
        disabled={disabled}
        htmlFor={id ?? checkboxId}
      >
        <Input
          {...props}
          className={inputClasses}
          id={id ?? checkboxId}
          type="checkbox"
          fullWidth={false}
        />
        <span className={spanClasses} {...spanProps}>
          {children}
        </span>
      </Label>
    );
  },
);

Checkbox.displayName = "SuiCheckbox";
