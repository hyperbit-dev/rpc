import * as z from "zod";

export const GetFaucetSchema = z.object({
  address: z.string(),
  captcha: z.string(),
});

export type GetFaucetSchema = z.infer<typeof GetFaucetSchema>;
