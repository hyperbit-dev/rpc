import { useFieldArray, useFormContext } from "react-hook-form";
import { WalletSchema } from "../_lib/schema";
import { FormGroup, Input, Label } from "@hyperbitui/react";
import { useRef } from "react";

export function ImportMnemonic() {
    const ref = useRef();
  const { control, register } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "mnemonic",
    }
  );

  console.log("fields", fields);

  return (
    <FormGroup>
      <div className="grid grid-cols-2 gap-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <Label>Word #{index + 1}</Label>
            <Input {...register(`mnemonic.${index}.value`)} />
          </div>
        ))}
      </div>
    </FormGroup>
  );
}
