import { InputProps, LabelProps } from "..";
import { AlignItems, Size } from "../../types";

export type CheckboxProps = Omit<InputProps, "size"> & {
  align?: AlignItems;
  id?: string;
  labelProps?: LabelProps;
  size?: Extract<Size, "md" | "lg">;
  spanProps: React.HTMLAttributes<HTMLSpanElement>;
};
