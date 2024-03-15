import { btc, chains, findNetworkById } from "@hyperbitjs/chains";
import { zodResolver } from "@hookform/resolvers/zod";
import { sign } from "@hyperbitjs/message";
import {
  Alert,
  Button,
  FormGroup,
  Input,
  Label,
  Textarea,
} from "@hyperbitui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignSchema = z.object({
  blockchainId: z.string(),
  network: z.string(),
  privateKey: z.string(),
  message: z.string(),
});

export type SignSchema = z.infer<typeof SignSchema>;

const options = Object.keys(chains)
  .map((chain: any) => {
    const name: string = (chains as any)[chain].mainnet.name;
    return {
      label: name.match(/[A-Z][a-z]+/g)?.join(" ") ?? name,
      value: (chains as any)[chain].mainnet?.id ?? null,
      networks: (chains as any)[chain],
    };
  })
  .filter((chain) => chain.networks.mainnet.id);

export default function SignMessage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [signature, setSignature] = useState<string | undefined>(undefined);
  const form = useForm({
    resolver: zodResolver(SignSchema),
    defaultValues: {
      blockchainId: btc.mainnet.id,
      network: "mainnet",
      privateKey: "",
      message: "",
    },
  });

  async function handleSubmit(values: SignSchema) {
    setError(undefined);
    setSignature(undefined);
    setTimeout(() => {
      const network = findNetworkById(values.blockchainId);
      const signature = sign({
        message: values.message,
        privateKeyWIF: values.privateKey,
        messagePrefix: network?.messagePrefix!,
        network,
      });
      if (signature) {
        setSignature(signature);
      } else {
        setError(
          "Unable to sign message. Please check your private key and try again."
        );
      }
    }, 1000);
  }

  return (
    <>
      <p className="text-sm">
        You can sign messages/agreements with your addresses to prove you can
        receive cryptocurrency sent to them. Be careful not to sign anything
        vague or random, as phishing attacks may try to trick you into signing
        your identity over to them. Only sign fully-detailed statements you
        agree to.
      </p>
      {error ? (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      ) : undefined}
      {/* @ts-ignore */}
      <form className="mt-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormGroup>
          <Label htmlFor="form-blockchainId">Blockchain</Label>
          <Input asChild>
            <select {...form.register("blockchainId")} id="form-blockchainId">
              {options.map((chain: any) => (
                <option key={chain.label} value={chain.value}>
                  {chain.label}
                </option>
              ))}
            </select>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="form-network">Network</Label>
          <Input asChild disabled>
            <select {...form.register("network")} id="form-network">
              <option value="mainnet">Mainnet</option>
            </select>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Private Key (WIF)</Label>
          <Textarea
            {...form.register("privateKey")}
            id="form-private-key"
            placeholder="Enter your private key wif..."
          />
        </FormGroup>
        <FormGroup>
          <Label>Message</Label>
          <Textarea
            {...form.register("message")}
            id="form-message"
            placeholder="Enter your message..."
          />
        </FormGroup>
        {signature ? (
          <FormGroup>
            <Label>Signature</Label>
            <Textarea defaultValue={signature} />
          </FormGroup>
        ) : undefined}
        <FormGroup>
          <Button type="submit">Sign</Button>
        </FormGroup>
      </form>
    </>
  );
}
