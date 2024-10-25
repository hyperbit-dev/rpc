import { forwardRef } from "react";
import clsx from "clsx";
import { InputGroupAppendProps } from "./types";

export const InputGroupAppend = forwardRef<
  HTMLDivElement,
  InputGroupAppendProps
>(
  (
    {
      children,
      className,
      flush,
      inset = false,
      invalid,
      rounded,
      size,
      variant = "secondary",
      ...props
    },
    ref,
  ) => {
    const classes = clsx(
      "sui--input-group_append",
      "border border-solid",
      "self-stretch flex items-center justify-center",
      inset ? "border-r-0" : "bg-gray-100",
      "first:ml-0 -ml-px",
      invalid && "border-red-400",
      size && [
        { "px-3 text-sm": size === "sm" },
        { "px-4 text-md": size === "md" },
        { "px-6 text-lg": size === "lg" },
      ],
      variant !== "custom" && [
        variant === "primary" && [
          "border-brand-500",
          "group-focus:border-brand-700 group-active:border-brand-700 group-hover:border-brand-700",
        ],
        variant === "secondary" && [
          "border-gray-300",
          "group-focus:border-gray-700 group-active:border-gray-700 group-hover:border-gray-700",
        ],
        variant === "success" && [
          "border-sky-500",
          "group-focus:border-sky-700 group-active:border-sky-700 group-hover:border-sky-700",
        ],
        variant === "warning" && [
          "border-yellow-500",
          "group-focus:border-yellow-700 group-active:border-yellow-700 group-hover:border-yellow-700",
        ],
        (variant === "danger" || invalid) && [
          "border-red-500",
          "group-focus:border-red-700 group-active:border-red-700 group-hover:border-red-700",
        ],
        variant === "dark" && [
          "border-gray-500",
          "group-focus:border-gray-700 group-active:border-gray-700 group-hover:border-gray-700",
        ],
        variant === "info" && [
          "border-cyan-500/80",
          "group-focus:border-cyan-700/80 group-active:border-cyan-700/80 group-hover:border-cyan-700/80",
        ],
        variant === "light" && [
          "border-gray-500",
          "group-focus:border-gray-300 group-active:border-gray-300 group-hover:border-gray-300",
        ],
      ],
      !flush
        ? [
            {
              "rounded-none": rounded === "none",
            },
            { "rounded-sm": rounded === "sm" },
            { "rounded-md": rounded === "md" },
            { "rounded-lg": rounded === "lg" },
            { "rounded-xl": rounded === "xl" },
            {
              "rounded-2xl": rounded === "2xl",
            },
            {
              "rounded-3xl": rounded === "3xl",
            },
            {
              "rounded-full": rounded === "full",
            },
          ]
        : [
            {
              "first:rounded-l-none last:rounded-r-none": rounded === "none",
            },
            { "first:rounded-l-sm last:rounded-r-sm": rounded === "sm" },
            { "first:rounded-l-md last:rounded-r-md": rounded === "md" },
            { "first:rounded-l-lg last:rounded-r-lg": rounded === "lg" },
            { "first:rounded-l-xl last:rounded-r-xl": rounded === "xl" },
            {
              "first:rounded-l-2xl last:rounded-r-2xl": rounded === "2xl",
            },
            {
              "first:rounded-l-3xl last:rounded-r-3xl": rounded === "3xl",
            },
            {
              "first:rounded-l-full last:rounded-r-full": rounded === "full",
            },
          ],
      className,
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  },
);

InputGroupAppend.displayName = "SuiInputGroupAppend";
