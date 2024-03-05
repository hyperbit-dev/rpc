import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";
import type { ButtonProps } from "./types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      flush = false,
      outline = false,
      rounded = "md",
      size = "md",
      variant = "primary",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        {...props}
        className={clsx(
          "sui--button",
          "border duration-300 ease leading-tight cursor-pointer",
          { "w-full": fullWidth },
          flush
            ? [
                rounded && [
                  "first:ml-0 -ml-px",
                  "rounded-none",
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
            { "px-3 py-2 text-sm": size === "sm" },
            { "px-4 py-2.5 text-md": size === "md" },
            { "px-6 py-3 text-lg": size === "lg" },
          ],
          { "opacity-50": props.disabled },
          variant !== "custom" && [
            variant === "primary" && [
              outline
                ? ["text-brand-500 action:text-white"]
                : ["text-white bg-brand-500"],
              "border-brand-500 action:border-brand-700 action:bg-brand-700",
            ],
            variant === "secondary" && [
              outline
                ? ["text-gray-500 action:text-white"]
                : ["text-white bg-gray-500"],
              "border-gray-500 action:border-gray-700 action:bg-gray-700",
            ],
            variant === "success" && [
              outline
                ? ["text-sky-500 action:text-white"]
                : ["text-white bg-sky-500"],
              "border-sky-500 action:border-sky-700 action:bg-sky-700",
            ],
            variant === "warning" && [
              outline
                ? ["text-yellow-500 action:text-white"]
                : ["text-white bg-yellow-500"],
              "border-yellow-500 action:border-yellow-700 action:bg-yellow-700",
            ],
            variant === "danger" && [
              outline
                ? ["text-red-500 action:text-white"]
                : ["text-white bg-red-500"],
              "border-red-500 action:border-red-700 action:bg-red-700",
            ],
            variant === "dark" && [
              outline
                ? ["text-black-500 action:text-white"]
                : ["bg-gray-800", "text-white"],
              "action:bg-black",
              "border-gray-800 action:border-black",
            ],
            variant === "info" && [
              outline
                ? ["text-cyan-500/80 action:text-white"]
                : ["text-white bg-cyan-500/80"],
              "border-cyan-500/80 action:border-cyan-700/80 action:bg-cyan-700/80",
            ],
            variant === "light" && [
              outline
                ? ["text-gray-500 action:text-gray-700"]
                : ["border-gray-100 bg-gray-100"],
              "border-gray-300 action:bg-gray-300",
            ],
          ],
          className
        )}
        ref={ref}
      />
    );
  }
);

Button.displayName = "SuiButton";
