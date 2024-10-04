import { useMutation } from "@tanstack/react-query";
import { fetchNexus } from "../fetchClient";
import { AuthResponse, LoginRequest } from "./types";

function authLoginMutation(body: LoginRequest) {
  return fetchNexus<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useAuthLoginMutation() {
  return useMutation({
    mutationFn: authLoginMutation,
    onSuccess: (data) => {
      if (data?.token) {
        sessionStorage.setItem("auth", JSON.stringify(data));
      }
    },
  });
}
