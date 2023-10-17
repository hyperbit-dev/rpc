import React from "react";
import {
  BorderRadiusSize,
  ColorVariant,
  JustifyItems,
  Size,
} from "../../types";

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  justify?: JustifyItems;
  onDismiss?: () => void;
  rounded?: BorderRadiusSize;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
  width?: Size;
};
