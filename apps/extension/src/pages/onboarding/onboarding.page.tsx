import { useState } from "react";
import {
  CreateWallet,
  ImportWallet,
  Password,
  SelectWallet,
} from "./components";
import { Step } from "./types";
import { useAuth } from "~/components";

export function OnboardingPage() {
  const [step, setStep] = useState<Step>("password");
  const auth = useAuth();

  function render() {
    switch (step) {
      case "create":
        return <CreateWallet setStep={setStep} />;
      case "import":
        return <ImportWallet setStep={setStep} />;
      case "choices":
        return <SelectWallet setStep={setStep} />;
      default:
        if (auth.token) {
          return <SelectWallet setStep={setStep} />;
        }
        return <Password setStep={setStep} />;
    }
  }

  if (auth.loading) {
    return null;
  }

  return <>{render()}</>;
}
