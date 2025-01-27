import clsx from "clsx";
import { forwardRef } from "react";
import { baseContainer } from "./styles.tsx";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  Size?: keyof (typeof baseContainer)["variants"]["size"];
  Padding?: keyof (typeof baseContainer)["variants"]["xPadding"];
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, Size = "7xl", Padding = 4, ...props }, ref) => {
    const classes = baseContainer({
      size: Size,
      xPadding: Padding,
    });

    return (
      <div
        className={clsx(classes, className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
