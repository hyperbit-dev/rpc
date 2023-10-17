import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import { forwardRef } from "react";
import { FormFeedbackProps } from "./types";

export const FormFeedback = forwardRef<HTMLSpanElement, FormFeedbackProps>(
  ({ asChild = false, className, valid = false, ...props }, ref) => {
    const classes = clsx(
      "sui--form-feedback leading-tight",
      valid ? "text-green-500" : "text-red-500",
      className
    );
    const Comp = asChild ? Slot : "span";

    // @ts-expect-error children
    return <Comp {...props} ref={ref} className={classes} />;
  }
);

FormFeedback.displayName = "SuiFormFeedback";
