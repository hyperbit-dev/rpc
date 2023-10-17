import clsx from "clsx";
import { forwardRef } from "react";
import { Input } from "..";
import { TextareaProps } from "./types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      flush,
      inset,
      invalid,
      rounded = "md",
      variant = "secondary",
      rows = 3,
      ...props
    },
    ref
  ) => {
    const classes = clsx("sui--textarea", className);
    return (
      <Input
        asChild
        variant={variant}
        flush={flush}
        inset={inset}
        invalid={invalid}
        rounded={rounded}
      >
        <textarea {...props} ref={ref} className={classes} rows={rows} />
      </Input>
    );
  }
);

Textarea.displayName = "SuiTextarea";
Textarea.defaultProps = {
  size: "md",
};
