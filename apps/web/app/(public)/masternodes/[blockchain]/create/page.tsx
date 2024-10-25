import { Container } from "~/_components/Container";
import { PageHeader } from "~/_components/PageHeader";
import { Form, FormGroup, Input, Label } from "@hyperbit-private/react";
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
        <FormGroup>
          <Label>Collateral Hash</Label>
          <Input type="text" />
        </FormGroup>
        <FormGroup>
          <Label>IP Address</Label>
          <Input type="text" />
        </FormGroup>
        <FormGroup>
          <Label>Port</Label>
          <Input type="number" />
        </FormGroup>
        <FormGroup>
          <Label>Owner Address</Label>
          <Input type="number" />
        </FormGroup>
        <FormGroup>
          <Label>Voting Address</Label>
          <Input type="number" />
        </FormGroup>
        <FormGroup>
          <Label>Payout Address</Label>
          <Input type="number" />
        </FormGroup>
        <FormGroup>
          <Label>Operator Public Key</Label>
          <Input type="number" />
        </FormGroup>
      </Form>
    </Container>
  );
}
