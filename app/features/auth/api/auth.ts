import { apiClient } from "~/lib/api/client";
import type {
  User,
  SignInCredentials,
  SignUpData,
  AuthResponse,
} from "~/features/auth/types";

// Set to true to use mock authentication (no backend required)
// Set to false when you have a real API backend
const USE_MOCK_AUTH = true;

export async function signIn(
  credentials: SignInCredentials
): Promise<AuthResponse> {
  // Mock authentication for demo/development
  if (USE_MOCK_AUTH) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const email = credentials.email?.trim().toLowerCase();
    const password = credentials.password;

    // Mock validation - accepts any valid email with password "password123"
    // Or the default admin account
    const isValidAdmin =
      email === "admin@example.com" && password === "password123";
    const isAnyUserWithPassword = password === "password123" && email;

    if (isValidAdmin || isAnyUserWithPassword) {
      return {
        user: {
          id: "1",
          email: email,
          name: isValidAdmin ? "Admin User" : email.split("@")[0],
          role: isValidAdmin ? "admin" : "user",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: "mock-jwt-token-" + Date.now(),
      };
    }
    throw new Error("Invalid email or password. Use password: password123");
  }

  return apiClient.post<AuthResponse>("/auth/signin", credentials);
}

export async function signUp(
  data: Omit<SignUpData, "confirmPassword">
): Promise<AuthResponse> {
  // Mock authentication for demo/development
  if (USE_MOCK_AUTH) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      user: {
        id: crypto.randomUUID(),
        email: data.email,
        name: data.name,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: "mock-jwt-token-" + Date.now(),
    };
  }

  return apiClient.post<AuthResponse>("/auth/signup", data);
}

export async function signOut(): Promise<void> {
  if (USE_MOCK_AUTH) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return;
  }

  return apiClient.post("/auth/signout");
}

export async function getCurrentUser(): Promise<User> {
  return apiClient.get<User>("/auth/me");
}

export async function refreshToken(): Promise<{ token: string }> {
  return apiClient.post<{ token: string }>("/auth/refresh");
}

export const authApi = {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  refreshToken,
};
