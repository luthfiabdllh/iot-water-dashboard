"use client";

import { useState } from "react";
import Link from "next/link";
import { History, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlowRateCard } from "./flow-rate-card";
import { BatteryStatusCard } from "./battery-status-card";
import { FlowRateChart } from "./flow-rate-chart";
import { BatteryChart } from "./battery-chart";
import { CURRENT_TELEMETRY, TODAY_HOURLY_DATA } from "@/lib/mock-iot-data";

export function Dashboard() {
  const [telemetry, setTelemetry] = useState(CURRENT_TELEMETRY);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate real-time sensor polling fluctuation
    setTimeout(() => {
      const delta = +(Math.random() * 1.2 - 0.6).toFixed(1);
      setTelemetry((prev) => ({
        ...prev,
        flowRate: +(prev.flowRate + delta).toFixed(1),
        batteryPercent: Math.min(100, Math.max(70, prev.batteryPercent + (delta > 0 ? 1 : 0))),
      }));
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div className="flex flex-1 flex-col gap-5 pb-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              IoT Watering Dashboard
            </h1>
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold gap-1 text-[11px] py-0"
            >
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Online
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time telemetry, flow monitoring, and solar battery management
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-9 rounded-full bg-card gap-1.5 text-xs font-medium"
          >
            <Link href="/history">
              <History className="size-3.5 text-sky-400" />
              <span>Historical View</span>
            </Link>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="size-9 rounded-full bg-card"
            aria-label="Refresh telemetry"
          >
            <RotateCw className={`size-3.5 text-muted-foreground ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* 1. The 2 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FlowRateCard telemetry={telemetry} />
        <BatteryStatusCard telemetry={telemetry} />
      </div>

      {/* 2. The 2 Line Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FlowRateChart data={TODAY_HOURLY_DATA} />
        <BatteryChart data={TODAY_HOURLY_DATA} />
      </div>
    </div>
  );
}