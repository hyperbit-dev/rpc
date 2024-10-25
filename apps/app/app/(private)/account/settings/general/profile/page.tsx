"use client";

import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
  Label,
} from "@/components";

export default function SettingsGeneralProfilePage() {
  return (
    <Card>
      <CardHeader>Profile</CardHeader>
      <CardBody>
        <div className="grid lg:grid-cols-2 lg:gap-x-4">
          <FormGroup>
            <Label>Full Name</Label>
            <Input />
          </FormGroup>
          <FormGroup>
            <Label>Username</Label>
            <Input />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input />
          </FormGroup>
        </div>
      </CardBody>
    </Card>
  );
}
