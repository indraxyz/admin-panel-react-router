import { Link } from "react-router";
import type { Route } from "./+types/home";
import { RequireGuest } from "~/components/route-guards";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Shield,
  Zap,
  Lock,
  BarChart3,
  Users,
  Settings,
  ArrowRight,
} from "lucide-react";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Kisum Admin  -  Team" },
    {
      name: "description",
      content: " admin  for Kisum team - Manage events and operations",
    },
  ];
}

const features = [
  {
    icon: Shield,
    title: "Secure",
    description:
      "Enterprise-grade security with encrypted data and secure authentication for  operations",
  },
  {
    icon: Zap,
    title: "Fast",
    description:
      "Lightning-fast performance to manage events, registrations, and attendees efficiently",
  },
  {
    icon: Lock,
    title: "Reliable",
    description:
      "Built with modern technologies to ensure operations run smoothly without interruption",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Comprehensive event analytics and reporting tools to track attendance and engagement metrics",
  },
  {
    icon: Users,
    title: "Attendee Management",
    description:
      "Manage event attendees, registrations, and access control from one place",
  },
  {
    icon: Settings,
    title: "Event Configuration",
    description:
      "Configure and customize event settings to meet operational requirements",
  },
];

export default function Home() {
  return (
    <RequireGuest>
      <div className="from-background to-muted/20 min-h-screen bg-gradient-to-b">
        {/* Header with Theme Toggle */}
        <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
          <div className="container flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-lg sm:h-8 sm:w-8">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>
              <span className="text-sm font-semibold sm:text-base">
                Kisum Admin
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Sign In</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="bg-muted/50 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm sm:mb-8 sm:px-4 sm:py-2">
              <Shield className="text-primary h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-muted-foreground">
                Kisum team access only
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-transparent">
                Kisum Admin
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-base sm:mb-10 sm:text-lg md:text-xl">
              Manage events, registrations, and operations from one centralized
              dashboard
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/signin">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 text-center sm:mb-12">
                <h2 className="mb-3 text-2xl font-bold tracking-tight sm:mb-4 sm:text-3xl md:text-4xl">
                  Everything you need
                </h2>
                <p className="text-muted-foreground mx-auto max-w-xl text-sm sm:text-base md:text-lg">
                  All the tools and features the Kisum team needs to manage
                  events effectively
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <Card
                      key={feature.title}
                      className="group hover:border-primary/50 transition-all duration-200 hover:shadow-md"
                    >
                      <CardHeader className="pb-2 sm:pb-4">
                        <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors sm:mb-4 sm:h-12 sm:w-12">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-sm leading-relaxed sm:text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Card className="bg-muted/50 mx-auto max-w-2xl border-2">
            <CardContent className="p-6 text-center sm:p-8 md:p-10">
              <h3 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
                Ready to get started?
              </h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Sign in with your Kisum team account to access the admin tools
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/signin">
                    Sign In Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link to="/signup">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </RequireGuest>
  );
}
