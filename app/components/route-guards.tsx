import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "~/contexts/auth.context";

function LoadingFallback() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    </div>
  );
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  // While loading, return the loading fallback
  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function RequireGuest({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();

  // While loading, return the loading fallback
  if (isLoading) {
    return <LoadingFallback />;
  }

  // If authenticated, redirect to dashboard immediately without rendering children
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
