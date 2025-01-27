import { findNetworkById } from "@hyperbitjs/chains";
import BigNumber from "bignumber.js";

export function convertBaseToDisplay(baseAmount: number, chainId: string) {
  const network = findNetworkById(chainId);
  return new BigNumber(baseAmount)
    .dividedBy(network?.decimalPlaces || 1e8)
    .toString();
}
