import clsx from "clsx";
import { forwardRef } from "react";

export type FormFeedbackProps = React.HTMLAttributes<HTMLSpanElement> & {
  asChild?: boolean;
  valid?: boolean;
};

export const FormFeedback = forwardRef<HTMLSpanElement, FormFeedbackProps>(
  ({ asChild = false, className, valid = false, ...props }, ref) => {
    const classes = clsx(
      "leading-tight text-sm",
      valid ? "text-green-500" : "text-red-500",
      className,
    );

    return <span {...props} ref={ref} className={classes} />;
  },
);

FormFeedback.displayName = "SuiFormFeedback";
