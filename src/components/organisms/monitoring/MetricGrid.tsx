import React, { useEffect, useState } from 'react';
import Table from 'components/organisms/table/Table';
// import { getMonitoringDataForGrid } from 'services/deviceMonitoring';
import SessionDataRow from 'components/molecules/table/SessionDataRow';
import { SessionData } from 'types/ChartData';

type MetricGridProps = { gridData: SessionData[] };

const MetricGrid = ({ gridData }: MetricGridProps) => {
  const [sessionData, setSessionData] = useState<SessionData[]>(gridData);
  useEffect(() => {
    setSessionData(gridData);
  }, [gridData]);
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
