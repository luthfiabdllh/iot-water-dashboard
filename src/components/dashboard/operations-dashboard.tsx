"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  Droplets,
  ExternalLink,
  Eye,
  Filter,
  List,
  Maximize2,
  Minus,
  Plus,
  RotateCw,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// TODO: replace placeholder data with real telemetry
const FILTER_TABS = [
  { id: "all", label: "All", count: 10 },
  { id: "active", label: "Active", count: 6 },
  { id: "idle", label: "Idle", count: 2 },
  { id: "maintenance", label: "Maintenance", count: 1 },
  { id: "offline", label: "Offline", count: 1 },
];

const DATE_RANGES = ["Today", "Last 7 days", "Last 30 days"];

export function OperationsDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [showRoutes, setShowRoutes] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [cardOpen, setCardOpen] = useState(true);
  const [zoom, setZoom] = useState(1);

  const mapTools: { label: string; icon: LucideIcon; onClick?: () => void }[] = [
    { label: "List view", icon: List },
    { label: "Zoom in", icon: Plus, onClick: () => setZoom((z) => Math.min(z + 0.2, 2)) },
    { label: "Zoom out", icon: Minus, onClick: () => setZoom((z) => Math.max(z - 0.2, 0.6)) },
    { label: "Reset view", icon: RotateCw, onClick: () => setZoom(1) },
    { label: "Fullscreen", icon: Maximize2 },
    { label: "Layers", icon: Eye },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Page title + date range */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Operations Dashboard
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Real-time irrigation overview
          </p>
        </div>
        <Select defaultValue="Last 7 days">
          <SelectTrigger
            id="date-range-select"
            className="h-9 w-full rounded-full bg-card sm:w-44"
          >
            <Calendar className="size-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filters + toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex max-w-full items-center gap-2 overflow-x-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-9 rounded-full bg-card p-1">
              {FILTER_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-full px-3 text-xs"
                >
                  {tab.label}
                  <Badge
                    variant={activeTab === tab.id ? "default" : "secondary"}
                    className="h-4 min-w-4 px-1 text-[10px]"
                  >
                    {tab.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 rounded-full bg-card"
            aria-label="More filters"
          >
            <Filter className="size-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Label htmlFor="show-routes" className="text-xs">
              Show routes
            </Label>
            <Switch
              id="show-routes"
              checked={showRoutes}
              onCheckedChange={setShowRoutes}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="show-alerts" className="text-xs">
              Show alerts
            </Label>
            <Switch
              id="show-alerts"
              checked={showAlerts}
              onCheckedChange={setShowAlerts}
              className="data-[state=checked]:bg-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Main canvas */}
      <Card className="relative min-h-140 flex-1 gap-0 rounded-3xl p-4 md:p-6">
        <FieldMap showRoutes={showRoutes} zoom={zoom} />

        {/* Telemetry card */}
        {cardOpen ? (
          <Card className="relative z-10 w-full gap-4 rounded-2xl bg-popover/90 backdrop-blur-xl sm:w-100">
            <CardHeader className="grid-cols-[1fr_auto]">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg border bg-muted">
                  <Droplets className="size-4 text-sky-400" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2 text-sm font-bold">
                    ZONE-A1
                    <Badge className="h-4 bg-emerald-500/15 px-1.5 text-[10px] text-emerald-400">
                      Active
                    </Badge>
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </CardTitle>
                  <p className="text-[11px] text-muted-foreground">
                    Greenhouse North • Drip line • V001
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => setCardOpen(false)}
                aria-label="Close telemetry card"
              >
                <X className="size-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Cycle progress */}
              <div className="space-y-2 rounded-xl border bg-card p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Watering cycle</span>
                  <span className="text-muted-foreground">
                    282 L <span className="font-semibold text-amber-400">72%</span>
                  </span>
                </div>
                <Progress
                  value={72}
                  className="h-1.5 *:data-[slot=progress-indicator]:bg-amber-500"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>ETA: ~18m</span>
                  <span>110 L remaining</span>
                </div>
              </div>

              {/* Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <GaugeTile title="Flow rate" badge="High" badgeClass="bg-red-500/15 text-red-400">
                  <ArcGauge value={0.8} label="24 L/m" />
                </GaugeTile>
                <GaugeTile title="Tank level" badge="31%" badgeClass="bg-amber-500/15 text-amber-400">
                  <TankGauge percent={31} label="310 L" sub="24°C" />
                </GaugeTile>
              </div>

              {showAlerts && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-300">
                  <AlertTriangle className="size-4 shrink-0 text-amber-400" />
                  <span>
                    <strong>Low soil moisture:</strong> Zone B2 below 30% threshold
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="relative z-10 self-start rounded-xl bg-popover/90"
            onClick={() => setCardOpen(true)}
          >
            <Droplets className="size-3.5 text-sky-400" />
            Show zone telemetry
          </Button>
        )}

        {/* Compass */}
        <div className="absolute right-6 top-6 z-10 hidden md:block">
          <div className="relative flex size-24 items-center justify-center rounded-full border-4 bg-linear-to-b from-muted to-card shadow-2xl">
            {(["N", "E", "S", "W"] as const).map((d, i) => (
              <span
                key={d}
                className="absolute text-[8px] font-bold text-muted-foreground"
                style={{
                  transform: `rotate(${i * 90}deg) translateY(-38px) rotate(-${i * 90}deg)`,
                }}
              >
                {d}
              </span>
            ))}
            <div className="relative flex size-14 items-center justify-center rounded-full border bg-background">
              <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(-45deg)" }}>
                <div className="h-6 w-1 -translate-y-2.5 rounded-t-full bg-linear-to-t from-transparent to-amber-500" />
              </div>
              <span className="relative text-sm font-black">NW</span>
            </div>
          </div>
        </div>

        {/* Map tools */}
        <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1 rounded-2xl border bg-popover/90 p-1.5 shadow-xl backdrop-blur md:right-6">
          {mapTools.map(({ label, icon: Icon, onClick }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-xl"
                  onClick={onClick}
                  aria-label={label}
                >
                  <Icon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">{label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Footer hints */}
        <div className="pointer-events-none relative z-10 mt-auto flex justify-between pt-4 text-[11px] text-muted-foreground">
          <span className="hidden sm:inline">Space + Drag to pan • Scroll to zoom</span>
          <span>Sensors update every 3 minutes</span>
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────────── sub-components ───────────────────────── */

function GaugeTile({
  title,
  badge,
  badgeClass,
  children,
}: {
  title: string;
  badge: string;
  badgeClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border bg-card p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{title}</span>
        <Badge className={`h-4 rounded px-1.5 text-[9px] ${badgeClass}`}>{badge}</Badge>
      </div>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

/** Semi-circle speedometer-style gauge. `value` is 0–1. */
function ArcGauge({ value, label }: { value: number; label: string }) {
  const arcLength = 188;
  const angle = -120 + value * 240;
  return (
    <div className="flex flex-col items-center">
      <svg className="size-24" viewBox="0 0 100 70" aria-hidden>
        <path d="M 15 60 A 40 40 0 1 1 85 60" fill="none" className="stroke-muted" strokeWidth="8" strokeLinecap="round" />
        <path
          d="M 15 60 A 40 40 0 1 1 85 60"
          fill="none"
          stroke="url(#arc-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={arcLength * (1 - value)}
        />
        <line
          x1="50" y1="46" x2="50" y2="20"
          className="stroke-foreground"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${angle} 50 46)`}
        />
        <circle cx="50" cy="46" r="4" className="fill-foreground" />
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <span className="-mt-3 text-sm font-bold">{label}</span>
    </div>
  );
}

/** Circular liquid-level gauge. */
function TankGauge({ percent, label, sub }: { percent: number; label: string; sub: string }) {
  return (
    <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border bg-muted/40">
      <div
        className="absolute inset-x-0 bottom-0 bg-linear-to-t from-amber-600 to-amber-400"
        style={{ height: `${percent + 6}%` }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-xs font-bold leading-none">{label}</span>
        <span className="mt-1 rounded-full border bg-background/60 px-1.5 text-[9px] text-muted-foreground">
          {sub}
        </span>
      </div>
    </div>
  );
}

/** Decorative schematic map background (placeholder for a real map). */
function FieldMap({ showRoutes, zoom }: { showRoutes: boolean; zoom: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <svg
        className="size-full opacity-70 transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g className="fill-muted/40 stroke-border" strokeWidth="1.5">
          <path d="M120 180 L320 150 L360 380 L140 400 Z" />
          <path d="M400 120 L780 80 L820 320 L420 340 Z" />
          <path d="M860 140 L1150 120 L1180 440 L890 460 Z" />
          <path d="M160 460 L460 440 L490 740 L200 760 Z" />
          <path d="M520 420 L980 400 L1020 760 L560 780 Z" />
        </g>
        <g className="stroke-muted" strokeLinecap="round">
          <path d="M0 350 L440 370 L620 400 L1200 320" strokeWidth="16" />
          <path d="M380 0 L430 380 L490 800" strokeWidth="14" />
          <path d="M820 0 L840 400 L910 800" strokeWidth="14" />
        </g>
        {showRoutes && (
          <path
            d="M380 680 L480 620 L590 590 L680 470 L760 380 L820 280 L920 180"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
        )}
        <circle cx="590" cy="590" r="48" fill="#f59e0b" fillOpacity="0.08" />
        <circle cx="590" cy="590" r="28" fill="#f59e0b" fillOpacity="0.15" />
        <circle cx="590" cy="590" r="12" className="fill-foreground" />
        <circle cx="590" cy="590" r="6" fill="#f59e0b" />
      </svg>
    </div>
  );
}
