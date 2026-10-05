import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/layouts/app-header";
import { AppSidebar } from "@/components/layouts/app-sidebar";

interface AppShellProps {
  children: ReactNode;
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

/**
 * Responsive dashboard shell built on shadcn's Sidebar primitives.
 * - Desktop: floating sidebar that expands / collapses to icons (⌘B).
 * - Mobile: sidebar becomes an off-canvas Sheet.
 */
export function AppShell({
  children,
  userName = "User",
  userEmail,
  userRole,
}: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar userName={userName} userRole={userRole} />
      <SidebarInset className="min-h-svh flex flex-col bg-background p-3 md:p-4 md:pl-2">
        <AppHeader
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
        />
        <main
          id="main-content"
          className="flex flex-1 flex-col gap-4 min-w-0"
          aria-label="Dashboard main content"
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
