import { FormGroup, Label as LabelComponent } from "@slipstreamui/react";
import { ReactNode } from "react";
import clsx from "clsx";

type FormRowProps = {
  className?: string;
  children?: ReactNode;
  id?: string;
  Label?: ReactNode;
};

export function FormRow({ className, children, Label, id }: FormRowProps) {
  return (
    <FormGroup className={clsx(className)}>
      {Label ? (
        <LabelComponent htmlFor={id}>{Label}</LabelComponent>
      ) : undefined}
      {children}
    </FormGroup>
  );
}
