"use client";
import {
  Alert,
  Button,
  Container,
  Divider,
  FormRow,
  Input,
  Label,
  PageHeader,
  SectionCard,
} from "@/components";
import { useSession } from "next-auth/react";
import React from "react";

export default function Settings() {
  const { data } = useSession();
  console.log("data", data);
  return (
    <>
      <Alert>Warning: This feature is still under development</Alert>
      <Container className="w-full my-4">
        <PageHeader>Settings</PageHeader>
        <Divider />
        <div className="flex flex-wrap items-start">
          <div className="w-full md:w-1/4">Profile</div>
          <div className="w-full md:w-1/2">
            <SectionCard className="p-4">
              <FormRow id="name" Label="Name" className="mb-4">
                <Input />
              </FormRow>
              <FormRow id="name" Label="Address" className="mb-4">
                <Input defaultValue={data?.email} disabled />
              </FormRow>
              <Divider />
              <div className="flex justify-end">
                <Button type="button">Save Changes</Button>
              </div>
            </SectionCard>
          </div>
          <div className="w-full md:w-1/4"></div>
        </div>
      </Container>
    </>
  );
}
