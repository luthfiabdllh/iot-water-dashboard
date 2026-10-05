import { HistoricalView } from "@/components/history/historical-view";

export const metadata = {
  title: "Historical View",
  description: "Historical telemetry, flow rates, and battery usage",
};

export default function HistoryPage() {
  return <HistoricalView />;
}
