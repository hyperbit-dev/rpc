import React from "react";
import { BorderRadiusSize, ColorVariant, Size } from "../../types";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputBaseProps;

export type InputBaseProps = {
  asChild?: boolean;
  flush?: boolean;
  inset?: boolean;
  invalid?: boolean;
  rounded?: BorderRadiusSize;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
  fullWidth?: boolean;
  autoComplete?: boolean;
};
