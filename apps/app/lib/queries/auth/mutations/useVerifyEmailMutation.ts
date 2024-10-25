import { useMutation } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import { VerifyEmailRequest } from "../types";

export function verifyEmailMutation({ token }: VerifyEmailRequest) {
  return fetchNexus<void>(`/api/auth/verify/${token}`, {
    method: "POST",
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: verifyEmailMutation,
  });
}
