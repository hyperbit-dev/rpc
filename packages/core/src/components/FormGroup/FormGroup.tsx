import clsx from "clsx";
import { forwardRef } from "react";
import { FormGroupProps } from "./types";

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, ...props }, ref) => {
    const classes = clsx("sui--form-group", "mb-4", className);

    return <div {...props} ref={ref} className={classes} />;
  },
);

FormGroup.displayName = "SuiFormGroup";
