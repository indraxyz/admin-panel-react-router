import { redirect } from "react-router";
import type { User } from "~/features/auth/types";

const sessionStore = new Map<string, { user: User; expiresAt: number }>();

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7;

export async function createSession(user: User): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + SESSION_DURATION;

  sessionStore.set(sessionId, { user, expiresAt });

  return sessionId;
}

export async function getSession(
  sessionId: string | null
): Promise<User | null> {
  if (!sessionId) return null;

  const session = sessionStore.get(sessionId);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessionStore.delete(sessionId);
    return null;
  }

  return session.user;
}

export async function updateSessionForUser(
  userId: string,
  updatedUser: User
): Promise<void> {
  for (const [sessionId, session] of sessionStore) {
    if (session.user.id === userId) {
      sessionStore.set(sessionId, {
        ...session,
        user: updatedUser,
      });
    }
  }
}

export async function destroySession(sessionId: string): Promise<void> {
  sessionStore.delete(sessionId);
}

export async function destroySessionFromRequest(
  request: Request
): Promise<void> {
  const cookieHeader = request.headers.get("Cookie");
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [key, ...rest] = cookie.split("=");
        return [key, rest.join("=")];
      })
    );

    const sessionId = cookies["session-id"];
    if (sessionId) {
      await destroySession(sessionId);
    }
  }
}

export async function getSessionFromRequest(
  request: Request
): Promise<User | null> {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((cookie) => {
      const [key, ...rest] = cookie.split("=");
      return [key, rest.join("=")];
    })
  );

  const sessionId = cookies["session-id"];
  return getSession(sessionId);
}

export async function requireAuth(request: Request): Promise<User> {
  const user = await getSessionFromRequest(request);

  if (!user) {
    throw redirect("/signin");
  }

  return user;
}

export function createSessionCookie(sessionId: string): string {
  return `session-id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
    SESSION_DURATION / 1000
  }`;
}
