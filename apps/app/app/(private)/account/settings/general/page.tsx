"use server";

import { redirect } from "next/navigation";

export default async function SettingsPage() {
  redirect("/account/settings/general/profile");
}
