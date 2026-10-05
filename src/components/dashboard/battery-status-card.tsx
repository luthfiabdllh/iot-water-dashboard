"use client";

import { BatteryCharging, Sun, Zap, HeartPulse, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { CurrentTelemetry } from "@/lib/mock-iot-data";

interface BatteryStatusCardProps {
  telemetry: CurrentTelemetry;
}

export function BatteryStatusCard({ telemetry }: BatteryStatusCardProps) {
  const isCharging = telemetry.batteryStatus.includes("Charging");

  // Determine progress bar color based on level
  const getBatteryColor = (percent: number) => {
    if (percent > 50) return "*:data-[slot=progress-indicator]:bg-emerald-500";
    if (percent > 20) return "*:data-[slot=progress-indicator]:bg-amber-500";
    return "*:data-[slot=progress-indicator]:bg-red-500";
  };

  return (
    <Card className="relative overflow-hidden border-border bg-card/90 shadow-lg">
      {/* Subtle background glow effect */}
      <div className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-amber-500/10 blur-2xl" />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
            <BatteryCharging className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
              Battery Status
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              LiFePO4 Solar Power Bank
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold gap-1 text-[11px]"
        >
          {isCharging ? (
            <Sun className="size-3 text-amber-400 animate-spin-slow" />
          ) : (
            <Zap className="size-3 text-zinc-400" />
          )}
          {telemetry.batteryStatus}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Main Metric Value */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              {telemetry.batteryPercent}%
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              ({telemetry.batteryVoltage} V)
            </span>
          </div>

          <div className="flex items-center text-xs font-semibold text-amber-400 gap-1">
            <Sun className="size-3.5" />
            <span>+{telemetry.solarWatts}W Solar</span>
          </div>
        </div>

        {/* Battery Level Progress Bar */}
        <div className="space-y-1">
          <Progress
            value={telemetry.batteryPercent}
            className={`h-2 rounded-full bg-muted ${getBatteryColor(telemetry.batteryPercent)}`}
          />
        </div>

        {/* Secondary Info Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-center">
          <div className="rounded-lg bg-muted/40 p-2 text-left">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <HeartPulse className="size-3" />
              <span>Health</span>
            </div>
            <div className="mt-1 font-mono text-xs font-bold text-foreground">
              {telemetry.batteryHealth}
            </div>
          </div>

          <div className="rounded-lg bg-muted/40 p-2 text-left">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="size-3" />
              <span>Est. Runtime</span>
            </div>
            <div className="mt-1 font-mono text-xs font-bold text-foreground">
              ~{telemetry.estimatedRuntimeHours}h
            </div>
          </div>

          <div className="rounded-lg bg-muted/40 p-2 text-left">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Zap className="size-3" />
              <span>Temp</span>
            </div>
            <div className="mt-1 font-mono text-xs font-bold text-foreground">
              {telemetry.batteryTempC}°C
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
