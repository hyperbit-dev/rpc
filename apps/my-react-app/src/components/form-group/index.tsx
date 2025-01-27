import clsx from "clsx";
import { forwardRef } from "react";
import { baseFormGroup } from "./styles";

type FormGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  Justify?: keyof (typeof baseFormGroup)["variants"]["justify"];
};

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, Justify: justify = "col", ...props }, ref) => {
    return (
      <div
        className={clsx(baseFormGroup({ justify }), className)}
        {...props}
        ref={ref}
      />
    );
  }
);
