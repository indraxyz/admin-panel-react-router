import * as React from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Shield,
  FileText,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import type { User } from "~/features/auth/types";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    items: [
      {
        title: "All Users",
        url: "/dashboard/users",
      },
      {
        title: "Add User",
        url: "/dashboard/users/new",
      },
      {
        title: "Roles & Permissions",
        url: "/dashboard/users/roles",
      },
      {
        title: "User Activity",
        url: "/dashboard/users/activity",
      },
    ],
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
    items: [
      {
        title: "Overview",
        url: "/dashboard/analytics",
      },
      {
        title: "Traffic",
        url: "/dashboard/analytics/traffic",
      },
      {
        title: "Revenue",
        url: "/dashboard/analytics/revenue",
      },
      {
        title: "Performance",
        url: "/dashboard/analytics/performance",
      },
    ],
  },
  {
    title: "Security",
    url: "/dashboard/security",
    icon: Shield,
    items: [
      {
        title: "Security Overview",
        url: "/dashboard/security",
      },
      {
        title: "Firewall Rules",
        url: "/dashboard/security/firewall",
      },
      {
        title: "Access Logs",
        url: "/dashboard/security/logs",
      },
      {
        title: "Threat Detection",
        url: "/dashboard/security/threats",
      },
    ],
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
    items: [
      {
        title: "All Reports",
        url: "/dashboard/reports",
      },
      {
        title: "User Reports",
        url: "/dashboard/reports/users",
      },
      {
        title: "System Reports",
        url: "/dashboard/reports/system",
      },
      {
        title: "Custom Reports",
        url: "/dashboard/reports/custom",
      },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    items: [
      {
        title: "General",
        url: "/dashboard/settings",
      },
      {
        title: "Account",
        url: "/dashboard/account",
      },
      {
        title: "Notifications",
        url: "/dashboard/settings/notifications",
      },
      {
        title: "Integrations",
        url: "/dashboard/settings/integrations",
      },
      {
        title: "API Keys",
        url: "/dashboard/settings/api",
      },
    ],
  },
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User | null }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            <Shield className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Admin Panel</span>
            <span className="text-muted-foreground truncate text-xs">
              Management System
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
