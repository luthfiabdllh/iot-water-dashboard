"use client";

import { Droplets, ArrowUpRight, Gauge, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CurrentTelemetry } from "@/lib/mock-iot-data";

interface FlowRateCardProps {
  telemetry: CurrentTelemetry;
}

export function FlowRateCard({ telemetry }: FlowRateCardProps) {
  return (
    <Card className="relative overflow-hidden border-border bg-card/90 shadow-lg">
      {/* Subtle background glow effect */}
      <div className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-sky-500/10 blur-2xl" />

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400">
            <Droplets className="size-4.5" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
              Current Flow Rate
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              Main Irrigation Pipeline
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold gap-1 text-[11px]"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          {telemetry.flowStatus}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Main Metric Value */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              {telemetry.flowRate}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              {telemetry.flowRateUnit}
            </span>
          </div>

          <div className="flex items-center text-xs font-medium text-emerald-400 gap-0.5">
            <ArrowUpRight className="size-3.5" />
            <span>+{telemetry.flowRateTrend} L/min</span>
          </div>
        </div>

        {/* Secondary Info Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-3 text-center">
          <div className="rounded-lg bg-muted/40 p-2 text-left">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Activity className="size-3" />
              <span>Today Total</span>
            </div>
            <div className="mt-1 font-mono text-xs font-bold text-foreground">
              {telemetry.totalWaterTodayLiters.toLocaleString()} L
            </div>
          </div>

          <div className="rounded-lg bg-muted/40 p-2 text-left">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Droplets className="size-3" />
              <span>Valves Open</span>
            </div>
            <div className="mt-1 font-mono text-xs font-bold text-foreground">
              {telemetry.valvesOpen} / {telemetry.valvesTotal}
            </div>
          </div>

          <div className="rounded-lg bg-muted/40 p-2 text-left">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Gauge className="size-3" />
              <span>Pressure</span>
            </div>
            <div className="mt-1 font-mono text-xs font-bold text-foreground">
              {telemetry.waterPressureBar} Bar
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
