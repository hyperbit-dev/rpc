import React from "react";
import { ColorVariant, Size } from "../../types";

export type ToggleProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
  invalid?: boolean;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
};
