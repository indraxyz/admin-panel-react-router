import type { Route } from "./+types/_index";
import { useAuthContext } from "~/contexts/auth.context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Users, Activity, Shield, TrendingUp } from "lucide-react";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Dashboard - Admin Panel" },
    { name: "description", content: "Admin dashboard home" },
  ];
}

export default function Dashboard() {
  const { user } = useAuthContext();

  const stats = [
    {
      title: "Total Users",
      value: "0",
      description: "Registered users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Sessions",
      value: "0",
      description: "Current sessions",
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "System Status",
      value: "OK",
      description: "All systems operational",
      icon: Shield,
      color: "text-emerald-600",
    },
    {
      title: "Growth",
      value: "+12%",
      description: "This month",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name ?? "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your admin panel today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-muted-foreground text-xs">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Your admin dashboard overview and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground text-sm">
                Charts and analytics will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">System updated</p>
                  <p className="text-muted-foreground text-xs">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-muted-foreground text-xs">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Security scan completed</p>
                  <p className="text-muted-foreground text-xs">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
