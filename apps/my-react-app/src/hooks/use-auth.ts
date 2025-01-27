export type AuthState = {
  type: string;
  name?: string;
  token: string;
  abilities: string[];
  lastUsedAt?: string;
  expiresAt?: string;
};

export function useAuth(): AuthState | undefined {
  const auth = sessionStorage.getItem("auth");
  return auth ? JSON.parse(auth) : undefined;
}
