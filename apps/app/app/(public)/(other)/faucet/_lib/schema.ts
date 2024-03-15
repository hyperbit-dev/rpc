import { z } from "zod";

export const FaucetSchema = z.object({
  blockchain: z.string(),
  address: z.string(),
  asset: z.string().optional(),
});

export type FaucetSchema = z.infer<typeof FaucetSchema>;
