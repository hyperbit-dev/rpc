"use client";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeading,
  Container,
  FormGroup,
  Input,
  Label,
  SegmentTabs,
} from "@/components";

export default function WalletPage() {
  return (
    <>
      <Container>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-2">
            <Card>
              <CardHeader>
                <CardHeading>Balance</CardHeading>
              </CardHeader>
              <CardBody>
                <div>$21,000</div>
                <div>2.3%</div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardHeading>Recent Transactions</CardHeading>
              </CardHeader>
              <CardBody>asfd</CardBody>
            </Card>
          </div>
          <div className="col-span-3 md:col-span-1">
            <Card>
              <CardBody>
                <FormGroup>
                  <SegmentTabs />
                </FormGroup>
                <FormGroup>
                  <Label>Address</Label>
                  <Input type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>Label</Label>
                  <Input type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>Amount</Label>
                  <Input type="text" />
                </FormGroup>
              </CardBody>
            </Card>
          </div>
        </div>
        <ul>
          <li>Wallet Trend Graph - Buy / Sell</li>
          <li>Overview/Balance</li>
          <li>Transactions</li>
          <li>Send/Receive/Exchange</li>
        </ul>
      </Container>
    </>
  );
}
