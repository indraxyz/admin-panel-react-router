import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Shield, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import type { Route } from "./+types/signin";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { FormField } from "~/components/ui/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { RequireGuest } from "~/components/route-guards";
import { useAuthContext } from "~/contexts/auth.context";
import { signIn as signInApi } from "~/features/auth/api/auth";
import { cn } from "~/lib/utils";
import { zodResolver } from "~/lib/utils/zod-resolver";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Sign In - Admin Dashboard" },
    { name: "description", content: "Sign in to your admin account" },
  ];
}

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { signIn } = useAuthContext();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: SignInFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await signInApi(data);
      signIn(response.user, response.token);
      navigate(redirectTo);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during sign in"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequireGuest>
      <div className="from-background via-background to-muted/20 flex min-h-screen items-center justify-center bg-gradient-to-br px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Back to Home Link */}
          <div className="flex justify-start">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </div>

          {/* Logo/Brand Section */}
          <div className="space-y-2 text-center">
            <div className="bg-primary text-primary-foreground mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your admin account to continue
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-5">
                {/* Demo credentials hint */}
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm dark:border-blue-800 dark:bg-blue-950">
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    Demo Credentials
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Email: admin@example.com | Password: password123
                  </p>
                </div>

                {error && (
                  <div
                    className="bg-destructive/10 border-destructive/20 text-destructive flex items-start gap-3 rounded-lg border p-4 text-sm"
                    role="alert"
                  >
                    <div className="mt-0.5 shrink-0">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Error</p>
                      <p className="mt-1">{error}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <FormField
                    {...register("email")}
                    type="email"
                    label="Email address"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    autoComplete="email"
                    autoFocus
                  />

                  {/* Password field with toggle */}
                  <div className="w-full space-y-2">
                    <Label
                      htmlFor="password"
                      className={errors.password ? "text-destructive" : ""}
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        {...register("password")}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        aria-invalid={errors.password ? "true" : "false"}
                        className={cn(
                          "pr-10",
                          errors.password && "border-destructive"
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm font-medium">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="group flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      className="text-primary focus:ring-primary rounded border-gray-300"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-6">
                <Button
                  type="submit"
                  className="h-11 w-full text-base font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Sign In
                    </>
                  )}
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card text-muted-foreground px-2">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </div>
                <p className="text-muted-foreground text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </RequireGuest>
  );
}
