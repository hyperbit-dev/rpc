import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { SignIn } from "./_components/Client";
import { authOptions } from "../[...nextauth]/options";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/wallets");
  }

  const providers: any = await getProviders();
  return <SignIn providers={providers} />;
}
