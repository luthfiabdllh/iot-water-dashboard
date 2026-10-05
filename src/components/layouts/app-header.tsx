"use client";

import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { CustomSidebarTrigger } from "@/components/layouts/custom-sidebar-trigger";
import { NavUser } from "@/components/layouts/nav-user";

interface AppHeaderProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export function AppHeader({
  userName = "User",
  userEmail,
  userRole,
}: AppHeaderProps) {
  return (
    <header
      id="dashboard-header"
      className="mb-4 flex h-12 shrink-0 items-center justify-between gap-3"
      aria-label="Dashboard header"
    >
      {/* Left: sidebar trigger + live metric pills */}
      <div className="flex min-w-0 items-center gap-2">
        <CustomSidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-1 h-4 data-[orientation=vertical]:self-center"
        />
        <span className="text-sm font-medium lg:hidden">Dashboard</span>
      </div>

      {/* Right: search, notifications, user */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="global-search"
            type="search"
            placeholder="Search zones, sensors…"
            className="h-9 w-56 rounded-full bg-card pl-8 pr-12 text-xs lg:w-64"
            aria-label="Search"
          />
          <Kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
            ⌘K
          </Kbd>
        </div>

        <Button
          id="notifications-button"
          variant="outline"
          size="icon"
          className="relative size-9 rounded-full bg-card"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <Badge className="absolute -right-1.5 -top-1.5 h-4 min-w-4 rounded-full bg-amber-600 px-1 text-[10px] text-white">
            8
          </Badge>
        </Button>

        <NavUser
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
        />
      </div>
    </header>
  );
}
