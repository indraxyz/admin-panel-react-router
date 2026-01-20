import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, Mail, Lock, Save, Loader2, CheckCircle2 } from "lucide-react";
import type { Route } from "./+types/account";
import { useAuthContext } from "~/contexts/auth.context";
import { Button } from "~/components/ui/button";
import { FormField } from "~/components/ui/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { zodResolver } from "~/lib/utils/zod-resolver";

const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
});

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Account Settings - Admin Panel" },
    { name: "description", content: "Manage your account settings" },
  ];
}

export default function AccountPage() {
  const { user, updateUser } = useAuthContext();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "" },
  });

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: user?.email ?? "" },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Update user in context and localStorage
      updateUser({ name: data.name });
      showSuccess("Profile updated successfully");
    } catch {
      showError("Failed to update profile");
    }
  };

  const onEmailSubmit = async (data: EmailFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Update user in context and localStorage
      updateUser({ email: data.email });
      showSuccess("Email updated successfully");
    } catch {
      showError("Failed to update email");
    }
  };

  const onPasswordSubmit = async (_data: PasswordFormData) => {
    try {
      // Simulate API call - in real app, this would call your backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      showSuccess("Password updated successfully");
      resetPassword();
    } catch {
      showError("Failed to update password");
    }
  };

  if (!user) {
    return null;
  }

  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      {successMessage && (
        <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {successMessage}
              </p>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              aria-label="Dismiss"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              {errorMessage}
            </p>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              aria-label="Dismiss"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <User className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your name and profile details
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 pb-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Separator className="mb-6" />
            <form
              onSubmit={handleProfileSubmit(onProfileSubmit)}
              className="space-y-4"
            >
              <FormField
                label="Full Name"
                type="text"
                {...registerProfile("name")}
                error={profileErrors.name?.message}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isProfileSubmitting}>
                  {isProfileSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Mail className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>Email Address</CardTitle>
                <CardDescription>
                  Change your email address. You&apos;ll need to verify the new
                  email.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleEmailSubmit(onEmailSubmit)}
              className="space-y-4"
            >
              <FormField
                label="Email Address"
                type="email"
                {...registerEmail("email")}
                error={emailErrors.email?.message}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isEmailSubmitting}
                  variant="outline"
                >
                  {isEmailSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Update Email
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Lock className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                label="Current Password"
                type="password"
                {...registerPassword("currentPassword")}
                error={passwordErrors.currentPassword?.message}
              />
              <FormField
                label="New Password"
                type="password"
                {...registerPassword("newPassword")}
                error={passwordErrors.newPassword?.message}
              />
              <FormField
                label="Confirm New Password"
                type="password"
                {...registerPassword("confirmPassword")}
                error={passwordErrors.confirmPassword?.message}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isPasswordSubmitting}
                  variant="outline"
                >
                  {isPasswordSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
