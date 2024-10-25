import { TabLink } from "@/components/TabLink";

export default function SettingsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-gray-200 dark:border-neutral-700">
        <h1 className="px-2 text-2xl">Settings</h1>
        <nav
          className="flex gap-x-1"
          aria-label="TabLinks"
          role="tablist"
          aria-orientation="horizontal"
        >
          <TabLink href="/account/settings/general">General</TabLink>
          <TabLink href="/account/settings/access">Access</TabLink>
          <TabLink href="/account/settings/usage">Usage</TabLink>
          <TabLink href="/account/settings/plans">Plans</TabLink>
          <TabLink href="/account/settings/add-ons">Add-ons</TabLink>
          <TabLink href="/account/settings/history">History</TabLink>
          <TabLink href="/account/settings/payment-methods">
            Payment Methods
          </TabLink>
        </nav>
      </div>
      {children}
    </>
  );
}
