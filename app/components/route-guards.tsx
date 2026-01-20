import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "~/contexts/auth.context";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  // While loading, return null - the initial loader in root.tsx handles the UI
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function RequireGuest({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();

  // While loading, return null - the initial loader in root.tsx handles the UI
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
