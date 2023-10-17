import clsx from "clsx";
import { ReactNode, forwardRef } from "react";

type LabelProps = {
  className?: string;
  children?: ReactNode;
  htmlFor?: string;
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <label className={clsx("mb-1 inline-block", className)} {...props} ref={ref}>
      {children}
    </label>
  )
);

Label.displayName = "Label";
