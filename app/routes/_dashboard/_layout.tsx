import * as React from "react";
import { Outlet, useLocation } from "react-router";
import { useAuthContext } from "~/contexts/auth.context";
import { RequireAuth } from "~/components/route-guards";
import { AppSidebar } from "~/components/app-sidebar";
import { ThemeToggle } from "~/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

export default function DashboardLayout() {
  const { user } = useAuthContext();
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);

    if (segments.length === 1 && segments[0] === "dashboard") {
      return [{ label: "Dashboard", href: "/dashboard" }];
    }

    const items = [{ label: "Dashboard", href: "/dashboard" }];

    if (segments[1] === "account") {
      items.push({ label: "Account", href: "/dashboard/account" });
    } else if (segments[1] === "settings") {
      items.push({ label: "Settings", href: "/dashboard/settings" });
    } else if (segments.length > 1) {
      const lastSegment = segments[segments.length - 1];
      const label = lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      items.push({ label, href: path });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <RequireAuth>
      <SidebarProvider collapsible="icon">
        <AppSidebar user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex flex-1 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.href}>
                      {index > 0 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                      <BreadcrumbItem
                        className={
                          index === breadcrumbItems.length - 1
                            ? ""
                            : "hidden md:block"
                        }
                      >
                        {index === breadcrumbItems.length - 1 ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href}>
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}
