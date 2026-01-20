import { z } from "zod";

const clientEnvSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
});

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  SESSION_SECRET: z.string().min(32).optional(),
});

type ClientEnv = z.infer<typeof clientEnvSchema>;
type ServerEnv = z.infer<typeof serverEnvSchema>;

function validateClientEnv(): ClientEnv {
  const parsed = clientEnvSchema.safeParse({
    VITE_API_URL: import.meta.env.VITE_API_URL,
  });

  if (!parsed.success) {
    console.error("Invalid client environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid client environment variables");
  }

  return parsed.data;
}

function validateServerEnv(): ServerEnv {
  if (typeof process === "undefined") {
    return { NODE_ENV: "development" };
  }

  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    SESSION_SECRET: process.env.SESSION_SECRET,
  });

  if (!parsed.success) {
    console.error("Invalid server environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid server environment variables");
  }

  return parsed.data;
}

const clientEnv = validateClientEnv();
const serverEnv = validateServerEnv();

export const env = {
  client: clientEnv,
  server: serverEnv,
} as const;

export const config = {
  apiUrl: clientEnv.VITE_API_URL ?? "http://localhost:3000/api",
  appEnv: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
