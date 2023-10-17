"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { chains } from "@hyperbitjs/chains";
import React, { useEffect, useMemo } from "react";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Container, FormRow, Select } from "@/components";
import { Button, Form, FormGroup, Label, Textarea } from "@hyperbitui/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  blockchain: z.string().min(1),
  publicKey: z.string().min(1),
  signature: z.string().min(1),
});

export default function Connect() {
  const [nonce, setNonce] = useState<string | null>(null);
  const router = useRouter();
  const { status } = useSession();
  const form = useForm({
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

  async function handleSubmit(values) {
    console.log("values", values);

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
      // // sign in with third party information
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
    <Container className="max-w-lg mt-12">
      <h1 className="mb-6 text-3xl font-semibold text-center">Connect</h1>
      <Form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormRow id="login-nonce" Label="Sign the following message:">
          <Textarea type="text" defaultValue={nonce} />
        </FormRow>
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
          <Textarea {...form.register("publicKey")} />
        </FormGroup>
        <FormGroup>
          <Label>Signature</Label>
          <Textarea rows={4} {...form.register("signature")} />
        </FormGroup>
        <Button type="submit" fullWidth>
          Connect
        </Button>
      </Form>
    </Container>
  );
}
