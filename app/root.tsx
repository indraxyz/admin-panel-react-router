import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { useAuthContext } from "./contexts/auth.context";
import { ThemeProvider } from "./hooks/use-theme";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('app-theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.classList.add(resolvedTheme);
                document.documentElement.style.colorScheme = resolvedTheme;
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Initial loader shown before JS loads - removed by React on hydration */}
        <div id="initial-loader" aria-hidden="true">
          <div className="spinner" />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__hideInitialLoader = function() {
                var loader = document.getElementById('initial-loader');
                if (loader) {
                  loader.classList.add('fade-out');
                  setTimeout(function() { loader.remove(); }, 300);
                }
              };
            `,
          }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground animate-pulse text-sm">
          Loading...
        </p>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    __hideInitialLoader?: () => void;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <HideInitialLoader />
      <Outlet />
    </ThemeProvider>
  );
}

function HideInitialLoader() {
  const { isLoading } = useAuthContext();

  // Only hide the initial loader after auth store is hydrated
  if (
    !isLoading &&
    typeof window !== "undefined" &&
    window.__hideInitialLoader
  ) {
    window.__hideInitialLoader();
  }

  return null;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    if (import.meta.env.DEV) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const wellKnownPaths = [
        "/.well-known/",
        "com.chrome.devtools.json",
        "/favicon.ico",
        "/robots.txt",
      ];

      if (wellKnownPaths.some((path) => errorMessage.includes(path))) {
        return null;
      }
    }

    return (
      <main className="container mx-auto p-4 pt-16">
        <h1>404</h1>
        <p>The requested page could not be found.</p>
      </main>
    );
  }

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = "Error";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    const errorMessage = error.message;
    const wellKnownPaths = ["/.well-known/", "com.chrome.devtools.json"];

    if (wellKnownPaths.some((path) => errorMessage.includes(path))) {
      return null;
    }

    details = errorMessage;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
