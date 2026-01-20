import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // If authenticated and not already redirecting, navigate to dashboard
    if (!isLoading && isAuthenticated && !isRedirecting) {
      setTimeout(() => {
        setIsRedirecting(true);
      }, 0);
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isLoading, isRedirecting, navigate]);

  // While loading, return null - the initial loader in root.tsx handles the UI
  if (isLoading) {
    return null;
  }

  // Keep showing children during redirect to prevent white flash
  return <>{children}</>;
}
