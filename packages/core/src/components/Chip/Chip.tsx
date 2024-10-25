import clsx from "clsx";
import { forwardRef } from "react";
import { ChipProps } from "./types";

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      color = "white",
      shade = 500,
      size = "md",
      rounded = "md",
      bg = "gray",
      ...props
    },
    ref,
  ) => {
    const classes = clsx(
      "sui--chip leading-tight inline-block",
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
      size && [
        { "px-1.5 py-1 text-xs": size === "sm" },
        { "px-2 py-1 text-sm": size === "md" },
        { "px-2.5 py-1.5 text-md": size === "lg" },
      ],
      color && color === "white"
        ? "text-white"
        : color === "black"
          ? "text-black"
          : `text-${color}-900`,
      bg && [
        { "bg-black": bg === "black" },
        { "bg-white": bg === "white" },
        { [`bg-${bg}-${shade}`]: bg !== "black" && bg !== "white" },
      ],
      className,
    );

    return <div {...props} ref={ref} className={classes} />;
  },
);

Chip.displayName = "SuiChip";
