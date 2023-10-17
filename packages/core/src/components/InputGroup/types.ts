import React from "react";
import { BorderRadiusSize, ColorVariant, Size } from "../../types";

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: BorderRadiusSize;
  flush?: boolean;
  inset?: boolean;
  invalid?: boolean;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
};

export type InputGroupAppendProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: BorderRadiusSize;
  flush?: boolean;
  inset?: boolean;
  invalid?: boolean;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
};

export type InputGroupPrependProps = React.HTMLAttributes<HTMLDivElement> & {
  rounded?: BorderRadiusSize;
  flush?: boolean;
  inset?: boolean;
  invalid?: boolean;
  size?: Extract<Size, "sm" | "md" | "lg">;
  variant?: ColorVariant;
};
