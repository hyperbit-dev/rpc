import clsx from "clsx";
import { forwardRef } from "react";
import { baseHelperText } from "./styles.tsx";

type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  Size?: keyof (typeof baseHelperText)["variants"]["size"];
  Variant?: keyof (typeof baseHelperText)["variants"]["color"];
  disabled?: boolean;
};

export const HelperText = forwardRef<HTMLParagraphElement, HelperTextProps>(
  (
    { className, Variant = "default", Size: size = "md", children, ...props },
    ref
  ) => {
    return (
      <p
        className={clsx(baseHelperText({ size, color: Variant }), className)}
        {...props}
        ref={ref}
      >
        {children}
      </p>
    );
  }
);
