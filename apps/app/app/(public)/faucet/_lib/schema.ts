import { z } from "zod";

export const FaucetSchema = z.object({
  blockchain: z.string(),
  address: z.string(),
});

export type FaucetSchema = z.infer<typeof FaucetSchema>;
