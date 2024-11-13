import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Dashboard.scss';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';

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

const jwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Iiwicm9sZSI6IlJPTEVfQURNSU4iLCJsb2dpbklkIjoiQTAwMDAwMDAwMDE2MSIsImNvbXBhbnlJZCI6OTk5OSwic2FsdCI6IkxJYnQ2RE1vWTVJY0pmUHZEUXFKQlE9PSIsImlhdCI6MTczMTQxMjQ1NCwiZXhwIjoxNzMxNDE2MDU0fQ.ZGJx8d-IYXu8X4-UEU48_yC-UuHmzd80EZRrI1BKZkc';

// prettier-ignore
const headerMeta = [
  'Generate time', 'SID', 'SERIAL', 'USERNAME', 'COMMAND', 'COMMAND_NAME', 'STATUS', 'SCHEMANAME', 
  'OSUSER', 'PROCESS', 'MACHINE', 'PORT', 'TERMINAL', 'PROGRAM', 'TYPE', 'SQL_ID', 'SQL_EXEC_START', 
  'SQL_EXEC_ID', 'SQL_TEXT', 'MODULE', 'ACTION', 'LOGON_TIME', 'LAST_CALL_ET', 'FAILED_OVER', 
  'BLOCKING_SESSION_STATUS', 'EVENT', 'WAIT_CLASS', 'STATE', 'WAIT_TIME_MICRO', 'TIME_REMAINING_MICRO', 
  'SERVICE_NAME'
];

// prettier-ignore
const colWidth = [
  '3%', '3%', '4%', '6%', '4%', '6%', '6%', '6%', '5%', '5%', '6%', '5%', '5%', '5%', '4%', '5%',
  '6%', '4%', '5%', '6%', '4%', '6%', '6%', '5%', '6%', '5%', '5%', '5%', '4%', '5%', '5%',
];

const formatTime = (collectedAt: string): string => {
  const date = new Date(collectedAt);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

const RowComponent = ({ data }: { data: SessionData }) => (
  <tr className="table__row" key={data.sid + data.collectedAt}>
    <td className="table__cell">{formatTime(data.collectedAt)}</td>
    <td className="table__cell">{data.sid}</td>
    <td className="table__cell">{data.serial}</td>
    <td className="table__cell">{data.username}</td>
    <td className="table__cell">{data.command}</td>
    <td className="table__cell">{data.commandName}</td>
    <td className="table__cell">{data.status}</td>
    <td className="table__cell">{data.schemaName}</td>
    <td className="table__cell">{data.osUser}</td>
    <td className="table__cell">{data.process}</td>
    <td className="table__cell">{data.machine}</td>
    <td className="table__cell">{data.port}</td>
    <td className="table__cell">{data.terminal}</td>
    <td className="table__cell">{data.program}</td>
    <td className="table__cell">{data.type}</td>
    <td className="table__cell">{data.sqlId}</td>
    <td className="table__cell">{data.sqlExecStart}</td>
    <td className="table__cell">{data.sqlExecId}</td>
    <td className="table__cell">{data.sqlText}</td>
    <td className="table__cell">{data.module}</td>
    <td className="table__cell">{data.action}</td>
    <td className="table__cell">{data.logonTime}</td>
    <td className="table__cell">{data.lastCallEt}</td>
    <td className="table__cell">{data.failedOver}</td>
    <td className="table__cell">{data.blockingSessionStatus}</td>
    <td className="table__cell">{data.event}</td>
    <td className="table__cell">{data.waitClass}</td>
    <td className="table__cell">{data.state}</td>
    <td className="table__cell">{data.waitTimeMicro}</td>
    <td className="table__cell">{data.timeRemainingMicro}</td>
    <td className="table__cell">{data.serviceName}</td>
  </tr>
);

const Dashboard: React.FC = () => {
  const [data, setData] = useState<SessionData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadSessionData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/monitoring/grid',
        {
          params: { page: page - 1, size: 20 },
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const { content: newData } = response.data.data;

      // prettier-ignore
      setData((prevData) => {
        const uniqueNewData = newData.filter(
          (newItem: SessionData) =>
            !prevData.some(
              (item: SessionData) =>
                item.sid === newItem.sid && item.collectedAt === newItem.collectedAt
            )
        );
        // prettier-ignore
        return [...uniqueNewData, ...prevData].sort(
          (a, b) => new Date(b.collectedAt).getTime() - new Date(a.collectedAt).getTime()
        );
      });

      setHasMore(newData.length === 20);
      setPage((prevPage) => prevPage + 1);
    } catch (err: any) {
      setErrorMsg(
        err.response?.status === 401
          ? 'Unauthorized - Invalid or expired token'
          : 'Error loading data'
      );
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  const handleScroll = useCallback(() => {
    const table = document.querySelector('.dashboard__table');
    if (table && !loading && hasMore) {
      const { scrollTop, scrollHeight, clientHeight } = table;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadSessionData();
      }
    }
  }, [loadSessionData, loading, hasMore]);

  useEffect(() => {
    loadSessionData();
  }, [loadSessionData]);

  useEffect(() => {
    const table = document.querySelector('.dashboard__table');
    if (table) {
      table.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (table) {
        table.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="dashboard__container">
      <div className="dashboard__title">
        <Text content="Session Data List" type="title" />
        <Text content="데이터베이스 정보" type="subtitle" />
      </div>
      <div className="dashboard__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={data}
          RowComponent={RowComponent}
        />
        {errorMsg && <div>{errorMsg}</div>}
      </div>
    </div>
  );
};

export default Dashboard;
