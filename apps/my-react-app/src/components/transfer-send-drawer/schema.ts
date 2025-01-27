import { z } from "zod";

export const SendSchema = z.object({
  address: z.string().nonempty("Address is required"),
  amount: z.coerce.number({
    required_error: "Amount is required",
  }),
  label: z.string().optional(),
  passphrase: z.string().nonempty("Passphrase is required"),
  subtractFee: z.boolean().optional(),
  confirm: z.literal<boolean>(true, {
    errorMap: () => ({ message: "Please confirm the withdrawal" }),
  }),
});

export type SendSchema = z.infer<typeof SendSchema>;
