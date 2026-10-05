/**
 * Mock Data & Generators for IoT Watering System Telemetry
 */

export interface TelemetryDataPoint {
  timestamp: string; // e.g. "14:00" or "2026-04-08 14:00"
  fullDate?: string;
  flowRate: number; // L/min
  batteryPercent: number; // %
  batteryVoltage: number; // V
  solarInputWatts?: number; // W
  cumulativeVolumeLiters?: number; // L
  status?: "watering" | "idle" | "charging" | "standby";
}

export interface CurrentTelemetry {
  flowRate: number; // L/min
  flowRateUnit: string;
  flowRateTrend: number; // +2.4 L/min vs last cycle
  flowStatus: "Optimal" | "Low" | "High" | "Idle";
  totalWaterTodayLiters: number;
  valvesOpen: number;
  valvesTotal: number;
  waterPressureBar: number;
  
  batteryPercent: number;
  batteryVoltage: number;
  batteryStatus: "Charging (Solar)" | "Discharging" | "Full" | "Critical";
  batteryHealth: string;
  batteryTempC: number;
  solarWatts: number;
  estimatedRuntimeHours: number;
}

export const CURRENT_TELEMETRY: CurrentTelemetry = {
  flowRate: 18.4,
  flowRateUnit: "L/min",
  flowRateTrend: 2.4,
  flowStatus: "Optimal",
  totalWaterTodayLiters: 4820,
  valvesOpen: 3,
  valvesTotal: 4,
  waterPressureBar: 2.8,

  batteryPercent: 88,
  batteryVoltage: 12.8,
  batteryStatus: "Charging (Solar)",
  batteryHealth: "Good (98%)",
  batteryTempC: 27.4,
  solarWatts: 48,
  estimatedRuntimeHours: 19.5,
};

/**
 * 24-Hour Timeline Data for Today's Real-Time Dashboard
 */
export const TODAY_HOURLY_DATA: TelemetryDataPoint[] = [
  { timestamp: "00:00", flowRate: 0, batteryPercent: 82, batteryVoltage: 12.4, solarInputWatts: 0, status: "idle" },
  { timestamp: "01:00", flowRate: 0, batteryPercent: 81, batteryVoltage: 12.4, solarInputWatts: 0, status: "idle" },
  { timestamp: "02:00", flowRate: 0, batteryPercent: 80, batteryVoltage: 12.3, solarInputWatts: 0, status: "idle" },
  { timestamp: "03:00", flowRate: 0, batteryPercent: 78, batteryVoltage: 12.3, solarInputWatts: 0, status: "idle" },
  { timestamp: "04:00", flowRate: 0, batteryPercent: 76, batteryVoltage: 12.2, solarInputWatts: 0, status: "idle" },
  { timestamp: "05:00", flowRate: 0, batteryPercent: 74, batteryVoltage: 12.2, solarInputWatts: 0, status: "idle" },
  { timestamp: "06:00", flowRate: 16.5, batteryPercent: 73, batteryVoltage: 12.3, solarInputWatts: 5, status: "watering" },
  { timestamp: "07:00", flowRate: 24.2, batteryPercent: 76, batteryVoltage: 12.6, solarInputWatts: 20, status: "watering" },
  { timestamp: "08:00", flowRate: 19.0, batteryPercent: 81, batteryVoltage: 12.9, solarInputWatts: 35, status: "watering" },
  { timestamp: "09:00", flowRate: 0, batteryPercent: 86, batteryVoltage: 13.2, solarInputWatts: 48, status: "charging" },
  { timestamp: "10:00", flowRate: 0, batteryPercent: 90, batteryVoltage: 13.5, solarInputWatts: 58, status: "charging" },
  { timestamp: "11:00", flowRate: 0, batteryPercent: 94, batteryVoltage: 13.7, solarInputWatts: 64, status: "charging" },
  { timestamp: "12:00", flowRate: 0, batteryPercent: 96, batteryVoltage: 13.8, solarInputWatts: 68, status: "charging" },
  { timestamp: "13:00", flowRate: 0, batteryPercent: 95, batteryVoltage: 13.6, solarInputWatts: 62, status: "charging" },
  { timestamp: "14:00", flowRate: 14.8, batteryPercent: 91, batteryVoltage: 13.1, solarInputWatts: 52, status: "watering" },
  { timestamp: "15:00", flowRate: 18.4, batteryPercent: 88, batteryVoltage: 12.8, solarInputWatts: 48, status: "watering" },
  { timestamp: "16:00", flowRate: 8.2, batteryPercent: 87, batteryVoltage: 12.7, solarInputWatts: 32, status: "watering" },
  { timestamp: "17:00", flowRate: 0, batteryPercent: 87, batteryVoltage: 12.6, solarInputWatts: 15, status: "standby" },
  { timestamp: "18:00", flowRate: 0, batteryPercent: 86, batteryVoltage: 12.5, solarInputWatts: 2, status: "standby" },
  { timestamp: "19:00", flowRate: 0, batteryPercent: 85, batteryVoltage: 12.4, solarInputWatts: 0, status: "standby" },
  { timestamp: "20:00", flowRate: 0, batteryPercent: 84, batteryVoltage: 12.4, solarInputWatts: 0, status: "standby" },
  { timestamp: "21:00", flowRate: 0, batteryPercent: 83, batteryVoltage: 12.4, solarInputWatts: 0, status: "standby" },
  { timestamp: "22:00", flowRate: 0, batteryPercent: 82, batteryVoltage: 12.4, solarInputWatts: 0, status: "standby" },
  { timestamp: "23:00", flowRate: 0, batteryPercent: 81, batteryVoltage: 12.4, solarInputWatts: 0, status: "standby" },
];

