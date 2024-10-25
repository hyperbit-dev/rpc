import { forwardRef } from "react";

export type LabelProps = React.HTMLProps<HTMLLabelElement> & {};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ ...props }, ref) => {
    return (
      <label
        ref={ref}
        className="block text-sm font-medium mb-2 dark:text-white"
        {...props}
      />
    );
  },
);

Label.displayName = "Label";
