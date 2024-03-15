import { btc, chains, findNetworkById } from "@hyperbitjs/chains";
import { zodResolver } from "@hookform/resolvers/zod";
import { verify } from "@hyperbitjs/message";
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

const VerifySchema = z.object({
  blockchainId: z.string(),
  network: z.string(),
  publicAddress: z.string(),
  message: z.string(),
  signature: z.string(),
});

export type VerifySchema = z.infer<typeof VerifySchema>;

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

export default function VerifyMessage() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isVerified, setIsVerified] = useState<boolean | undefined>(undefined);
  const form = useForm({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      blockchainId: btc.mainnet.id,
      network: "mainnet",
      publicAddress: "",
      message: "",
      signature: "",
    },
  });

  async function handleSubmit(values: VerifySchema) {
    setError(undefined);
    setIsVerified(undefined);
    setTimeout(() => {
      const network = findNetworkById(values.blockchainId);
      const isVerified = verify({
        signature: values.signature,
        address: values.publicAddress,
        message: values.message,
        messagePrefix: network?.messagePrefix!,
        network,
      });
      if (isVerified) {
        setIsVerified(isVerified);
      } else {
        setError("Unable to verify signature.");
      }
    }, 1000);
  }

  return (
    <>
      <p className="mb-2 text-sm">
        Verify the message to ensure it was signed with the specified blockchain
        address.
      </p>
      <p className="mb-2 text-sm">
        Enter the receiver&rsquo;s address, message (ensure you copy line
        breaks, spaces, tabs, etc. exactly) and signature below to verify the
        message. Be careful not to read more into the signature than what is in
        the signed message itself, to avoid being tricked by a man-in-the-middle
        attack. Note that this only proves the signing party receives with the
        address, it cannot prove sendership of any transaction!
      </p>
      {error ? (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      ) : undefined}
      {isVerified ? (
        <FormGroup>
          <Alert variant="success">Signature verified!</Alert>
        </FormGroup>
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
          <Label>Public Address</Label>
          <Textarea
            {...form.register("publicAddress")}
            id="form-publicAddress"
            placeholder="Enter your public address..."
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
        <FormGroup>
          <Label>Signature</Label>
          <Textarea
            {...form.register("message")}
            id="form-message"
            placeholder="Enter your message..."
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit">Verify</Button>
        </FormGroup>
      </form>
    </>
  );
}
