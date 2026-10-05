"use client";

import { useId, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BatteryCharging, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TelemetryDataPoint } from "@/lib/mock-iot-data";

interface BatteryChartProps {
  data: TelemetryDataPoint[];
}

export function BatteryChart({ data }: BatteryChartProps) {
  const chartUid = useId().replace(/:/g, "");
  const gradientId = `battery-grad-${chartUid}`;
  const [range, setRange] = useState<"24h" | "12h" | "6h">("24h");

  // Slice data based on selected range
  const filteredData =
    range === "6h"
      ? data.slice(-6)
      : range === "12h"
      ? data.slice(-12)
      : data;

  const min = Math.min(...filteredData.map((d) => d.batteryPercent), 100);
  const max = Math.max(...filteredData.map((d) => d.batteryPercent), 0);
  const current = filteredData[filteredData.length - 1]?.batteryPercent ?? 88;

  return (
    <Card className="flex flex-col border-border bg-card/90 shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shrink-0">
            <BatteryCharging className="size-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold text-foreground">
                Battery Percentage vs Time
              </CardTitle>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[10px] py-0">
                Solar Buffer
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              LiFePO4 battery capacity (%) & solar charging cycles
            </p>
          </div>
        </div>

        {/* Range Selector & Summary Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Min:</span>
            <span className="font-mono font-semibold text-foreground">{min}%</span>
            <span className="text-muted-foreground ml-1">Max:</span>
            <span className="font-mono font-semibold text-foreground">{max}%</span>
            <span className="text-muted-foreground ml-1">Current:</span>
            <span className="font-mono font-semibold text-emerald-400">{current}%</span>
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
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
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
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                unit="%"
              />

              {/* Critical 20% Threshold Line */}
              <ReferenceLine
                y={20}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: "Low (20%)",
                  fill: "#ef4444",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />

              <RechartsTooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const item = payload[0].payload as TelemetryDataPoint;
                  return (
                    <div className="rounded-xl border border-border/80 bg-popover/95 p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-40">
                      <div className="font-semibold text-muted-foreground flex items-center justify-between">
                        <span>Time: {item.timestamp}</span>
                        {item.solarInputWatts && item.solarInputWatts > 0 ? (
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Sun className="size-2.5" />
                            +{item.solarInputWatts}W
                          </span>
                        ) : null}
                      </div>

                      <div className="flex items-center justify-between text-emerald-400 font-bold text-sm">
                        <span>Battery Level:</span>
                        <span className="font-mono">{item.batteryPercent}%</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1 border-t border-border/50">
                        <div>
                          <span>Voltage: </span>
                          <span className="text-foreground font-mono font-medium">
                            {item.batteryVoltage} V
                          </span>
                        </div>
                        <div>
                          <span>Solar: </span>
                          <span className="text-foreground font-mono font-medium">
                            {item.solarInputWatts ?? 0} W
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              <Area
                type="monotone"
                dataKey="batteryPercent"
                stroke="#10b981"
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
                dot={{ r: 3, fill: "#10b981", stroke: "#0f172a", strokeWidth: 1.5 }}
                activeDot={{ r: 6, fill: "#ffffff", stroke: "#059669", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
