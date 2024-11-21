import React, { useEffect, useRef, useState } from 'react';
import Table from 'components/organisms/table/Table';
import SessionDataRow from 'components/molecules/table/SessionDataRow';
import { SessionData } from 'types/ChartData';

interface MetricGridProps {
  gridData: SessionData[];
  loadMoreData: () => void;
  isLoading: boolean;
}
const MetricGrid = ({ gridData, loadMoreData, isLoading }: MetricGridProps) => {
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

  const [sessionData, setSessionData] = useState<SessionData[]>(gridData);
  const scrollTargetRef = useRef<HTMLDivElement | null>(null);

  const loadMoreDataRef = useRef(loadMoreData);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    setSessionData(gridData);
  }, [gridData]);

  useEffect(() => {
    loadMoreDataRef.current = loadMoreData;
    isLoadingRef.current = isLoading;
  }, [loadMoreData, isLoading]);

  useEffect(() => {
    if (!scrollTargetRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreData();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollTargetRef.current);

    return () => {
      if (scrollTargetRef.current) {
        observer.unobserve(scrollTargetRef.current);
      }
    };
  }, [loadMoreData]);

  return (
    <>
      <Table
        colWidth={colWidth}
        headerMeta={headerMeta}
        content={sessionData}
        RowComponent={SessionDataRow}
      />
      <div ref={scrollTargetRef} style={{ height: '10px' }} />
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default MetricGrid;
