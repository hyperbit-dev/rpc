import React from "react";
import { BorderRadiusSize, ColorVariant, Size } from "../../types";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  flush?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
  rounded?: BorderRadiusSize;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
};
