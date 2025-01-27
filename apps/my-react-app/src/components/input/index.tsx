import clsx from "clsx";
import { forwardRef } from "react";
import { baseInput } from "./styles.tsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  Size?: keyof (typeof baseInput)["variants"]["size"];
  Variant?: keyof (typeof baseInput)["variants"]["color"];
  Error?: boolean;
  disabled?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, Variant = "default", Error, Size: size = "md", ...props },
    ref
  ) => {
    const color = Error ? "error" : Variant;

    return (
      <input
        className={clsx(baseInput({ size, color }), className)}
        readOnly={!!props.disabled}
        {...props}
        ref={ref}
      />
    );
  }
);
