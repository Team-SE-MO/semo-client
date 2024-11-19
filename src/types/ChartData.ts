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
}

export interface SessionData {
  collectedAt: string;
  sid: number;
  serial: number;
  username: string;
  command: number;
  commandName: string;
  status: string;
  schemaName: string;
  osUser: string;
  process: string;
  machine: string;
  port: number;
  terminal: string;
  program: string;
  type: string;
  sqlId: string;
  sqlExecStart: string | null;
  sqlExecId: number;
  sqlText: string;
  module: string;
  action: string;
  logonTime: string;
  lastCallEt: number;
  failedOver: string;
  blockingSessionStatus: string;
  event: string;
  waitClass: string;
  state: string;
  waitTimeMicro: number;
  timeRemainingMicro: number;
  serviceName: string;
}
