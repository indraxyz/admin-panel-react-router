import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "~/features/auth/types";

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthActions {
  signIn: (user: User, token: string) => void;
  signOut: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      signIn: (user, token) => {
        set({ user, token });
      },

      signOut: () => {
        set({ user: null, token: null });
      },

      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      // Skip hydration on server, handle manually on client
      skipHydration: true,
    }
  )
);

// Selectors for optimized re-renders
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.user !== null);
