import clsx from "clsx";
import { forwardRef } from "react";
import { baseButton } from "./styles.tsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  Size?: keyof (typeof baseButton)["variants"]["size"];
  Variant?: keyof (typeof baseButton)["variants"]["color"];
  Width?: keyof (typeof baseButton)["variants"]["width"];
  Outline?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      Variant = "default",
      Size: size = "md",
      Width = "auto",
      Outline: outline,
      ...props
    },
    ref
  ) => {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx(
          baseButton({
            size,
            color: Variant,
            width: Width,
            disabled: !!props.disabled,
            outline,
          }),
          className
        )}
      />
    );
  }
);
