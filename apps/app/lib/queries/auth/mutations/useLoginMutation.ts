import { useMutation } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import { AuthResponse, LoginRequest } from "../types";

function loginMutation(body: LoginRequest) {
  return fetchNexus<AuthResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      sessionStorage.setItem("auth", JSON.stringify(data));
    },
  });
}
