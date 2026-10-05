"use client";

import { useState, useId } from "react";
import {
  Calendar,
  Clock,
  Filter,
  Download,
  RotateCw,
  Droplets,
  BatteryCharging,
  Activity,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  generateHistoricalData,
  type HistoricalQueryParams,
  type HistoricalQueryResult,
  type TelemetryDataPoint,
} from "@/lib/mock-iot-data";

export function HistoricalView() {
  const chartFlowUid = useId().replace(/:/g, "");
  const chartBatUid = useId().replace(/:/g, "");
  const gradFlowId = `hist-flow-grad-${chartFlowUid}`;
  const gradBatId = `hist-bat-grad-${chartBatUid}`;

  // Default parameters: Last 7 days
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDateInput = (d: Date) => d.toISOString().split("T")[0];

  const [params, setParams] = useState<HistoricalQueryParams>({
    startDate: formatDateInput(sevenDaysAgo),
    startTime: "00:00",
    endDate: formatDateInput(today),
    endTime: "23:59",
  });

  const [activePreset, setActivePreset] = useState<string>("7d");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<HistoricalQueryResult>(() =>
    generateHistoricalData({
      startDate: formatDateInput(sevenDaysAgo),
      startTime: "00:00",
      endDate: formatDateInput(today),
      endTime: "23:59",
    })
  );

  // Apply Quick Date Presets
  const applyPreset = (preset: "today" | "yesterday" | "3d" | "7d" | "30d") => {
    setActivePreset(preset);
    const now = new Date();
    let start = new Date();

    if (preset === "today") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
    } else if (preset === "yesterday") {
      start.setDate(now.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      now.setDate(now.getDate() - 1);
      now.setHours(23, 59, 0, 0);
    } else if (preset === "3d") {
      start.setDate(now.getDate() - 3);
    } else if (preset === "7d") {
      start.setDate(now.getDate() - 7);
    } else if (preset === "30d") {
      start.setDate(now.getDate() - 30);
    }

    const newParams: HistoricalQueryParams = {
      startDate: formatDateInput(start),
      startTime: preset === "yesterday" || preset === "today" ? "00:00" : "00:00",
      endDate: formatDateInput(now),
      endTime: "23:59",
    };

    setParams(newParams);
    setQueryResult(generateHistoricalData(newParams));
  };

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setQueryResult(generateHistoricalData(params));
      setIsLoading(false);
    }, 300);
  };

  // Export mock data as CSV
  const handleExportCSV = () => {
    const headers = "Timestamp,FlowRate_L_min,Battery_Percent,Battery_Voltage_V,Solar_Watts\n";
    const rows = queryResult.dataPoints
      .map(
        (d) =>
          `"${d.fullDate || d.timestamp}",${d.flowRate},${d.batteryPercent},${d.batteryVoltage},${d.solarInputWatts || 0}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `telemetry_${params.startDate}_to_${params.endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { summary, dataPoints } = queryResult;

  return (
    <div className="flex flex-1 flex-col gap-5 pb-8">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Historical Telemetry & Analytics
            </h1>
            <Badge variant="outline" className="border-sky-500/30 text-sky-400 text-[11px] py-0 font-medium">
              Audit & Logs
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Query past watering cycles, flow performance, and battery discharge history
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="h-9 rounded-full bg-card gap-1.5 text-xs font-medium cursor-pointer"
          >
            <Download className="size-3.5 text-muted-foreground" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* 2. Filter Parameters Card Form */}
      <Card className="border-border bg-card/90 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Filter className="size-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Query Parameters</CardTitle>
                <CardDescription className="text-xs">
                  Select start and end date/time range to retrieve archived telemetry records
                </CardDescription>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {(
                [
                  { id: "today", label: "Today" },
                  { id: "yesterday", label: "Yesterday" },
                  { id: "3d", label: "Last 3 Days" },
                  { id: "7d", label: "Last 7 Days" },
                  { id: "30d", label: "Last 30 Days" },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                    activePreset === preset.id
                      ? "border-primary bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "border-border/70 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleApplyFilter} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Start Date */}
              <div className="space-y-1.5">
                <Label htmlFor="start-date" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3 text-primary" />
                  <span>Start Date</span>
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={params.startDate}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setParams({ ...params, startDate: e.target.value });
                  }}
                  className="h-9 bg-background/80 text-xs font-mono"
                  required
                />
              </div>

              {/* Start Time */}
              <div className="space-y-1.5">
                <Label htmlFor="start-time" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3 text-primary" />
                  <span>Start Time</span>
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={params.startTime}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setParams({ ...params, startTime: e.target.value });
                  }}
                  className="h-9 bg-background/80 text-xs font-mono"
                  required
                />
              </div>

              {/* End Date */}
              <div className="space-y-1.5">
                <Label htmlFor="end-date" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Calendar className="size-3 text-primary" />
                  <span>End Date</span>
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={params.endDate}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setParams({ ...params, endDate: e.target.value });
                  }}
                  className="h-9 bg-background/80 text-xs font-mono"
                  required
                />
              </div>

              {/* End Time */}
              <div className="space-y-1.5">
                <Label htmlFor="end-time" className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3 text-primary" />
                  <span>End Time</span>
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={params.endTime}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setParams({ ...params, endTime: e.target.value });
                  }}
                  className="h-9 bg-background/80 text-xs font-mono"
                  required
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between pt-1 border-t border-border/50">
              <div className="text-xs text-muted-foreground">
                Showing <strong className="text-foreground">{dataPoints.length} records</strong> between{" "}
                <span className="font-mono text-foreground">{params.startDate} {params.startTime}</span> and{" "}
                <span className="font-mono text-foreground">{params.endDate} {params.endTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isLoading}
                  className="h-9 px-5 rounded-full font-semibold gap-1.5 cursor-pointer shadow-md"
                >
                  <RotateCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  <span>{isLoading ? "Querying..." : "Apply Filter"}</span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* 3. Summary Metric Stat Badges for Selected Range */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Droplets className="size-3 text-sky-400" />
            <span>Total Water</span>
          </div>
          <div className="mt-1 font-mono text-lg font-extrabold text-foreground">
            {summary.totalVolumeLiters.toLocaleString()} L
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Activity className="size-3 text-sky-400" />
            <span>Avg Flow</span>
          </div>
          <div className="mt-1 font-mono text-lg font-extrabold text-foreground">
            {summary.averageFlowRate} L/min
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <TrendingUp className="size-3 text-emerald-400" />
            <span>Peak Flow</span>
          </div>
          <div className="mt-1 font-mono text-lg font-extrabold text-foreground">
            {summary.peakFlowRate} L/min
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <BatteryCharging className="size-3 text-emerald-400" />
            <span>Avg Battery</span>
          </div>
          <div className="mt-1 font-mono text-lg font-extrabold text-foreground">
            {summary.averageBatteryPercent}%
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <AlertTriangle className="size-3 text-amber-400" />
            <span>Min Battery</span>
          </div>
          <div className="mt-1 font-mono text-lg font-extrabold text-foreground">
            {summary.minBatteryPercent}%
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <CheckCircle2 className="size-3 text-emerald-400" />
            <span>Cycles Count</span>
          </div>
          <div className="mt-1 font-mono text-lg font-extrabold text-foreground">
            {summary.activeCyclesCount} Cycles
          </div>
        </div>
      </div>

      {/* 4. Chart 1: Historical Flow Rate vs Time */}
      <Card className="flex flex-col border-border bg-card/90 shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl border border-sky-500/20 bg-sky-500/10 text-sky-400 shrink-0">
              <Droplets className="size-4.5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-foreground">
                Historical Flow Rate vs Time
              </CardTitle>
              <CardDescription className="text-xs">
                Irrigation discharge timeline and duration of active watering cycles
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Peak:</span>
            <span className="font-mono font-semibold text-foreground">
              {summary.peakFlowRate} L/min ({summary.peakFlowTime})
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dataPoints}
                margin={{ top: 10, right: 15, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={gradFlowId} x1="0" y1="0" x2="0" y2="1">
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
                      <div className="rounded-xl border border-border/80 bg-popover/95 p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-44">
                        <div className="font-semibold text-muted-foreground flex items-center justify-between">
                          <span>{item.fullDate || item.timestamp}</span>
                          {item.status === "watering" && (
                            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded">
                              Irrigating
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sky-400 font-bold text-sm">
                          <span>Flow Rate:</span>
                          <span className="font-mono">{item.flowRate} L/min</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center justify-between pt-1 border-t border-border/50">
                          <span>Cumulative Volume:</span>
                          <span className="text-foreground font-mono font-medium">
                            {item.cumulativeVolumeLiters?.toLocaleString()} L
                          </span>
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
                  fill={`url(#${gradFlowId})`}
                  dot={dataPoints.length < 30 ? { r: 3, fill: "#38bdf8", stroke: "#0f172a" } : false}
                  activeDot={{ r: 5, fill: "#ffffff", stroke: "#0284c7", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 5. Chart 2: Historical Battery Percentage vs Time */}
      <Card className="flex flex-col border-border bg-card/90 shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shrink-0">
              <BatteryCharging className="size-4.5" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-foreground">
                Historical Battery Percentage vs Time
              </CardTitle>
              <CardDescription className="text-xs">
                Solar recharge cycles, night drain behavior, and backup reserves
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Min Level:</span>
            <span className="font-mono font-semibold text-amber-400">
              {summary.minBatteryPercent}% ({summary.minBatteryTime})
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="h-72 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dataPoints}
                margin={{ top: 10, right: 15, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={gradBatId} x1="0" y1="0" x2="0" y2="1">
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

                {/* Critical 20% Threshold */}
                <ReferenceLine
                  y={20}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: "Critical 20%",
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
                      <div className="rounded-xl border border-border/80 bg-popover/95 p-3 shadow-xl backdrop-blur-md text-xs space-y-1.5 min-w-44">
                        <div className="font-semibold text-muted-foreground flex items-center justify-between">
                          <span>{item.fullDate || item.timestamp}</span>
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
                            <span>Solar Input: </span>
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
                  fill={`url(#${gradBatId})`}
                  dot={dataPoints.length < 30 ? { r: 3, fill: "#10b981", stroke: "#0f172a" } : false}
                  activeDot={{ r: 5, fill: "#ffffff", stroke: "#059669", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
