export interface DeviceMetricData {
  labels: string[];
  totalSessions: number[];
  activeSessions: number[];
  blockingSessions: number[];
  waitSessions: number[];
  sessionCountGroupByUser: Record<string, number[]>;
  sessionCountGroupByType: Record<string, number[]>;
  sessionCountGroupByCommand: Record<string, number[]>;
  sessionCountGroupByMachine: Record<string, number[]>;
  [key: string]: any;
}

export interface ChartWrapper {
  chartData: DeviceMetricData;
  commonDate: string;
}
