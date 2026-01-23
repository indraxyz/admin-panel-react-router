import type { z } from "zod";
import type {
  FieldErrors,
  FieldValues,
  Resolver,
  ResolverResult,
} from "react-hook-form";

/**
 * Custom Zod resolver for react-hook-form that uses safeParse
 * to avoid uncaught promise rejections when validation fails.
 *
 * This is a workaround for compatibility issues between
 * @hookform/resolvers and certain Zod versions.
 */
export function zodResolver<T extends FieldValues>(
  schema: z.Schema<T>
): Resolver<T> {
  return async (data: T): Promise<ResolverResult<T, T>> => {
    const result = schema.safeParse(data);

    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors: FieldErrors<T> = {};

    for (const issue of result.error.issues) {
      const path = issue.path.join(".") as keyof T;
      if (!errors[path]) {
        errors[path] = {
          type: issue.code,
          message: issue.message,
        } as FieldErrors<T>[typeof path];
      }
    }

    return { values: {}, errors };
  };
}
