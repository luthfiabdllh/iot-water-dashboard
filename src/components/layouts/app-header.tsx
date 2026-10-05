"use client";

import { Bell, Droplets, Layers, Zap, Gauge, Activity, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

type HeaderMetric = {
  label: string;
  value: string;
  icon: LucideIcon;
  live?: boolean;
};

// TODO: replace with live telemetry from TanStack Query
const HEADER_METRICS: HeaderMetric[] = [
  { label: "Active", value: "6/10", icon: Droplets, live: true },
  { label: "Zones", value: "6/8", icon: Layers },
  { label: "Pumps", value: "5", icon: Zap },
  { label: "Avg. Moisture", value: "56.2%", icon: Gauge },
  { label: "Flow", value: "94.2%", icon: Activity },
];

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
        <div className="no-scrollbar hidden min-w-0 items-center gap-2 overflow-x-auto lg:flex">
          {HEADER_METRICS.map(({ label, value, icon: Icon, live }) => (
            <Badge
              key={label}
              variant="outline"
              className="h-8 gap-1.5 rounded-full bg-card px-3 text-xs font-normal"
            >
              {live ? (
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
              ) : (
                <Icon className="text-muted-foreground" />
              )}
              <span className="text-muted-foreground">{label}:</span>
              <span className="font-semibold text-foreground">{value}</span>
            </Badge>
          ))}
        </div>
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

        <NavUser userName={userName} userEmail={userEmail} userRole={userRole} />
      </div>
    </header>
  );
}
