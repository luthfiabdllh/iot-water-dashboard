"use client";

import type { ReactNode } from "react";
import { AppHeader } from "@/components/layouts/app-header";
import { AppSidebar } from "@/components/layouts/app-sidebar";

interface AppShellProps {
  children: ReactNode;
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export function AppShell({
  children,
  userName = "Lisa Nguyen",
  userEmail = "lisa.nguyen@sinergi.io",
  userRole = "Manager",
}: AppShellProps) {
  return (
    <div className="bg-[#0c0e12] min-h-screen text-zinc-100 flex p-3 md:p-4 gap-3 md:gap-4 overflow-hidden antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Floating Slim Rail Sidebar */}
      <AppSidebar userName={userName} userRole={userRole} />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-24px)] md:h-[calc(100vh-32px)] overflow-hidden">
        {/* Top Header */}
        <AppHeader
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
        />

        {/* Dynamic Content Viewport */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden pt-2 pb-1 pr-1"
          aria-label="Dashboard Operations Viewport"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
