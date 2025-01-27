import clsx from "clsx";
import { forwardRef } from "react";
import { baseLabel } from "./styles.tsx";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  Size?: keyof (typeof baseLabel)["variants"]["size"];
  Spacing?: keyof (typeof baseLabel)["variants"]["spacing"];
  Variant?: keyof (typeof baseLabel)["variants"]["color"];
  disabled?: boolean;
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    { className, Variant = "default", Size: size = "md", Spacing: spacing = 'default', children, ...props },
    ref
  ) => {
    return (
      <label
        className={clsx(baseLabel({ size, color: Variant, spacing }), className)}
        {...props}
        ref={ref}
      >
        {children}
      </label>
    );
  }
);
