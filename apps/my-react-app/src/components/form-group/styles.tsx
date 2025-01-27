import { tv } from "tailwind-variants";

export const baseFormGroup = tv({
  base: "flex",
  variants: {
    justify: {
      col: ["flex-col"],
      row: ["flex-row justify-between"],
    },
  },
});