export interface HistoricalQueryParams {
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string; // YYYY-MM-DD
  endTime: string; // HH:mm
}

export interface HistoricalQueryResult {
  params: HistoricalQueryParams;
  dataPoints: TelemetryDataPoint[];
  summary: {
    totalVolumeLiters: number;
    averageFlowRate: number;
    peakFlowRate: number;
    peakFlowTime: string;
    averageBatteryPercent: number;
    minBatteryPercent: number;
    minBatteryTime: string;
    activeCyclesCount: number;
  };
}

/**
 * Generates realistic historical data based on user-selected range
 */
export function generateHistoricalData(params: HistoricalQueryParams): HistoricalQueryResult {
  const start = new Date(`${params.startDate}T${params.startTime}:00`);
  const end = new Date(`${params.endDate}T${params.endTime}:00`);

  // Fallback if dates are invalid or start >= end
  const validEnd = end > start ? end : new Date(start.getTime() + 24 * 3600 * 1000);

  const diffMs = validEnd.getTime() - start.getTime();
  const diffHours = Math.max(1, Math.round(diffMs / (3600 * 1000)));

  // Determine sampling interval based on total hours
  // <= 48 hours: 1-hour interval
  // 48h to 7 days: 2-hour or 4-hour interval
  // > 7 days: 6-hour or 12-hour interval
  let stepHours = 1;
  if (diffHours > 24 * 14) {
    stepHours = 12;
  } else if (diffHours > 24 * 7) {
    stepHours = 6;
  } else if (diffHours > 48) {
    stepHours = 3;
  }

  const dataPoints: TelemetryDataPoint[] = [];
  let totalVolume = 0;
  let peakFlow = 0;
  let peakFlowTime = "";
  let minBattery = 100;
  let minBatteryTime = "";
  let totalBatterySum = 0;
  let activeCycles = 0;
  let inActiveCycle = false;

  for (let currentMs = start.getTime(); currentMs <= validEnd.getTime(); currentMs += stepHours * 3600 * 1000) {
    const d = new Date(currentMs);
    const hour = d.getHours();
    const dateStr = d.toISOString().split("T")[0];
    const timeStr = `${String(hour).padStart(2, "0")}:00`;
    const label = diffHours > 48 ? `${dateStr.slice(5)} ${timeStr}` : timeStr;

    // Simulate realistic irrigation cycle:
    // Scheduled morning watering at 06:00-08:00
    // Scheduled afternoon cycle at 14:00-15:00
    // Random variations based on day
    const daySeed = (d.getDate() * 17 + hour * 31) % 100;
    let flow = 0;
    if (hour >= 6 && hour <= 8) {
      flow = 16 + (daySeed % 10);
    } else if (hour >= 14 && hour <= 15) {
      flow = 14 + (daySeed % 8);
    } else if (hour === 18 && daySeed > 70) {
      flow = 10 + (daySeed % 5);
    }

    if (flow > 0) {
      if (!inActiveCycle) {
        activeCycles++;
        inActiveCycle = true;
      }
    } else {
      inActiveCycle = false;
    }

    // Battery simulation:
    // Discharges slowly overnight (00:00 - 06:00): 84% down to ~72%
    // Charges up during sunlight (07:00 - 16:00): up to ~95%
    // Evening standby (17:00 - 23:00): drops gradually
    let battery = 80;
    let solarWatts = 0;
    if (hour >= 7 && hour <= 16) {
      const sunCurve = Math.sin(((hour - 7) / 9) * Math.PI);
      solarWatts = Math.round(sunCurve * 70);
      battery = Math.min(98, Math.round(75 + sunCurve * 22 - (flow > 0 ? 3 : 0)));
    } else if (hour >= 17) {
      battery = Math.round(92 - ((hour - 17) / 7) * 12);
      solarWatts = 0;
    } else {
      battery = Math.round(80 - (hour / 7) * 8);
      solarWatts = 0;
    }

    const voltage = +(11.8 + (battery / 100) * 1.8).toFixed(1);

    // Cumulative stats
    const stepVolume = Math.round(flow * (stepHours * 60));
    totalVolume += stepVolume;
    totalBatterySum += battery;

    if (flow > peakFlow) {
      peakFlow = flow;
      peakFlowTime = `${dateStr} ${timeStr}`;
    }

    if (battery < minBattery) {
      minBattery = battery;
      minBatteryTime = `${dateStr} ${timeStr}`;
    }

    dataPoints.push({
      timestamp: label,
      fullDate: `${dateStr} ${timeStr}`,
      flowRate: flow,
      batteryPercent: battery,
      batteryVoltage: voltage,
      solarInputWatts: solarWatts,
      cumulativeVolumeLiters: totalVolume,
      status: flow > 0 ? "watering" : solarWatts > 10 ? "charging" : "idle",
    });
  }

  const avgFlow = dataPoints.length > 0 ? +(totalVolume / (dataPoints.length * stepHours * 60)).toFixed(1) : 0;
  const avgBattery = dataPoints.length > 0 ? Math.round(totalBatterySum / dataPoints.length) : 0;

  return {
    params,
    dataPoints,
    summary: {
      totalVolumeLiters: totalVolume,
      averageFlowRate: avgFlow,
      peakFlowRate: peakFlow,
      peakFlowTime: peakFlowTime || `${params.startDate} 07:00`,
      averageBatteryPercent: avgBattery,
      minBatteryPercent: minBattery === 100 ? 72 : minBattery,
      minBatteryTime: minBatteryTime || `${params.startDate} 05:00`,
      activeCyclesCount: Math.max(1, activeCycles),
    },
  };
}
