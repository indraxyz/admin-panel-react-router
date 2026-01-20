import { useSyncExternalStore } from "react";
import type { User } from "~/features/auth/types";
import { useAuthStore } from "~/stores/auth.store";

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (user: User, token: string) => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// Track hydration state outside React to avoid re-renders
let isHydrated = false;

function subscribeToHydration(callback: () => void) {
  const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
    isHydrated = true;
    callback();
  });

  // Trigger hydration on first subscription
  if (!isHydrated && typeof window !== "undefined") {
    useAuthStore.persist.rehydrate();
  }

  return unsubscribe;
}

function getHydrationSnapshot() {
  return isHydrated;
}

function getServerSnapshot() {
  return false;
}

/**
 * Hook to access auth state and actions.
 * Uses Zustand store internally for state management.
 */
export function useAuthContext(): AuthContextValue {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getServerSnapshot
  );

  const user = useAuthStore((state) => state.user);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);
  const updateUser = useAuthStore((state) => state.updateUser);

  return {
    user,
    isAuthenticated: user !== null,
    isLoading: !hydrated,
    signIn,
    signOut,
    updateUser,
  };
}

// Re-export individual selectors for optimized subscriptions
export { useUser, useIsAuthenticated } from "~/stores/auth.store";
