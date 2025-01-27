import { useMutation } from "@tanstack/react-query";
import { fetchClient } from "~/utils/fetch-client";
import { VerifyEmailRequest } from "../types";

export function verifyEmailMutation({ token }: VerifyEmailRequest) {
  return fetchClient<void>(`/api/v1/auth/verify/${token}`, {
    method: "POST",
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: verifyEmailMutation,
  });
}
