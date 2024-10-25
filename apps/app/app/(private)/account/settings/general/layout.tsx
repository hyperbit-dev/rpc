"use client";

import { Container } from "@/components";
import Link from "next/link";

export default function SettingsGeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex gap-2 py-4">
      <div className="pl-2 py-4 pr-4 text-sm gap-3 flex flex-col">
        <Link
          href="/account/settings/general/profile"
          className="text-gray-500 hover:text-brand-600"
        >
          Profile
        </Link>
        <Link
          href="/account/settings/general/account"
          className="text-gray-500 hover:text-brand-600"
        >
          Account
        </Link>
        <Link
          href="/account/settings/general/appearance"
          className="text-gray-500 hover:text-brand-600"
        >
          Appearance
        </Link>
        <Link
          href="/account/settings/general/accessibility"
          className="text-gray-500 hover:text-brand-600"
        >
          Accessibility
        </Link>
        <Link
          href="/account/settings/general/notifications"
          className="text-gray-500 hover:text-brand-600"
        >
          Notifications
        </Link>
        <Link
          href="/account/settings/general/sessions"
          className="text-gray-500 hover:text-brand-600"
        >
          Sessions
        </Link>
      </div>
      <div className="flex-1">{children}</div>
    </Container>
  );
}
