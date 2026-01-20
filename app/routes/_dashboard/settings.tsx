import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Bell,
  Globe,
  Palette,
  Shield,
  Save,
  Loader2,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import type { Route } from "./+types/settings";
import { useTheme } from "~/hooks/use-theme";
import { Button } from "~/components/ui/button";
import { FormField } from "~/components/ui/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const generalSettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  siteDescription: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  language: z.string().min(1, "Language is required"),
});

type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>;

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "General Settings - Admin Panel" },
    { name: "description", content: "Manage general application settings" },
  ];
}

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register: registerGeneral,
    handleSubmit: handleGeneralSubmit,
    formState: { errors: generalErrors },
  } = useForm<GeneralSettingsFormData>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "Admin Panel",
      siteDescription: "Management System",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: "en",
    },
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

  const onGeneralSubmit = async (_data: GeneralSettingsFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Call API to update settings
      await new Promise((resolve) => setTimeout(resolve, 500));
      showSuccess("General settings updated successfully");
    } catch {
      showError("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onNotificationsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Call API to update notification settings
      await new Promise((resolve) => setTimeout(resolve, 500));
      showSuccess("Notification preferences updated successfully");
    } catch {
      showError("Failed to update notification preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground">
          Configure your application preferences and system settings
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
                <Globe className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic application settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleGeneralSubmit(onGeneralSubmit)}
              className="space-y-4"
            >
              <FormField
                label="Site Name"
                type="text"
                {...registerGeneral("siteName")}
                error={generalErrors.siteName?.message}
              />
              <FormField
                label="Site Description"
                type="text"
                {...registerGeneral("siteDescription")}
                error={generalErrors.siteDescription?.message}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Timezone"
                  type="text"
                  {...registerGeneral("timezone")}
                  error={generalErrors.timezone?.message}
                />
                <FormField
                  label="Language"
                  type="text"
                  {...registerGeneral("language")}
                  error={generalErrors.language?.message}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
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
                <Bell className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onNotificationsSubmit} className="space-y-4">
              <div className="space-y-4">
                <label className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-muted-foreground text-sm">
                      Receive notifications via email
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </label>
                <label className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-muted-foreground text-sm">
                      Receive browser push notifications
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </label>
                <label className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="font-medium">Security Alerts</div>
                    <div className="text-muted-foreground text-sm">
                      Get notified about security events
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="securityAlerts"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </label>
                <label className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="font-medium">Weekly Digest</div>
                    <div className="text-muted-foreground text-sm">
                      Receive a weekly summary of activities
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="weeklyDigest"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </label>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} variant="outline">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Preferences
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
                <Palette className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="mb-3 block text-sm font-medium">
                  Theme Preference
                </p>
                <p className="text-muted-foreground mb-4 text-sm">
                  Choose how the application appears. System will match your
                  device settings.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`relative flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      theme === "light"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        theme === "light"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Sun className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Light</span>
                    {theme === "light" && (
                      <div className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full">
                        <CheckCircle2 className="text-primary-foreground h-3 w-3" />
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`relative flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      theme === "dark"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        theme === "dark"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Moon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">Dark</span>
                    {theme === "dark" && (
                      <div className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full">
                        <CheckCircle2 className="text-primary-foreground h-3 w-3" />
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`relative flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                      theme === "system"
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                        theme === "system"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Monitor className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">System</span>
                    {theme === "system" && (
                      <div className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full">
                        <CheckCircle2 className="text-primary-foreground h-3 w-3" />
                      </div>
                    )}
                  </button>
                </div>
                {theme === "system" && (
                  <p className="text-muted-foreground mt-3 text-xs">
                    Currently using{" "}
                    {resolvedTheme === "dark" ? "dark" : "light"} mode based on
                    your system preference
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <Shield className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Security and privacy settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-muted-foreground text-sm">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="font-medium">Session Management</div>
                  <div className="text-muted-foreground text-sm">
                    View and manage active sessions
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
