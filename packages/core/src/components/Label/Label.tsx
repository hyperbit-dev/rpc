import clsx from "clsx";
import { forwardRef } from "react";
import { LabelProps } from "./types";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = "md", ...props }, ref) => {
    const classes = clsx(
      "sui--label",
      "flex inline-block text-gray-700 mb-2",
      size && [
        { "text-sm": size === "sm" },
        { "text-md": size === "md" },
        { "text-lg": size === "lg" },
      ],
      { "opacity-50 cursor-not-allowed": props.disabled },
      className
    );

    return <label {...props} ref={ref} className={classes} />;
  }
);

Label.displayName = "SuiLabel";
