export interface ChartData {
  labels: string[];
  totalSessions: number[];
  activeSessions: number[];
  blockingSessions: number[];
  waitSessions: number[];
  sessionCountGroupByUser: Record<string, { name: string; value: number }[]>;
  sessionCountGroupByType: Record<string, { name: string; value: number }[]>;
  sessionCountGroupByCommand: Record<string, { name: string; value: number }[]>;
  sessionCountGroupByMachine: Record<string, { name: string; value: number }[]>;
  [key: string]: any;
}

export interface ChartWrapper {
  chartData: ChartData;
  commonDate: string;
}
