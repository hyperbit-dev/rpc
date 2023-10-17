import clsx from "clsx";
import { forwardRef, ReactNode } from "react";

type FormErrorProps = {
  className?: string;
  children?: ReactNode;
};

export const FormError = forwardRef<HTMLSpanElement, FormErrorProps>(
  ({ className, children, ...props }, ref) => (
    <span
      className={clsx("text-red-500 text-sm", className)}
      {...props}
      ref={ref}
    >
      {children}
    </span>
  )
);

FormError.displayName = "FormError";
