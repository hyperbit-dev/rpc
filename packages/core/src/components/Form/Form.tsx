import clsx from "clsx";
import { SyntheticEvent, forwardRef } from "react";
import { FormProps } from "./types";

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, onSubmit, ...props }, ref) => {
    const classes = clsx("sui--form", className);

    function _handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(e);
      }
    }

    return (
      <form {...props} ref={ref} className={classes} onSubmit={_handleSubmit} />
    );
  },
);

Form.displayName = "SuiForm";
