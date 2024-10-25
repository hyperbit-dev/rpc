import clsx from "clsx";
import { forwardRef } from "react";

type FormGroupProps = React.HTMLProps<HTMLDivElement> & {};

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, ...props }, ref) => {
    return <div {...props} ref={ref} className={clsx("mb-4", className)} />;
  },
);

FormGroup.displayName = "FormGroup";
