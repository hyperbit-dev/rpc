"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { chains } from "@hyperbitjs/chains";
import React, { useEffect, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Select } from "@/components";
import {
  Button,
  Checkbox,
  Form,
  FormGroup,
  Label,
  Textarea,
} from "@hyperbitui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  blockchain: z.string().min(1),
  publicKey: z.string().min(1),
  signature: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

export default function MessageForm() {
  const [nonce, setNonce] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
    fetchNonce().then((nonce) => setNonce(nonce));
  }, [router, status, setNonce]);

  const options = useMemo(() => {
    const options = Object.keys(chains)
      .map((chain: any) => {
        const name: string = (chains as any)[chain].mainnet.name;
        return {
          label: name.match(/[A-Z][a-z]+/g)?.join(" ") ?? name,
          value: chain,
          networks: (chains as any)[chain],
        };
      })
      .filter((chain) => !!chain.networks.mainnet.messagePrefix);
    return options;
  }, []);

  async function fetchNonce() {
    const response = await fetch("/api/auth/siwm");

    if (response.status !== 200)
      throw new Error("nonce could not be retrieved");

    const { nonce } = await response.json();

    return nonce;
  }

  async function handleSubmit(values: Schema) {
    // const nonce = await fetchNonce();

    // const message = `Sign this message for authenticating with your wallet. Nonce: ${nonce}`;
    // const encodedMessage = new TextEncoder().encode(message);
    // // make request to third party
    // const signedMessage = await solana.request({
    //   method: "signMessage",
    //   params: {
    //     message: encodedMessage,
    //   },
    // });

    try {
      await signIn("siwm", {
        redirect: false,
        blockchain: values.blockchain,
        publicKey: values.publicKey,
        signature: values.signature,
      });
    } catch (e) {
      console.log("e", e);
    }
  }

  if (status === "loading") {
    return null;
  }

  return (
    <Form onSubmit={form.handleSubmit(handleSubmit)}>
      <p className="p-2 mb-4 text-sm leading-tight bg-gray-100 border border-gray-200 rounded">
        Register anonymously using your wallet&apos;s message feature.
      </p>
      <FormGroup>
        <Label>Sign the following message</Label>
        <Textarea type="text" defaultValue={nonce} />
      </FormGroup>
      <FormGroup>
        <Label>Blockchain</Label>
        <Select {...form.register("blockchain")}>
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Public Key</Label>
        <Textarea
          {...form.register("publicKey")}
          placeholder="e.g. mfx2pwSTawNr8Hyfi5BuZbd9fQmNsFgQJF"
        />
      </FormGroup>
      <FormGroup>
        <Label>Signature</Label>
        <Textarea rows={4} {...form.register("signature")} />
      </FormGroup>
      <FormGroup>
        <Checkbox>
          <span className="text-sm">
            I agree to the{" "}
            <Link href="/terms-of-service">terms of service</Link>,{" "}
            <Link href="/cookie-policy">cookie policy</Link>, and{" "}
            <Link href="/privacy-policy">privacy policy</Link>.
          </span>
        </Checkbox>
      </FormGroup>
      <Button type="submit" fullWidth>
        Connect
      </Button>
    </Form>
  );
}
