"use client";

import { Card, CardBody, CardHeader, Container } from "@/components";
import { Progress } from "@/components/Progress";

export default function SettingsUsagePage() {
  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const monthName = firstOfMonth.toLocaleString("default", { month: "long" });

  const maxValue = 1000;
  const currentValue = 150;
  const value = (currentValue / maxValue) * 100;

  return (
    <Container className="my-4">
      <Card>
        <CardHeader>
          <div>
            <div>Usage</div>
            <div className="text-sm">
              Credit usage for {monthName}{" "}
              {firstOfMonth.toLocaleString("default", { day: "numeric" })} -{" "}
              {lastOfMonth.toLocaleString("default", { day: "numeric" })}
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="max-w-sm text-center">
            <Card>
              <div className="text-xl">Credits Used</div>
              <CardBody>
                <div className="text-3xl my-2">{currentValue}</div>
                <Progress value={value} />
                <div className="text-xs mt-2">
                  {value}% of plan credits used
                </div>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}
