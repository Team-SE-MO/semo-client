interface Device {
  deviceAlias: string;
  type: string;
  status: string;
  sid: string;
  ip: string;
  port: number;
  statusValue: number;
}

export default Device;
