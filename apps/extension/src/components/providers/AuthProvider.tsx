import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { encrypt } from "@metamask/browser-passworder";
import { v4 as uuidv4 } from "uuid";
import { storage } from "~/utils";

type User = { token: string; password: string };

type AuthContext = {
  loading: boolean;
  token: string;
  user?: User;
  login: (password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>(() => storage.get("token") || "");
  const [user, setUser] = useState<AuthContext["user"]>(
    () => storage.get("user") || undefined
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      token,
      user,
      login: (password: string) => {
        const token = uuidv4();
        setToken("token"), storage.set("token", token);
        setUser({ token, password }),
          storage.set("user", { password: encrypt(token, password) });
      },
      logout: () => {
        setToken(""), storage.remove("token");
        setUser(undefined), storage.remove("user");
      },
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth should be used within <AuthProvider />");
  return context;
};
