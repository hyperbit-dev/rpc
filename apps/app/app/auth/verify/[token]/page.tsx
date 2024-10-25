"use client";
import { useVerifyEmailMutation } from "@/lib/queries/auth";
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
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <>{error}</>;
  }

  return null;
}
