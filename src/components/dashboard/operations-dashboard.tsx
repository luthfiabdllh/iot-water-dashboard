"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Filter,
  X,
  Plus,
  Minus,
  RotateCw,
  Maximize2,
  Eye,
  List,
  AlertTriangle,
  Truck,
  ExternalLink,
} from "lucide-react";

export function OperationsDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [showRoutes, setShowRoutes] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [cardOpen, setCardOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedRange] = useState("Last 7 days");

  const filterTabs = [
    { id: "all", label: "All", count: 10 },
    { id: "active", label: "Active", count: 6 },
    { id: "idle", label: "Idle", count: 2 },
    { id: "maintenance", label: "Maintenance", count: 1 },
    { id: "offline", label: "Offline", count: 1 },
  ];

  return (
    <div className="flex flex-col h-full gap-4 select-none pb-2">
      {/* 1. Sub-Header: Title & Date Range */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 px-1 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Operations Dashboard
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-medium flex items-center gap-1.5">
            <span>Monday, April 8, 2026</span>
            <span className="size-1 rounded-full bg-zinc-600 inline-block" />
            <span className="text-zinc-300">Real-time overview</span>
          </p>
        </div>

        {/* Date Filter Dropdown */}
        <div className="relative shrink-0">
          <button
            type="button"
            className="flex items-center gap-2 bg-[#181a21] border border-white/[0.08] hover:border-white/20 hover:bg-[#20232c] px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-200 shadow-sm transition-all cursor-pointer"
          >
            <Calendar className="size-3.5 text-zinc-400" />
            <span>{selectedRange}</span>
            <ChevronDown className="size-3 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* 2. Controls Bar: Filter Tabs & Right Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 shrink-0 px-1">
        {/* Filter Tabs Group */}
        <div className="flex items-center gap-1.5 bg-[#14161c] p-1 rounded-full border border-white/[0.06] shadow-sm overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#272a34] text-white font-medium shadow-sm border border-white/10"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900"
                      : "bg-[#1f222a] text-zinc-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}

          {/* Filter button */}
          <button
            type="button"
            className="size-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors ml-0.5"
            aria-label="More filters"
          >
            <Filter className="size-3.5" />
          </button>
        </div>

        {/* Right Switch Toggles (Matching Reference) */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Show routes / zones toggle */}
          <label className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium cursor-pointer">
            <span>Show routes</span>
            <button
              type="button"
              role="switch"
              aria-checked={showRoutes}
              onClick={() => setShowRoutes(!showRoutes)}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                showRoutes ? "bg-emerald-500" : "bg-zinc-800 border border-white/10"
              }`}
            >
              <div
                className={`size-4 rounded-full bg-white transition-transform shadow-md ${
                  showRoutes ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>

          {/* Show alerts toggle */}
          <label className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium cursor-pointer">
            <span>Show alerts</span>
            <button
              type="button"
              role="switch"
              aria-checked={showAlerts}
              onClick={() => setShowAlerts(!showAlerts)}
              className={`w-9 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                showAlerts ? "bg-emerald-500" : "bg-zinc-800 border border-white/10"
              }`}
            >
              <div
                className={`size-4 rounded-full bg-white transition-transform shadow-md ${
                  showAlerts ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>
      </div>

      {/* 3. The Grand Operations Canvas Card */}
      <div className="relative flex-1 min-h-[580px] w-full bg-[#101217] rounded-3xl border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col justify-between p-5 md:p-6">
        {/* Background Interactive Dark Schematic Map Simulation */}
        <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
          {/* Subtle Grid Lines */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Dark Streets / Piping Grid SVG */}
          <svg
            className="w-full h-full opacity-60 transition-transform duration-300"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
            }}
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background block shapes representing buildings / farm plots */}
            <path
              d="M 120 180 L 320 150 L 360 380 L 140 400 Z"
              fill="#141720"
              stroke="#1f232e"
              strokeWidth="1.5"
            />
            <path
              d="M 400 120 L 780 80 L 820 320 L 420 340 Z"
              fill="#13151d"
              stroke="#1b1e28"
              strokeWidth="1.5"
            />
            <path
              d="M 860 140 L 1150 120 L 1180 440 L 890 460 Z"
              fill="#14161f"
              stroke="#1e222d"
              strokeWidth="1.5"
            />
            <path
              d="M 160 460 L 460 440 L 490 740 L 200 760 Z"
              fill="#13161e"
              stroke="#1b1e27"
              strokeWidth="1.5"
            />
            <path
              d="M 520 420 L 980 400 L 1020 760 L 560 780 Z"
              fill="#141721"
              stroke="#1e222e"
              strokeWidth="1.5"
            />

            {/* Dark Roads / Pipeline channels */}
            <path
              d="M 0 350 L 440 370 L 620 400 L 1200 320"
              stroke="#212530"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 380 0 L 430 380 L 490 800"
              stroke="#212530"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 820 0 L 840 400 L 910 800"
              stroke="#212530"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 150 0 L 200 450 L 320 800"
              stroke="#1b1e26"
              strokeWidth="10"
            />

            {/* Active Amber Flow / Route Path (Visible if showRoutes is true) */}
            {showRoutes && (
              <g>
                <path
                  d="M 380 680 L 480 620 L 590 590 L 680 470 L 760 380 L 820 280 L 920 180"
                  stroke="#f59e0b"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  className="animate-pulse"
                />
                {/* Secondary pipe path */}
                <path
                  d="M 380 680 L 420 540 L 520 440 L 590 590"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </g>
            )}

            {/* Active Node Ping Pulsing circles */}
            <circle cx="590" cy="590" r="48" fill="#f59e0b" fillOpacity="0.08" />
            <circle cx="590" cy="590" r="28" fill="#f59e0b" fillOpacity="0.15" />
            <circle cx="590" cy="590" r="14" fill="#ffffff" />
            <circle cx="590" cy="590" r="8" fill="#f59e0b" />

            {/* Node Sprinkler / Vehicle Vehicle Icon Indicator on Route */}
            <g transform="translate(565, 545) rotate(-28)">
              {/* White vehicle / node container */}
              <rect
                x="0"
                y="0"
                width="42"
                height="18"
                rx="4"
                fill="#ffffff"
                stroke="#181a20"
                strokeWidth="1.5"
              />
              <rect x="28" y="2" width="10" height="14" rx="2" fill="#e4e4e7" />
              {/* Headlights beam */}
              <polygon
                points="42,4 90,-10 90,28 42,14"
                fill="url(#headlight-gradient)"
                opacity="0.25"
              />
            </g>

            {/* Another node along the highway */}
            <g transform="translate(800, 240) rotate(-45)">
              <rect
                x="0"
                y="0"
                width="36"
                height="16"
                rx="3"
                fill="#e4e4e7"
                stroke="#181a20"
                strokeWidth="1"
              />
            </g>

            <defs>
              <linearGradient
                id="headlight-gradient"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Top-Left: Floating Telemetry Detail Card (Matching Exact Reference) */}
        {cardOpen ? (
          <div className="relative z-20 w-full sm:w-[410px] bg-[#161820]/90 backdrop-blur-xl border border-white/[0.12] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 transition-all duration-300">
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Vehicle/Device Icon */}
                <div className="size-9 rounded-lg bg-[#222530] border border-white/10 flex items-center justify-center text-zinc-200 shrink-0">
                  <Truck className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-tight text-white">
                      TX-4821-HX
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.2 rounded-full">
                      Active
                    </span>
                    <button
                      type="button"
                      className="text-zinc-500 hover:text-zinc-300"
                      aria-label="Open device details"
                    >
                      <ExternalLink className="size-3" />
                    </button>
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    Volvo FH16 • 2023 • V001
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setCardOpen(false)}
                className="text-zinc-500 hover:text-zinc-200 transition-colors p-1 rounded-md hover:bg-white/[0.06]"
                aria-label="Close card"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Progress & Route Section */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-medium">
                  Dallas, TX → Memphis, TN
                </span>
                <span className="text-zinc-400 font-mono text-[11px]">
                  282.1 mi <span className="text-amber-400 font-semibold">72%</span>
                </span>
              </div>

              {/* Glowing Amber Progress Bar */}
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                  style={{ width: "72%" }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-0.5">
                <span className="flex items-center gap-1 text-zinc-300">
                  <span className="text-zinc-500">Est. Time to Arrival (ETA):</span>{" "}
                  ~1h 8m
                </span>
                <span>
                  <strong className="text-zinc-300 font-semibold">72.9 mi</strong>{" "}
                  Distance remaining
                </span>
              </div>
            </div>

            {/* Dual Circular Gauges Row */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Gauge 1: Speed / Flow Rate */}
              <div className="bg-[#111319] border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400 font-medium">Speed</span>
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded">
                    High
                  </span>
                </div>

                {/* Speedometer Arc SVG */}
                <div className="relative flex flex-col items-center justify-center my-1">
                  <svg className="size-24" viewBox="0 0 100 65">
                    {/* Background Track */}
                    <path
                      d="M 15 55 A 40 40 0 1 1 85 55"
                      fill="none"
                      stroke="#222634"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Gradient Progress Arc */}
                    <path
                      d="M 15 55 A 40 40 0 1 1 85 55"
                      fill="none"
                      stroke="url(#speed-gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="188"
                      strokeDashoffset="38"
                    />
                    {/* Needle Indicator */}
                    <line
                      x1="50"
                      y1="55"
                      x2="72"
                      y2="32"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="55" r="4" fill="#ffffff" />
                    <defs>
                      <linearGradient
                        id="speed-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="60%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center -mt-2">
                    <div className="text-sm font-bold text-white tracking-tight">
                      99 mph
                    </div>
                  </div>
                </div>
              </div>

              {/* Gauge 2: Fuel / Fluid Tank Level */}
              <div className="bg-[#111319] border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400 font-medium">
                    Fuel level
                  </span>
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-bold px-1.5 py-0.2 rounded">
                    31%
                  </span>
                </div>

                {/* Circular Wave Gauge SVG */}
                <div className="relative flex flex-col items-center justify-center my-1">
                  <div className="relative size-20 rounded-full border border-zinc-700/80 bg-[#161922] flex items-center justify-center overflow-hidden shadow-inner">
                    {/* Liquid fill shape in bottom 31% */}
                    <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-amber-600 to-amber-400/90 rounded-b-full">
                      {/* Wave surface curve */}
                      <svg
                        className="w-full h-3 -mt-2.5 text-amber-400/90 fill-current"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                      >
                        <path d="M0,10 Q25,20 50,10 T100,10 L100,20 L0,20 Z" />
                      </svg>
                    </div>

                    {/* Centered Value */}
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <div className="text-xs font-bold text-white tracking-tight leading-none">
                        3.61 gal
                      </div>
                      <div className="text-[9px] text-zinc-400 font-medium mt-1 bg-black/40 px-1.5 py-0.2 rounded-full border border-white/10">
                        72°F
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Alert Banner (Matching Reference) */}
            {showAlerts && (
              <div className="flex items-center gap-2 bg-[#2a2216] border border-amber-500/30 text-amber-300 rounded-xl px-3 py-2 text-xs">
                <AlertTriangle className="size-4 text-amber-400 shrink-0" />
                <span className="leading-tight text-[11px]">
                  <strong>Required Break:</strong> 30 min (After 8h of driving)
                </span>
              </div>
            )}
          </div>
        ) : (
          /* Button to re-open telemetry card if closed */
          <button
            type="button"
            onClick={() => setCardOpen(true)}
            className="relative z-20 self-start bg-[#181a21]/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-xs text-zinc-200 hover:bg-[#20232c] flex items-center gap-2 shadow-xl"
          >
            <Truck className="size-3.5 text-amber-400" />
            <span>Show Device Telemetry (TX-4821-HX)</span>
          </button>
        )}

        {/* Top-Right: Realistic High-Tech Dark Compass Instrument (Matching Reference) */}
        <div className="absolute top-6 right-6 z-20 hidden md:block">
          <div className="relative size-28 rounded-full bg-gradient-to-b from-[#242833] via-[#171a22] to-[#0f1116] border-4 border-[#252936] shadow-2xl flex items-center justify-center select-none ring-1 ring-white/10">
            {/* Outer Tick Mark Ring */}
            <div className="absolute inset-1 rounded-full border border-zinc-700/50" />

            {/* Cardinal Direction Marks */}
            <span className="absolute top-1.5 text-[8px] font-bold text-zinc-400">
              N
            </span>
            <span className="absolute bottom-1.5 text-[8px] font-bold text-zinc-400">
              S
            </span>
            <span className="absolute left-2 text-[8px] font-bold text-zinc-400">
              W
            </span>
            <span className="absolute right-2 text-[8px] font-bold text-zinc-400">
              E
            </span>

            {/* Rotating Core Compass Disc */}
            <div className="size-16 rounded-full bg-[#13151b] border border-zinc-700/80 flex items-center justify-center shadow-inner relative">
              {/* Compass Needle (Glowing orange indicator pointing to NW) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
                style={{ transform: "rotate(-45deg)" }}
              >
                {/* North Pointer Needle */}
                <div className="w-1.5 h-7 bg-gradient-to-t from-transparent to-amber-500 rounded-t-full -translate-y-2.5 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              </div>

              {/* Big bold NW Direction Text in center */}
              <span className="relative z-10 text-sm font-black tracking-tight text-white">
                NW
              </span>
            </div>
          </div>
        </div>

        {/* Right-Edge Floating Tool Rail (Matching Reference) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1 bg-[#161820]/90 backdrop-blur-md border border-white/[0.08] p-1.5 rounded-2xl shadow-2xl">
          <button
            type="button"
            className="size-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="List view"
          >
            <List className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
            className="size-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
            className="size-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="size-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Reset orientation"
          >
            <RotateCw className="size-3.5" />
          </button>
          <button
            type="button"
            className="size-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle fullscreen"
          >
            <Maximize2 className="size-3.5" />
          </button>
          <button
            type="button"
            className="size-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle layers"
          >
            <Eye className="size-3.5" />
          </button>
        </div>

        {/* Bottom Inside Canvas Status Bar (Matching Reference) */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-500 font-medium px-1 select-none pointer-events-none">
          <div>Space + Drag to pan • Scroll to zoom</div>
          <div>Map updates every 3 minutes</div>
        </div>
      </div>
    </div>
  );
}
