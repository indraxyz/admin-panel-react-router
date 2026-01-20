import { useAuthContext } from "~/contexts/auth.context";

export function useAuth() {
  const { user, isAuthenticated } = useAuthContext();
  return {
    user,
    isAuthenticated,
  };
}
