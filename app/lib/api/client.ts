import { config } from "~/lib/config/env";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = config.apiUrl) {
    this.baseURL = baseURL;
  }

  async request<T>(
    endpoint: string,
    options?: RequestInit & { params?: Record<string, string> }
  ): Promise<T> {
    const { params, ...fetchOptions } = options || {};

    let url = `${this.baseURL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions?.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: unknown;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = errorText;
      }

      throw new ApiError(
        response.status,
        (errorData as { message?: string })?.message || errorText,
        errorData
      );
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    }

    return response.text() as T;
  }

  get<T>(
    endpoint: string,
    options?: RequestInit & { params?: Record<string, string> }
  ) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
