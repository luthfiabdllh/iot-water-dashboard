"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  History,
  CalendarClock,
  Users,
  Settings,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/layouts/nav-group";
import type { SidebarNavGroup } from "@/components/layouts/nav-config";
import Image from "next/image";

interface AppSidebarProps {
  userName?: string;
  userRole?: string;
}

export function AppSidebar({}: AppSidebarProps = {}) {
  const pathname = usePathname();
  const { state, toggleSidebar, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isRouteActive = (route: string) =>
    pathname === `/${route}` || (route === "dashboard" && pathname === "/");

  const navGroups: SidebarNavGroup[] = [
    {
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <LayoutGrid />,
          isActive: isRouteActive("dashboard"),
        },
        {
          title: "History",
          path: "/history",
          icon: <History />,
          isActive: pathname === "/history",
        },
      ],
    },
    {
      label: "Automation",
      items: [
        {
          title: "Schedules",
          path: "/dashboard",
          icon: <CalendarClock />,
        }
      ],
    },
    {
      label: "Management",
      items: [
        {
          title: "Users",
          path: "/users",
          icon: <Users />,
          isActive: isRouteActive("users"),
        },
        {
          title: "Settings",
          path: "/settings",
          icon: <Settings />,
          isActive: isRouteActive("settings") || isRouteActive("profile"),
          subItems: [
            { title: "Profile", path: "/profile" },
            { title: "System", path: "/settings" },
          ],
        },
      ],
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="*:data-[sidebar=sidebar]:rounded-2xl *:data-[sidebar=sidebar]:shadow-xl"
    >
      {/* Brand */}
      <SidebarHeader className="py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              tooltip="Sinergi IoT Watering"
              className="hover:bg-transparent active:bg-transparent"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 shrink-0 items-center justify-center">
                  <Image src="/logo_water.svg" width={24} height={24} alt="Logo" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-sm font-semibold text-sidebar-accent-foreground">
                    Sinergi IoT
                  </span>
                  <span className="truncate text-[11px] text-sidebar-foreground">
                    Watering System
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="gap-3">
        {navGroups.map((group) => (
          <NavGroup key={group.label} {...group} />
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help & Docs">
              <Link href="/settings">
                <HelpCircle />
                <span>Help & Docs</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {!isMobile && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleSidebar}
                tooltip={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
                <span>Collapse</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
