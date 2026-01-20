import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import {
  getSessionFromRequest,
  requireAuth,
} from "~/features/auth/server/session.server";
import type { User } from "~/features/auth/types";

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
}

export async function createAuthContext(
  request: Request
): Promise<AuthContext> {
  const user = await getSessionFromRequest(request);
  return {
    user,
    isAuthenticated: !!user,
  };
}

export async function requireAuthMiddleware(
  args: LoaderFunctionArgs
): Promise<User> {
  return requireAuth(args.request);
}

export async function requireGuestMiddleware(
  args: LoaderFunctionArgs
): Promise<null> {
  const user = await getSessionFromRequest(args.request);

  if (user) {
    throw redirect("/dashboard");
  }

  return null;
}

export async function requireRoleMiddleware(
  args: LoaderFunctionArgs,
  allowedRoles: User["role"][]
): Promise<User> {
  const user = await requireAuth(args.request);

  if (!allowedRoles.includes(user.role)) {
    throw redirect("/dashboard", { status: 403 });
  }

  return user;
}
