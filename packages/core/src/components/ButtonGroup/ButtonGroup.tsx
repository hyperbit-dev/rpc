import React, { forwardRef } from "react";
import clsx from "clsx";
import { ButtonGroupProps } from "./types";

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, outline, flush, rounded, size, variant, children, ...props },
    ref,
  ) => {
    const renderedChildren = React.Children.toArray(children)
      .filter(Boolean)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((child: any) => {
        if (
          typeof child === "object" &&
          child !== null &&
          child?.type?.displayName?.includes("Button")
        ) {
          return React.cloneElement(child, {
            flush,
            outline,
            rounded,
            size,
            variant,
            className: clsx("relative", className),
          });
        }
        return child;
      });

    return (
      <div
        ref={ref}
        className={clsx(
          "sui--button-group",
          "inline-flex items-center justify-center h-auto",
          { "space-x-2": !flush },
          className,
        )}
        role="group"
        {...props}
      >
        {renderedChildren}
      </div>
    );
  },
);

ButtonGroup.displayName = "SuiButtonGroup";
