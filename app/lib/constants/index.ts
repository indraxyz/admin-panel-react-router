import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Shield,
  FileText,
  type LucideIcon,
} from "lucide-react";

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
} as const;

export const USE_MOCK_AUTH = true;

export const SIDEBAR = {
  COOKIE_NAME: "sidebar_state",
  COOKIE_MAX_AGE: 60 * 60 * 24 * 7,
  WIDTH: "16rem",
  WIDTH_MOBILE: "18rem",
  WIDTH_ICON: "3rem",
  KEYBOARD_SHORTCUT: "b",
} as const;

export const MOBILE_BREAKPOINT = 768;

export const THEME_STORAGE_KEY = "app-theme";

export const APP_BRANDING = {
  NAME: "Admin Panel",
  DESCRIPTION: "Data Management",
} as const;

export const NAV_ITEMS: {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}[] = [
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
    url: "/settings",
    icon: Settings,
    items: [
      {
        title: "General",
        url: "/settings",
      },
      {
        title: "Account",
        url: "/account",
      },
      {
        title: "Notifications",
        url: "/settings/notifications",
      },
      {
        title: "Integrations",
        url: "/settings/integrations",
      },
      {
        title: "API Keys",
        url: "/settings/api",
      },
    ],
  },
];
