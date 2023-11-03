"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { Container, PageHeader } from "@/components";
import MessageForm from "./_components/MessageForm";
import { EmailForm } from "./_components/EmailForm";

export default function Register() {
  return (
    <Container className="max-w-lg my-12">
      <PageHeader>Register</PageHeader>
      <Tabs.Root defaultValue="message">
        <Tabs.List
          aria-label="Register"
          className="mb-4 border border-0 border-b-2 border-gray-200"
        >
          <Tabs.Trigger
            className="px-3 py-2 -mb-[2px] border border-0 border-b-2 action:border-b-brand-500 aria-selected:border-b-brand-500"
            value="email"
          >
            Email
          </Tabs.Trigger>
          <Tabs.Trigger
            className="px-3 py-2 -mb-[2px] border border-0 border-b-2 action:border-b-brand-500 aria-selected:border-b-brand-500"
            value="message"
          >
            Message
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="email">
          <EmailForm />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="message">
          <MessageForm />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
