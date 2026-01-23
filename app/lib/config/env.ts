import { z } from "zod";

const clientEnvSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
});

type ClientEnv = z.infer<typeof clientEnvSchema>;

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

const clientEnv = validateClientEnv();

export const env = {
  client: clientEnv,
} as const;

export const config = {
  apiUrl: clientEnv.VITE_API_URL ?? "http://localhost:3000/api",
  appEnv: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
