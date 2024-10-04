import { blockchains } from "./blockchains";
import { redis } from "./redis";
export { blockchainSchema } from "./blockchains";

export const config = {
  blockchains,
  redis,
};
