import { Container, Form, FormRow, Input, PageHeader } from "@/components";
import React from "react";

// tx e.g. ecc50e3f5e952c7fe8e191488924cf80822dc701147d497ea4816868ea338fea

// {
//     "secret": "304d464071633b0120e6f3a0f95e9efb5f42b8b7307ab4b02f4b94acc88525fa",
//     "public": "9025c0b90c461caa6a86f4dacbdd389274a9f465350cdc8d4d1350adbd398ea734c81aa28a126b420c6ca24749e81792"
//   }

// protx register_prepare collateralHash collateralIndex ipAndPort ownerKeyAddr operatorPubKey votingKeyAddr operatorReward payoutAddress

export default function CreateMasternode() {
  return (
    <Container>
      <PageHeader>Create Masternode</PageHeader>
      <Form>
        <FormRow Label="Collateral Hash">
          <Input type="text" />
        </FormRow>
        <FormRow Label="IP Address">
          <Input type="text" />
        </FormRow>
        <FormRow Label="Port">
          <Input type="number" />
        </FormRow>
        <FormRow Label="Owner Address">
          <Input type="number" />
        </FormRow>
        <FormRow Label="Voting Address">
          <Input type="number" />
        </FormRow>
        <FormRow Label="Payout Address">
          <Input type="number" />
        </FormRow>
        <FormRow Label="Operator Public Key">
          <Input type="number" />
        </FormRow>
      </Form>
    </Container>
  );
}
