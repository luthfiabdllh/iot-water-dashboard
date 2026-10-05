"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Droplets,
  Layers,
  Zap,
  Gauge,
  Activity,
  LogOut,
  User,
  Sliders,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/api/use-mutations";

interface AppHeaderProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export function AppHeader({
  userName = "Lisa Nguyen",
  userEmail = "lisa.nguyen@sinergi.io",
  userRole = "Manager",
}: AppHeaderProps) {
  const router = useRouter();
  const logoutMutation = useLogout();
  const [searchValue, setSearchValue] = useState("");

  const metrics = [
    {
      label: "Active",
      value: "6/10",
      dotColor: "bg-emerald-400",
      icon: Droplets,
    },
    {
      label: "Zones",
      value: "6/8",
      icon: Layers,
    },
    {
      label: "Pumps",
      value: "5",
      icon: Zap,
    },
    {
      label: "Avg. Moisture",
      value: "56.2%",
      icon: Gauge,
    },
    {
      label: "Water Flow",
      value: "94.2%",
      icon: Activity,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header
      id="cockpit-header"
      className="h-14 shrink-0 flex items-center justify-between gap-4 px-1 select-none"
      aria-label="Operations Top Bar"
    >
      {/* Left: Quick Live Metric Pills (Matching Reference) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={`metric-pill-${idx}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181a21] border border-white/[0.08] hover:border-white/15 transition-all text-xs whitespace-nowrap cursor-default shadow-sm"
            >
              {metric.dotColor ? (
                <span className="relative flex size-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${metric.dotColor} opacity-75`} />
                  <span className={`relative inline-flex rounded-full size-2 ${metric.dotColor}`} />
                </span>
              ) : (
                <Icon className="size-3 text-zinc-400" />
              )}
              <span className="text-zinc-400 font-normal">{metric.label}:</span>
              <span className="text-zinc-100 font-semibold">{metric.value}</span>
            </div>
          );
        })}
      </div>

      {/* Right: Search, Notification Bell, User Profile (Matching Reference) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Search Pill */}
        <div className="relative hidden md:flex items-center">
          <div className="flex items-center gap-2 bg-[#181a21] border border-white/[0.08] hover:border-white/15 focus-within:border-zinc-500 rounded-full px-3.5 py-1.5 w-60 lg:w-72 transition-all shadow-sm">
            <Search className="size-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search zones, sensors, or more..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none w-full"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded font-mono border border-white/[0.06] select-none">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Notification Bell with Badge */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative size-9 rounded-full bg-[#181a21] border border-white/[0.08] hover:border-white/20 hover:bg-[#20232c] flex items-center justify-center text-zinc-300 transition-colors shadow-sm cursor-pointer"
        >
          <Bell className="size-4" />
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full shadow-md leading-tight">
            +8
          </span>
        </button>

        {/* User Profile Chip */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-[#181a21] border border-white/[0.08] hover:border-white/20 hover:bg-[#20232c] transition-all cursor-pointer shadow-sm group"
            >
              {/* Initials Avatar with olive/dark background */}
              <div className="size-7 rounded-full bg-[#3d4432] border border-lime-400/20 text-lime-300 text-xs font-semibold flex items-center justify-center tracking-tight shadow-inner">
                {getInitials(userName)}
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <div className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {userName}
                </div>
                <div className="text-[10px] text-zinc-400 capitalize">
                  {userRole}
                </div>
              </div>
              <ChevronDown className="size-3 text-zinc-400 group-hover:text-zinc-200 transition-colors ml-0.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#181a21] border-white/10 text-zinc-200 shadow-2xl rounded-2xl p-1.5"
          >
            <DropdownMenuLabel className="font-normal px-2 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">{userName}</p>
                <p className="text-xs leading-none text-zinc-400">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/[0.08]" />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-white/[0.08] text-xs rounded-xl focus:bg-white/[0.08]"
              onClick={() => router.push("/profile")}
            >
              <User className="mr-2 size-4 text-zinc-400" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-white/[0.08] text-xs rounded-xl focus:bg-white/[0.08]"
              onClick={() => router.push("/settings")}
            >
              <Sliders className="mr-2 size-4 text-zinc-400" />
              <span>System Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/[0.08]" />
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs rounded-xl focus:bg-red-500/10 focus:text-red-300"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
