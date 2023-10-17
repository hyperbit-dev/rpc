import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";
import type { InputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      asChild,
      className,
      flush,
      inset,
      invalid,
      rounded = "md",
      size = "md",
      variant = "secondary",
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";
    return (
      // @ts-expect-error children
      <Comp
        {...props}
        ref={ref}
        className={clsx(
          "sui--input",
          "border leading-tight outline-none",
          {'w-full': fullWidth},
          flush
            ? [
                inset && "border-x-0",
                rounded && [
                  "first:ml-0 -ml-px",
                  "rounded-none ",
                  "action:relative",
                  {
                    "first:rounded-l-none last:rounded-r-none":
                      rounded === "none",
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
                    "first:rounded-l-full last:rounded-r-full":
                      rounded === "full",
                  },
                ],
              ]
            : rounded && [
                { "rounded-none": rounded === "none" },
                { "rounded-sm": rounded === "sm" },
                { "rounded-md": rounded === "md" },
                { "rounded-lg": rounded === "lg" },
                { "rounded-xl": rounded === "xl" },
                { "rounded-2xl": rounded === "2xl" },
                { "rounded-3xl": rounded === "3xl" },
                { "rounded-full": rounded === "full" },
              ],
          size && [
            { "py-2 text-sm": size === "sm" },
            { "px-3": size === "sm" && !inset },
            { "py-2.5 text-md": size === "md" },
            { "px-4": size === "md" && !inset },
            { "py-3 text-lg": size === "lg" },
            { "px-6": size === "lg" && !inset },
          ],
          variant !== "custom" && [
            variant === "primary" && [
              "border-brand-500 action:border-brand-700",
              "focus:border-brand-700 group-focus:border-brand-700 group-hover:border-brand-700 group-active:border-brand-700",
              "focus:[&:not(action)]:border-brand-500 hover:[&:not(action)]:border-brand-500 active:[&:not(action)]:border-brand-500",
            ],
            variant === "secondary" && [
              "border-gray-300 action:border-gray-700",
              "focus:border-gray-700 group-focus:border-gray-700 group-hover:border-gray-700 group-active:border-gray-700",
              "focus:[&:not(group-focus)]:border-gray-300 hover:[&:not(group-focus)]:border-gray-300 active:[&:not(group-focus)]:border-gray-300",
            ],
            variant === "success" && [
              "border-sky-500 action:border-sky-700",
              "focus:border-sky-700 group-focus:border-sky-700 group-hover:border-sky-700 group-active:border-sky-700",
              "focus:[&:not(action)]:border-sky-500 hover:[&:not(action)]:border-sky-500 active:[&:not(action)]:border-sky-500",
            ],
            variant === "warning" && [
              "border-yellow-500 action:border-yellow-700",
              "focus:border-yellow-700 group-focus:border-yellow-700 group-hover:border-yellow-700 group-active:border-yellow-700",
              "focus:[&:not(action)]:border-yellow-500 hover:[&:not(action)]:border-yellow-500 active:[&:not(action)]:border-yellow-500",
            ],
            (variant === "danger" || invalid) && [
              "border-red-500 action:border-red-700",
              "focus:border-red-700 group-focus:border-red-700 group-hover:border-red-700 group-active:border-red-700",
              "focus:[&:not(action)]:border-red-500 hover:[&:not(action)]:border-red-500 active:[&:not(action)]:border-red-500",
            ],
            variant === "dark" && [
              "border-black action:border-gray-700",
              "focus:border-gray-700 group-focus:border-gray-700 group-hover:border-gray-700 group-active:border-gray-700",
              "focus:[&:not(action)]:border-black hover:[&:not(action)]:border-black active:[&:not(action)]:border-black",
            ],
            variant === "info" && [
              "border-cyan-500/80 action:border-cyan-700/80",
              "focus:border-cyan-700/80 group-focus:border-cyan-700/80 group-hover:border-cyan-700/80 group-active:border-cyan-700/80",
              "focus:[&:not(action)]:border-cyan-500/80 hover:[&:not(action)]:border-cyan-500/80 active:[&:not(action)]:border-cyan-500/80",
            ],
            variant === "light" && [
              "text-gray-900",
              "border-gray-100 action:border-gray-300",
              "focus:border-gray-300 group-focus:border-gray-300 group-hover:border-gray-300 group-active:border-gray-300",
              "focus:[&:not(action)]:border-gray-300 hover:[&:not(action)]:border-gray-300 active:[&:not(action)]:border-gray-300",
            ],
          ],
          className
        )}
      />
    );
  }
);

Input.displayName = "SuiInput";
