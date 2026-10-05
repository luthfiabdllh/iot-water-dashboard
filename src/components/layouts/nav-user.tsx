"use client";

import Link from "next/link";
import { User as UserIcon, Settings, LogOut, ChevronDown } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/auth/api/use-queries";
import { useLogout } from "@/features/auth/api/use-mutations";

interface NavUserProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
  userAvatar?: string;
  logoutLabel?: string;
}

export function NavUser({
  userName = "User",
  userEmail,
  userRole,
  userAvatar,
  logoutLabel = "Sign out",
}: NavUserProps) {
  const { data: currentUser } = useCurrentUser();
  const logoutMutation = useLogout();

  const name = currentUser?.name || userName;
  const email = currentUser?.email || userEmail || "user@example.com";
  const role = currentUser?.role || userRole || "user";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarSrc =
    userAvatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          id="user-menu-trigger"
          className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-1 sm:pr-3 outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`User menu for ${name}`}
        >
          <Avatar className="size-7 border border-border">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback className="bg-lime-900/40 text-lime-300 text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:grid">
            <span className="max-w-28 truncate text-xs font-semibold text-foreground">
              {name}
            </span>
            <span className="text-[10px] capitalize text-muted-foreground">
              {role}
            </span>
          </div>
          <ChevronDown className="hidden size-3 text-muted-foreground sm:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2 shadow-lg" sideOffset={8}>
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-border">
              <AvatarImage src={avatarSrc} alt={name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5 overflow-hidden text-left">
              <span className="font-semibold text-sm text-foreground truncate">
                {name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {email}
              </span>
              <div className="pt-0.5">
                <Badge
                  variant="outline"
                  className="text-[10px] uppercase font-mono px-1.5 py-0"
                >
                  {role}
                </Badge>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-2.5 cursor-pointer py-1.5"
            >
              <UserIcon className="size-4 text-muted-foreground" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="flex items-center gap-2.5 cursor-pointer py-1.5"
            >
              <Settings className="size-4 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          id="logout-button"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="text-destructive focus:text-destructive focus:bg-destructive/10 flex items-center gap-2.5 cursor-pointer py-1.5 font-medium"
          aria-label={logoutLabel}
        >
          <LogOut className="size-4" />
          <span>{logoutMutation.isPending ? "Signing out..." : logoutLabel}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
