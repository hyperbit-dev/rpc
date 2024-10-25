"use server";

import { redirect } from "next/navigation";

export default async function SettingsAccessPage() {
  redirect("/account/settings/access/general");
}
