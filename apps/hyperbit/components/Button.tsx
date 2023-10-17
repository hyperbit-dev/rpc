import clsx from "clsx";
import { ReactNode, forwardRef } from "react";

type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  href?: string | undefined;
  Width?: "full";
  Color?: "brand-500" | "gray-800";
  children?: ReactNode;
  Tag?: any;
  Link?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, Width, Color = "brand-500", Tag, Link, ...props },
    ref
  ) => {
    if (props?.href && Tag === "button") {
      Tag = "a";
    }

    return (
      <Tag
        className={clsx(
          "rounded-lg text-sm px-3 py-2 duration-300 ease",
          Link
            ? [
                "hover:text-brand-500 active:text-brand-500 focus:text-brand-500",
              ]
            : [
                "text-white",
                {
                  "bg-gray-800 hover:bg-brand-500 active:bg-brand-500 focus:bg-brand-500":
                    Color === "gray-800",
                },
                {
                  "bg-brand-500 hover:bg-brand-600 active:bg-brand-600 focus:bg-brand-600":
                    Color === "brand-500",
                },
              ],
          { "inline-block": Tag !== "button" },
          { "w-full": !!Width },
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </Tag>
    );
  }
);

Button.displayName = "Button";
Button.defaultProps = {
  Tag: "button",
};
