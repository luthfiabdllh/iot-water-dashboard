"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Cpu,
  Droplets,
  Users,
  Workflow,
  BarChart3,
  HelpCircle,
  Settings,
  PanelLeftClose,
  Sparkles,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppSidebarProps {
  userName?: string;
  userRole?: string;
}

export function AppSidebar({}: AppSidebarProps = {}) {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard Overview",
      href: "/dashboard",
      icon: LayoutGrid,
      isActive: pathname === "/dashboard" || pathname === "/",
    },
    {
      title: "Sensors & Controllers",
      href: "/dashboard",
      icon: Cpu,
      isActive: false,
    },
    {
      title: "Active Watering & Telemetry",
      href: "/dashboard",
      icon: Droplets,
      isActive: true, // Prominent active highlight as seen in reference design
    },
    {
      title: "Operators & Users",
      href: "/users",
      icon: Users,
      isActive: pathname.startsWith("/users"),
    },
    {
      title: "Irrigation Flow & Automations",
      href: "/dashboard",
      icon: Workflow,
      isActive: false,
    },
    {
      title: "Analytics & History",
      href: "/dashboard",
      icon: BarChart3,
      isActive: false,
    },
  ];

  const bottomItems = [
    {
      title: "Help & Docs",
      href: "/settings",
      icon: HelpCircle,
    },
    {
      title: "System Settings",
      href: "/settings",
      icon: Settings,
      isActive: pathname.startsWith("/settings"),
    },
    {
      title: "Collapse Sidebar",
      href: "#",
      icon: PanelLeftClose,
      isAction: true,
    },
  ];

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        id="cockpit-sidebar"
        aria-label="Operations Sidebar"
        className="w-16 md:w-[70px] h-[calc(100vh-24px)] md:h-[calc(100vh-32px)] shrink-0 flex flex-col items-center justify-between py-4 px-2 bg-[#14161c] border border-white/[0.08] rounded-2xl md:rounded-3xl shadow-2xl select-none transition-all duration-300 z-30"
      >
        {/* Top: Brand Squircle Icon */}
        <div className="flex flex-col items-center gap-6 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className="size-11 rounded-2xl bg-[#1d2028] border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-amber-400 hover:text-amber-300 transition-all duration-300 hover:scale-105 shadow-inner group relative"
                aria-label="Sinergi IoT Operations"
              >
                {/* Glowing stylized clover / sprout icon matching reference */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full group-hover:bg-amber-400/30 transition-all" />
                  <Sparkles className="size-5 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#1f232c] text-white border-white/10">
              <span className="font-semibold text-xs">Sinergi IoT Watering</span>
            </TooltipContent>
          </Tooltip>

          {/* Middle Nav Items */}
          <nav className="flex flex-col items-center gap-3 w-full" aria-label="Main Navigation">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Tooltip key={`nav-item-${idx}`}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`relative size-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                        item.isActive
                          ? "bg-white text-zinc-950 shadow-lg font-bold scale-105 hover:bg-zinc-100"
                          : "text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:scale-105"
                      }`}
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      <Icon className="size-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-[#1f232c] text-white border-white/10 text-xs"
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </div>

        {/* Bottom Nav Items */}
        <div className="flex flex-col items-center gap-3 w-full">
          {bottomItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Tooltip key={`bottom-item-${idx}`}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={`size-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      item.isActive
                        ? "bg-white text-zinc-950 shadow"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06]"
                    }`}
                    aria-label={item.title}
                  >
                    <Icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#1f232c] text-white border-white/10 text-xs"
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </aside>
    </TooltipProvider>
  );
}
