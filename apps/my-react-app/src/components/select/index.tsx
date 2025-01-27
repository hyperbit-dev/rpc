import clsx from "clsx";
import { forwardRef } from "react";
import { baseInput } from "../input/styles";
import { InputProps } from "../input";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  InputProps & {
    Size?: keyof (typeof baseInput)["variants"]["size"];
    Variant?: keyof (typeof baseInput)["variants"]["color"];
    disabled?: boolean;
  };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, Variant = "default", Size: size = "md", ...props }, ref) => {
    return (
      <select
        className={clsx(baseInput({ size, color: Variant }), className)}
        readOnly={!!props.disabled}
        {...props}
        ref={ref}
      />
    );
  }
);
