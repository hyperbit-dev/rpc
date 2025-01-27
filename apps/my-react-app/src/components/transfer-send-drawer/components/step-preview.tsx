import { useFormContext } from "react-hook-form";
import { SendSchema } from "../schema";
import { NexusWallet } from "~/utils/queries/wallets/types";
import BigNumber from "bignumber.js";

type StepPreviewProps = {
  wallet: NexusWallet;
};

export function StepPreview({ wallet }: StepPreviewProps) {
  const form = useFormContext<SendSchema>();
  const [label, address, amount] = form.watch(["label", "address", "amount"]);

  const fee = 0.01;
  const total = new BigNumber(amount).plus(fee).toString();

  return (
    <>
      <dl className="grid grid-cols-2 gap-2 text-gray-200">
        <dt>Label:</dt>
        <dd className="text-right">{label}</dd>
        <dt>Address:</dt>
        <dd className="text-right">{address}</dd>
        <dt>Amount:</dt>
        <dd className="text-right">
          {amount} <span className="uppercase">{wallet.blockchain.symbol}</span>
        </dd>
        <dt>Network Fee:</dt>
        <dd className="text-right">
          {fee} <span className="uppercase">{wallet.blockchain.symbol}</span>
        </dd>
        <dt>Total:</dt>
        <dd className="text-right">
          {total} <span className="uppercase">{wallet.blockchain.symbol}</span>
        </dd>
      </dl>
    </>
  );
}
