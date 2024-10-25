import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";
import { FormFeedbackProps } from "./types";

export const FormFeedback = forwardRef<HTMLSpanElement, FormFeedbackProps>(
  ({ asChild = false, className, valid = false, ...props }, ref) => {
    const classes = clsx(
      "sui--form-feedback leading-tight text-sm",
      valid ? "text-green-500" : "text-red-500",
      className,
    );
    const Comp = asChild ? Slot : "span";

    return <Comp {...props} ref={ref} className={classes} />;
  },
);

FormFeedback.displayName = "SuiFormFeedback";
