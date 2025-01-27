import clsx from "clsx";
import { forwardRef } from "react";
import { baseInput } from "../input/styles";
import { InputProps } from "../input";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  InputProps & {
    Size?: keyof (typeof baseInput)["variants"]["size"];
    Variant?: keyof (typeof baseInput)["variants"]["color"];
    disabled?: boolean;
  };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, Variant = "default", Size: size = "md", ...props }, ref) => {
    return (
      <textarea
        className={clsx(baseInput({ size, color: Variant }), className)}
        readOnly={!!props.disabled}
        {...props}
        ref={ref}
      />
    );
  }
);
