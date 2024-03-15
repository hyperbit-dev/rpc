import { z } from "zod";

export const walletSchema = z.object({
  chainId: z.string({ required_error: "Blockchain id is required" }),
  addresses: z.array(z.string(), { required_error: "Addresses are required" }),
});
