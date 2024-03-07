"use client";
import * as Tabs from "@radix-ui/react-tabs";
import dynamic from "next/dynamic";
import { TabsHeader } from "@/_components/TabsHeader";
import { Container } from "@/_components/Container";

const SignMessage = dynamic(() => import("./_components/Sign"));
const VerifyMessage = dynamic(() => import("./_components/Verify"));

export default function MessagePage() {
  return (
    <Container className="max-w-xl my-6">
      <h1 className="mb-2 text-4xl font-bold">Blockchain Message</h1>
      <Tabs.Root defaultValue="sign">
        <TabsHeader
          tabs={[
            { name: "Sign", value: "sign" },
            { name: "Verify", value: "verify" },
          ]}
          className="mb-2"
        />
        <Tabs.Content value="sign">
          <SignMessage />
        </Tabs.Content>
        <Tabs.Content value="verify">
          <VerifyMessage />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
