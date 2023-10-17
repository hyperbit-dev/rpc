"use client";
import { Container, PageHeader } from "@/components";
import { useSession } from "next-auth/react";

export function Account() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <Container className="my-8">
      <PageHeader>Account</PageHeader>
      <div className="flex">
        <div className="w-1/2">
          <ul>
            <li>
              <a>Profile</a>
            </li>
          </ul>
        </div>
        <div className="flex-4">sadf</div>
      </div>
    </Container>
  );
}
