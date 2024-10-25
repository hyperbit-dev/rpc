"use client";

import { Container } from "@/components";
import Link from "next/link";

export default function SettingsAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex gap-2 py-4">
      <div className="pl-2 py-4 pr-4 text-sm gap-3 flex flex-col">
        <Link
          href="/account/settings/access/general"
          className="text-gray-500 hover:text-brand-600"
        >
          General
        </Link>
        <Link
          href="/account/settings/access/organization"
          className="text-gray-500 hover:text-brand-600"
        >
          Organization
        </Link>
        <Link
          href="/account/settings/access/teams"
          className="text-gray-500 hover:text-brand-600"
        >
          Teams
        </Link>
        <Link
          href="/account/settings/access/users"
          className="text-gray-500 hover:text-brand-600"
        >
          Users
        </Link>
        <Link
          href="/account/settings/access/api-keys"
          className="text-gray-500 hover:text-brand-600"
        >
          API Keys
        </Link>
      </div>
      <div className="flex-1">{children}</div>
    </Container>
  );
}
