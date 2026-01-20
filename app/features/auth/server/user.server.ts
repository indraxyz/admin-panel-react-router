import type { User } from "~/features/auth/types";

const userStore = new Map<
  string,
  {
    user: User;
    passwordHash: string;
  }
>();

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: User["role"] = "user"
): Promise<User> {
  if (userStore.has(email.toLowerCase())) {
    throw new Error("User with this email already exists");
  }

  const passwordHash = await hashPassword(password);

  const user: User = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    name,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  userStore.set(email.toLowerCase(), {
    user,
    passwordHash,
  });

  console.log("✅ User created:", {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  });

  return user;
}

export async function verifyCredentials(
  email: string,
  password: string
): Promise<User | null> {
  await ensureInitialized();
  const stored = userStore.get(email.toLowerCase());

  if (!stored) {
    return null;
  }

  const isValid = await verifyPassword(password, stored.passwordHash);

  if (!isValid) {
    return null;
  }

  return stored.user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  await ensureInitialized();
  const stored = userStore.get(email.toLowerCase());
  return stored?.user || null;
}

export async function getUserById(id: string): Promise<User | null> {
  await ensureInitialized();
  for (const [, { user }] of userStore) {
    if (user.id === id) {
      return user;
    }
  }
  return null;
}

export async function updateUser(
  userId: string,
  updates: {
    name?: string;
    email?: string;
    password?: string;
  }
): Promise<User> {
  await ensureInitialized();

  let userToUpdate: User | null = null;
  let storedEntry: { user: User; passwordHash: string } | null = null;
  let oldEmail: string | null = null;

  for (const [email, entry] of userStore) {
    if (entry.user.id === userId) {
      userToUpdate = entry.user;
      storedEntry = entry;
      oldEmail = email;
      break;
    }
  }

  if (!userToUpdate || !storedEntry || !oldEmail) {
    throw new Error("User not found");
  }

  const updatedUser: User = {
    ...userToUpdate,
    name: updates.name ?? userToUpdate.name,
    email: updates.email ? updates.email.toLowerCase() : userToUpdate.email,
    updatedAt: new Date().toISOString(),
  };

  let newPasswordHash = storedEntry.passwordHash;
  if (updates.password) {
    newPasswordHash = await hashPassword(updates.password);
  }

  if (updates.email && updates.email.toLowerCase() !== oldEmail) {
    if (userStore.has(updates.email.toLowerCase())) {
      throw new Error("Email already in use");
    }
    userStore.delete(oldEmail);
    userStore.set(updates.email.toLowerCase(), {
      user: updatedUser,
      passwordHash: newPasswordHash,
    });
  } else {
    userStore.set(oldEmail, {
      user: updatedUser,
      passwordHash: newPasswordHash,
    });
  }

  console.log("✅ User updated:", {
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    role: updatedUser.role,
    updatedAt: updatedUser.updatedAt,
    changes: {
      name: updates.name ? "updated" : "unchanged",
      email: updates.email ? "updated" : "unchanged",
      password: updates.password ? "updated" : "unchanged",
    },
  });

  return updatedUser;
}

let initialized = false;

async function initializeDefaultUsers() {
  if (initialized) return;
  if (!userStore.has("admin@example.com")) {
    await createUser("admin@example.com", "admin123", "Admin User", "admin");
  }
  initialized = true;
}

export async function ensureInitialized() {
  await initializeDefaultUsers();
}
