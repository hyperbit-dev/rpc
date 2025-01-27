import { useFormContext } from "react-hook-form";
import { NexusWallet } from "~/utils/queries/wallets/types";
import { convertBaseToDisplay } from "~/utils/chains";
import { FormGroup } from "../../form-group";
import { Input } from "../../input";
import { Label } from "../../label";
import { Checkbox } from "../../checkbox";
import { HelperText } from "../../helper-text";
import { SendSchema } from "../schema";

type StepFormProps = {
  wallet: NexusWallet;
  handleSubmit: (values: SendSchema) => void;
};

export function StepForm({ wallet, handleSubmit }: StepFormProps) {
  const form = useFormContext<SendSchema>();

  const displayAmount = convertBaseToDisplay(
    wallet?.totalBalance?.balance ?? 0,
    wallet.blockchain.externalChainId
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex flex-col gap-4">
        <FormGroup>
          <Label>Label</Label>
          <Input {...form.register("label")} />
        </FormGroup>
        <FormGroup>
          <Label>Withdrawal Address</Label>
          <Input
            {...form.register("address")}
            placeholder="Enter receiver address..."
            Error={!!form.formState.errors.address}
          />
          {form.formState.errors.address ? (
            <HelperText className="text-red-500">
              {form.formState.errors.address.message}
            </HelperText>
          ) : undefined}
        </FormGroup>

        <FormGroup>
          <Label>
            Amount{" "}
            <small className="uppercase">({wallet.blockchain.symbol})</small>
          </Label>
          <Input
            {...form.register("amount")}
            type="number"
            step="0.00000001"
            placeholder="e.g. 1.001"
            Error={!!form.formState.errors.amount}
            onChange={(e: { target: { value: any } }) => {
              form.setValue("amount", e.target.value);
              form.trigger("amount");
            }}
          />

          {form.formState.errors.amount ? (
            <HelperText className="text-red-500">
              {form.formState.errors.amount.message}
            </HelperText>
          ) : (
            <HelperText>
              {`Balance: ${displayAmount}`}{" "}
              <span className="uppercase">{wallet.blockchain.symbol}</span>
            </HelperText>
          )}
        </FormGroup>
        <FormGroup>
          <Label>Wallet Passphrase</Label>
          <Input
            {...form.register("passphrase")}
            Error={!!form.formState.errors.passphrase}
          />
          {form.formState.errors.passphrase ? (
            <HelperText className="text-red-500">
              {form.formState.errors.passphrase.message}
            </HelperText>
          ) : undefined}
        </FormGroup>
        <FormGroup>
          <Label className="flex items-start">
            <Checkbox {...form.register("subtractFee")} />
            <span>Subtract fee from amount?</span>
          </Label>
        </FormGroup>
        <FormGroup>
          <Label className="flex items-start">
            <Checkbox
              {...form.register("confirm")}
              Error={!!form.formState.errors.confirm}
            />
            <span>
              I understand that cryptocurrency transactions are irreversible and
              I have verified the withdrawal address and amount.
            </span>
          </Label>
          {form.formState.errors.confirm ? (
            <HelperText className="text-red-500">
              {form.formState.errors.confirm.message}
            </HelperText>
          ) : undefined}
        </FormGroup>
      </div>
    </form>
  );
}
