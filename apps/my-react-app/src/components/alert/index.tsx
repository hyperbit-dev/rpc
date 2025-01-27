import clsx from "clsx";
import { forwardRef } from "react";
import { baseAlert } from "./styles";

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  Variant?: keyof (typeof baseAlert)["variants"]["color"];
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, Variant: color = "default", ...props }, ref) => {
    return (
      <div
        className={clsx(baseAlert({ color }), className)}
        {...props}
         role="alert"
        ref={ref}
      />
    );
  }
);
