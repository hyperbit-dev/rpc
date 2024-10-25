import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/hooks";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      navigate("/");
      return;
    }

    if (!auth?.user) {
      navigate("/");
      return;
    }
  }, [auth?.user, navigate]);

  if (!auth?.user) {
    return null;
  }

  return children;
};
