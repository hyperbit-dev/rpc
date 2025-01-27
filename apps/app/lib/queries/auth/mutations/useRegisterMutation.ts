import { useMutation } from "@tanstack/react-query";
import { fetchNexus } from "@/utils/fetch-client";
import { AuthResponse, RegisterRequest } from "../types";

function registerMutation(body: RegisterRequest) {
  return fetchNexus<AuthResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: registerMutation,
    onSuccess: (data) => {
      sessionStorage.setItem("auth", JSON.stringify(data));
    },
  });
}
