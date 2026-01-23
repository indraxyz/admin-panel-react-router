import * as React from "react";
import { Shield } from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { APP_BRANDING, NAV_ITEMS } from "~/lib/constants";
import type { User } from "~/features/auth/types";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: User | null }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 pt-2">
          <div className="text-primary flex items-center justify-center">
            <Shield className="size-8" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{APP_BRANDING.NAME}</span>
            <span className="text-muted-foreground truncate text-xs">
              {APP_BRANDING.DESCRIPTION}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
