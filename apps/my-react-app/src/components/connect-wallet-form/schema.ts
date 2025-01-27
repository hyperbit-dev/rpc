import * as z from "zod";

const BaseWalletSchema = z.object({
  type: z.enum(["create", "import"]),
  blockchain: z
    .string({ required_error: "Blockchain is required" })
    .min(1, { message: "Blockchain is required" }),
  network: z
    .string({ required_error: "Network is required" })
    .min(1, { message: "Network is required" }),
  label: z
    .string({ required_error: "Label is required" })
    .min(1, { message: "Label is required" }),
  passphrase: z.string({ required_error: "Passphrase is required" }),
  passphraseConfirm: z.string({
    required_error: "Passphrase confirmation is required",
  }),
  termsAndConditions: z
    .boolean({ required_error: "Required" })
    .refine((x) => !!x, { message: "Required" }),
});

const CreateWalletSchema = BaseWalletSchema.extend({
  type: z.literal("create"),
});

const ImportWalletSchema = BaseWalletSchema.extend({
  type: z.literal("import"),
  mnemonic: z.string({ required_error: "Mnemonic is required" }),
});

export const ConnectWalletSchema = z
  .discriminatedUnion("type", [CreateWalletSchema, ImportWalletSchema])
  .refine((data) => data?.passphrase === data?.passphraseConfirm, {
    message: "Passphrase does not match",
    path: ["passphraseConfirm"],
  });

export type ConnectWalletSchema = z.infer<typeof ConnectWalletSchema>;
