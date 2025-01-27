"use client";
import { FormGroup } from "@/components";
import { useVerifyEmailMutation } from "@/lib/queries/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthVerifyPage({
  params,
}: {
  params: { token: string };
}) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const verifyEmailMutation = useVerifyEmailMutation();

  useEffect(() => {
    verifyEmailMutation.mutate(
      { token: params.token },
      {
        onSuccess: () => {
          router.push("/auth/login");
        },
        onError: () => {
          setError("Token provided is used, invalid, or expired.");
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row h-full">
      <div className="flex-1 flex flex-col items-center justify-center mx-auto">
        <FormGroup>{error ? error : "Verifying email..."}</FormGroup>
        <FormGroup className="flex gap-8 justify-between text-sm">
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/forgot-password">Forgot Password</Link>
        </FormGroup>
      </div>
    </div>
  );
}
