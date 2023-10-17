import clsx from "clsx";
import { forwardRef } from "react";
import { FormProps } from "./types";

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    const classes = clsx("sui--form", className);

    return <form {...props} ref={ref} className={classes} />;
  }
);

Form.displayName = "SuiForm";
