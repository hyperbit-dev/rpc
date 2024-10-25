import clsx from "clsx";
import React, { forwardRef } from "react";
import { InputGroupProps } from "./types";

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      children,
      className,
      flush = true,
      inset = false,
      invalid,
      rounded = "md",
      size = "md",
      variant = "secondary",
      ...props
    },
    ref,
  ) => {
    const classes = clsx(
      "sui--input-group group",
      "inline-flex items-stretch justify-center h-auto",
      !flush && "gap-2",
      className,
    );

    const renderedChildren = React.Children.toArray(children)
      .filter(Boolean)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((child: any) => {
        if (
          typeof child === "object" &&
          child !== null &&
          child?.type?.displayName?.includes("SuiInput")
        ) {
          return React.cloneElement(child, {
            className: clsx("relative", className),
            flush,
            inset,
            invalid,
            rounded,
            size,
            variant,
          });
        }
        if (
          typeof child === "object" &&
          child !== null &&
          (child?.type?.displayName?.includes("SuiButton") ||
            child?.type?.displayName?.includes("SuiButtonGroup"))
        ) {
          return React.cloneElement(child, {
            className: clsx("relative", className),
            flush,
            invalid,
            rounded,
            size,
          });
        }
        if (
          typeof child === "object" &&
          child !== null &&
          (child?.type?.displayName?.includes("SuiInputGroupPrepend") ||
            child?.type?.displayName?.includes("SuiInputGroupAppend"))
        ) {
          return React.cloneElement(child, {
            className: clsx("relative", className),
            flush,
            invalid,
            rounded,
            size,
            variant,
          });
        }
        return child;
      });

    return (
      <div ref={ref} className={classes} {...props}>
        {renderedChildren}
      </div>
    );
  },
);

InputGroup.displayName = "SuiInputGroup";
