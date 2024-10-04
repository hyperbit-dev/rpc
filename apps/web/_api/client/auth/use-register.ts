import { useMutation } from "@tanstack/react-query";
import { fetchNexus } from "../fetchClient";
import { AuthResponse, RegisterRequest } from "./types";

function authRegisterMutation(body: RegisterRequest) {
  return fetchNexus<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function useAuthRegisterMutation() {
  return useMutation({
    mutationFn: authRegisterMutation,
    onSuccess: (data) => {
      if (data?.token) {
        sessionStorage.setItem("auth", JSON.stringify(data));
      }
    },
  });
}
