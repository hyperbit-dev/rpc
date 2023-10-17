import React from "react";
import { Size } from "../../types";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  disabled?: boolean;
  size?: Extract<Size, "sm" | "md" | "lg">;
};
