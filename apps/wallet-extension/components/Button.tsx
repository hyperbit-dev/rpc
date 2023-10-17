import {
  Button as NextUiButton,
  ButtonProps as NextUiButtonProps,
} from "@slipstreamui/react";
import clsx from "clsx";

export type ButtonProps = Omit<NextUiButtonProps, "color"> & {
  className?: string;
  color?: NextUiButtonProps["color"] | "brand" | "secondary";
};

export function Button({ className, color, ...props }: ButtonProps) {
  return (
    <NextUiButton
      {...props}
      color={color === "brand" ? "primary" : color}
      className={clsx(
        {
          "bg-brand-500 text-white action:bg-brand-600 border border-brand-500 action:border-brand-600":
            color === "brand",
        },
        {
          "text-gray-900 action:text-white action:bg-brand-600 border border-gray-400 action:border-brand-600":
            color === "secondary",
        },
        className
      )}
    />
  );
}
