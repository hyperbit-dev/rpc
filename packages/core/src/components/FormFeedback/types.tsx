import React from "react";

export type FormFeedbackProps = React.HTMLAttributes<HTMLSpanElement> & {
  asChild?: boolean;
  valid?: boolean;
};
