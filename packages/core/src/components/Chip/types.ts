import React from "react";
import { BorderRadiusSize, Size } from "../../types";

export type ChipProps = React.HTMLAttributes<HTMLDivElement> & {
  bg?: string;
  color?: string;
  shade?:
    | "50"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | string
    | number;
  size?: Extract<Size, "sm" | "md" | "lg">;
  rounded?: BorderRadiusSize;
};
