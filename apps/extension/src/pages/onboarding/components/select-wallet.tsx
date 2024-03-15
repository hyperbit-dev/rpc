import { Button } from "@hyperbitui/react";
import { Step } from "../types";

export function SelectWallet({ setStep }: { setStep: (step: Step) => void }) {
  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-xs gap-4 mx-auto">
      <h2 className="text-lg">Select Your Wallet</h2>
      <div>
        <p className="mb-1">New User?</p>
        <Button type="button" fullWidth onClick={() => setStep("create")}>
          Create Wallet
        </Button>
      </div>
      <div>
        <p className="mb-1">Already have a wallet?</p>
        <Button
          type="button"
          fullWidth
          variant="link"
          onClick={() => setStep("import")}
        >
          Import wallet
        </Button>
      </div>
    </div>
  );
}
