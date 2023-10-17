import React from "react";
import { BorderRadiusSize, ColorVariant, Size } from "../../types";

export type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  flush?: boolean;
  outline?: boolean;
  rounded?: BorderRadiusSize;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
};
