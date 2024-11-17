import React, { useState, useEffect, useCallback } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
// import { getMonitoringDataForGrid } from 'services/deviceMonitoring';
import SessionDataRow from 'components/molecules/table/SessionDataRow';

interface SessionData {
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

const MetricGrid = () => {
  const content = [
    {
      collectedAt: '2024-11-17T17:45:40',
      sid: 167,
      serial: 19,
      username: '-',
      command: 0,
      commandName: '-',
      status: 'ACTIVE',
      schemaName: 'SYS',
      osUser: 'SYSTEM',
      process: '8208',
      machine: 'DESKTOP-C5EEQRQ',
      port: 0,
      terminal: 'DESKTOP-C5EEQRQ',
      program: 'ORACLE.EXE (SMCO)',
      type: 'BACKGROUND',
      sqlId: '-',
      sqlExecStart: null,
      sqlExecId: 0,
      sqlText: '-',
      module: 'KTSJ',
      action: 'KTSJ Coordinator',
      logonTime: '2024-10-25T09:11:39',
      lastCallEt: 2018043,
      failedOver: 'NO',
      blockingSessionStatus: 'NO HOLDER',
      event: 'rdbms ipc message',
      waitClass: 'Idle',
      state: 'WAITING',
      waitTimeMicro: 38120,
      timeRemainingMicro: 2961880,
      serviceName: 'SYS$BACKGROUND',
    },
  ];
  const [sessionData, setSessionData] = useState<SessionData[]>(content);
  const headerMeta = [
    'Generate time',
    'SID',
    'SERIAL',
    'USERNAME',
    'COMMAND',
    'COMMAND_NAME',
    'STATUS',
    'SCHEMANAME',
    'OSUSER',
    'PROCESS',
    'MACHINE',
    'PORT',
    'TERMINAL',
    'PROGRAM',
    'TYPE',
    'SQL_ID',
    'SQL_EXEC_START',
    'SQL_EXEC_ID',
    'SQL_TEXT',
    'MODULE',
    'ACTION',
    'LOGON_TIME',
    'LAST_CALL_ET',
    'FAILED_OVER',
    'BLOCKING_SESSION_STATUS',
    'EVENT',
    'WAIT_CLASS',
    'STATE',
    'WAIT_TIME_MICRO',
    'TIME_REMAINING_MICRO',
    'SERVICE_NAME',
  ];
  const colWidth = [
    '150px',
    '100px',
    '100px',
    '150px',
    '100px',
    '200px',
    '150px',
    '150px',
    '150px',
    '120px',
    '200px',
    '120px',
    '200px',
    '200px',
    '150px',
    '150px',
    '150px',
    '150px',
    '150px',
    '150px',
    '180px',
    '180px',
    '150px',
    '150px',
    '240px',
    '180px',
    '150px',
    '150px',
    '160px',
    '220px',
    '200px',
  ];

  return (
    <div className="metric-grid__table">
      <Table
        colWidth={colWidth}
        headerMeta={headerMeta}
        content={sessionData}
        RowComponent={SessionDataRow}
      />
    </div>
  );
};

export default MetricGrid;
