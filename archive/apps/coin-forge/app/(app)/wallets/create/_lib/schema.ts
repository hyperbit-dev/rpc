import * as z from "zod";

export const WalletSchema = z
  .object({
    step: z.string(),
    blockchain: z
      .string({ required_error: "Blockchain is required" })
      .min(1, { message: "Blockchain is required" }),
    network: z
      .string({ required_error: "Network is required" })
      .min(1, { message: "Network is required" }),
    name: z
      .string({ required_error: "Name is required" })
      .min(1, { message: "Name is required" }),
    passphrase: z.string().optional(),
    passphraseConfirm: z.string().optional(),
    terms: z
      .boolean({ required_error: "Required" })
      .refine((x) => !!x, { message: "Required" }),
  })
  .refine((data) => data?.passphrase === data?.passphraseConfirm, {
    message: "Passphrase does not match",
    path: ["passphraseConfirm"],
  });

export type WalletSchema = z.infer<typeof WalletSchema>;
