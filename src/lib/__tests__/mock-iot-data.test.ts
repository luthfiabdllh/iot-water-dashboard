import { describe, it, expect } from "vitest";
import {
  CURRENT_TELEMETRY,
  TODAY_HOURLY_DATA,
  generateHistoricalData,
} from "../mock-iot-data";

describe("mock-iot-data", () => {
  it("provides valid CURRENT_TELEMETRY mock", () => {
    expect(CURRENT_TELEMETRY).toBeDefined();
    expect(CURRENT_TELEMETRY.flowRate).toBeGreaterThan(0);
    expect(CURRENT_TELEMETRY.batteryPercent).toBeGreaterThanOrEqual(0);
    expect(CURRENT_TELEMETRY.batteryPercent).toBeLessThanOrEqual(100);
    expect(CURRENT_TELEMETRY.valvesOpen).toBe(3);
    expect(CURRENT_TELEMETRY.valvesTotal).toBe(4);
    expect(CURRENT_TELEMETRY.batteryStatus).toBe("Charging (Solar)");
  });

  it("provides 24 hours of TODAY_HOURLY_DATA", () => {
    expect(TODAY_HOURLY_DATA).toBeInstanceOf(Array);
    expect(TODAY_HOURLY_DATA.length).toBe(24);
    expect(TODAY_HOURLY_DATA[0]).toHaveProperty("timestamp");
    expect(TODAY_HOURLY_DATA[0]).toHaveProperty("flowRate");
    expect(TODAY_HOURLY_DATA[0]).toHaveProperty("batteryPercent");
  });

  describe("generateHistoricalData", () => {
    it("generates data and summary for a single day range", () => {
      const result = generateHistoricalData({
        startDate: "2026-10-01",
        startTime: "00:00",
        endDate: "2026-10-01",
        endTime: "23:59",
      });

      expect(result).toBeDefined();
      expect(result.dataPoints.length).toBeGreaterThan(0);
      expect(result.summary.averageFlowRate).toBeGreaterThanOrEqual(0);
      expect(result.summary.totalVolumeLiters).toBeGreaterThanOrEqual(0);
      expect(result.summary.averageBatteryPercent).toBeGreaterThanOrEqual(0);
      expect(result.summary.peakFlowRate).toBeGreaterThanOrEqual(0);
      expect(result.summary.minBatteryPercent).toBeGreaterThanOrEqual(0);
    });

    it("generates data for multi-day range (e.g., 7 days)", () => {
      const result = generateHistoricalData({
        startDate: "2026-09-24",
        startTime: "00:00",
        endDate: "2026-10-01",
        endTime: "23:59",
      });

      expect(result.dataPoints.length).toBeGreaterThan(0);
      expect(result.summary.peakFlowRate).toBeGreaterThanOrEqual(result.summary.averageFlowRate);
      expect(result.summary.averageBatteryPercent).toBeGreaterThanOrEqual(
        result.summary.minBatteryPercent
      );
    });

    it("handles inverted dates gracefully", () => {
      const result = generateHistoricalData({
        startDate: "2026-10-10",
        startTime: "00:00",
        endDate: "2026-10-01",
        endTime: "23:59",
      });

      expect(result.dataPoints.length).toBeGreaterThan(0);
      expect(result.dataPoints.length).toBeGreaterThanOrEqual(20);
    });
  });
});
