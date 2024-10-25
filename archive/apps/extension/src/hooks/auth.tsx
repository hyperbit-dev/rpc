/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchClient, storage } from "~/utils";

export type AuthUser = {
  token: string;
};

const AuthContext = createContext<AuthUser | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(storage.get("user"));
  const navigate = useNavigate();

  const login = async (data: { email: string; password: string }) => {
    try {
      const res = await fetchClient(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      setUser(res);
      storage.set("user", res);
      navigate("/account");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    try {
      const res = await fetchClient(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      setUser(res);
      storage.set("user", res);
      navigate("/account");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const logout = async () => {
    try {
      await fetchClient(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
      });
    } catch {
      console.log("Failed to logout. Logging out locally...");
    }
    setUser(null);
    storage.remove("user");
    navigate("/");
  };

  const google = async (token: string) => {
    try {
      const res = await fetchClient(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        {
          method: "POST",
          body: JSON.stringify({ token }),
        },
      );
      if (res.errors) {
        throw new Error(res.errors[0].message);
      }
      setUser(res);
      storage.set("user", res);
      navigate("/account");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      google,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );
  // @ts-expect-error TODO
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// @ts-expect-error TODO
export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth should be used within <AuthProvider />");
  return context;
};
