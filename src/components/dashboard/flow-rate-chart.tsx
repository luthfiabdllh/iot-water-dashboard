"use client";

import { useId, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TelemetryDataPoint } from "@/lib/mock-iot-data";

interface FlowRateChartProps {
  data: TelemetryDataPoint[];
}

export function FlowRateChart({ data }: FlowRateChartProps) {
  const chartUid = useId().replace(/:/g, "");
  const gradientId = `flow-rate-grad-${chartUid}`;
  const [range, setRange] = useState<"24h" | "12h" | "6h">("24h");

  // Slice data based on selected range
  const filteredData =
    range === "6h"
      ? data.slice(-6)
      : range === "12h"
      ? data.slice(-12)
      : data;

  // Compute peak and average
  const peak = Math.max(...filteredData.map((d) => d.flowRate), 0);
  const avg = +(
    filteredData.reduce((acc, d) => acc + d.flowRate, 0) /
    (filteredData.length || 1)
  ).toFixed(1);

  return (
    <Card className="flex flex-col border-border bg-card/90 shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400 shrink-0">
            <Droplets className="size-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold text-foreground">
                Flow Rate vs Time
              </CardTitle>
              <Badge variant="outline" className="border-sky-500/30 text-sky-400 text-[10px] py-0">
                Live Telemetry
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Water discharge rate measured in Liters per Minute (L/min)
            </p>
          </div>
        </div>

        {/* Range Selector & Summary Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Peak:</span>
            <span className="font-mono font-semibold text-foreground">{peak} L/min</span>
            <span className="text-muted-foreground ml-1">Avg:</span>
            <span className="font-mono font-semibold text-foreground">{avg} L/min</span>
          </div>

          <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
            <TabsList className="h-8 rounded-lg bg-muted/50 p-0.5">
              <TabsTrigger value="6h" className="text-xs px-2.5 h-7 rounded-md">
                6H
              </TabsTrigger>
              <TabsTrigger value="12h" className="text-xs px-2.5 h-7 rounded-md">
                12H
              </TabsTrigger>
              <TabsTrigger value="24h" className="text-xs px-2.5 h-7 rounded-md">
                24H
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="pt-4 flex-1">
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.5}
              />

              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                unit=" L"
              />

              <RechartsTooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const item = payload[0].payload as TelemetryDataPoint;
                  return (
                    <div className="rounded-xl border border-border/80 bg-popover/95 p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-36">
                      <div className="font-semibold text-muted-foreground flex items-center justify-between">
                        <span>Time: {item.timestamp}</span>
                        {item.status === "watering" && (
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                            Spraying
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sky-400 font-bold text-sm">
                        <span>Flow Rate:</span>
                        <span className="font-mono">{item.flowRate} L/min</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground flex items-center justify-between pt-1 border-t border-border/50">
                        <span>Status:</span>
                        <span className="text-foreground capitalize">{item.status || "Idle"}</span>
                      </div>
                    </div>
                  );
                }}
              />

              <Area
                type="monotone"
                dataKey="flowRate"
                stroke="#38bdf8"
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
                dot={{ r: 3, fill: "#38bdf8", stroke: "#0f172a", strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: "#ffffff", stroke: "#0284c7", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
