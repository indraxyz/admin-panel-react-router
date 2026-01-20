import { authApi } from "~/features/auth/api/auth";
import {
  createSession,
  createSessionCookie,
} from "~/features/auth/server/session.server";
import type { SignInCredentials, SignUpData } from "~/features/auth/types";

export async function signInAction(credentials: SignInCredentials) {
  try {
    const response = await authApi.signIn(credentials);
    const sessionId = await createSession(response.user);
    const cookie = createSessionCookie(sessionId);

    return {
      success: true,
      user: response.user,
      cookie,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sign in",
    };
  }
}

export async function signUpAction(data: SignUpData) {
  try {
    const response = await authApi.signUp(data);
    const sessionId = await createSession(response.user);
    const cookie = createSessionCookie(sessionId);

    return {
      success: true,
      user: response.user,
      cookie,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to sign up",
    };
  }
}
