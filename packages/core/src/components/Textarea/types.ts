import React from "react";
import { InputBaseProps } from "..";

export type TextareaProps = React.HTMLAttributes<HTMLTextAreaElement> &
  InputBaseProps & {
    children?: React.ReactNode;
    rows?: number;
    placeholder?: string;
  };
