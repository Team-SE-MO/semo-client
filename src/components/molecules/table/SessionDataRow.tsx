import React, { useState, useEffect } from 'react';

interface SessionDataProps {
  content: {
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
  };
}

const SessionDataRow = ({ content }: SessionDataProps) => {
  const [rowData, setRowData] = useState(content);
  useEffect(() => {
    setRowData(content);
  }, [content]);
  return (
    <tr className="table__row">
      <td className="table__data">{rowData.collectedAt.split('T')[1]}</td>
      <td className="table__data">{rowData.sid}</td>
      <td className="table__data">{rowData.serial}</td>
      <td className="table__data">{rowData.username}</td>
      <td className="table__data">{rowData.command}</td>
      <td className="table__data">{rowData.commandName}</td>
      <td className="table__data">{rowData.status}</td>
      <td className="table__data">{rowData.schemaName}</td>
      <td className="table__data">{rowData.osUser}</td>
      <td className="table__data">{rowData.process}</td>
      <td className="table__data">{rowData.machine}</td>
      <td className="table__data">{rowData.port}</td>
      <td className="table__data">{rowData.terminal}</td>
      <td className="table__data">{rowData.program}</td>
      <td className="table__data">{rowData.type}</td>
      <td className="table__data">{rowData.sqlId}</td>
      <td className="table__data">{rowData.sqlExecStart}</td>
      <td className="table__data">{rowData.sqlExecId}</td>
      <td className="table__data">{rowData.sqlText}</td>
      <td className="table__data">{rowData.module}</td>
      <td className="table__data">{rowData.action}</td>
      <td className="table__data">{rowData.logonTime.replace('T', ' ')}</td>
      <td className="table__data">{rowData.lastCallEt}</td>
      <td className="table__data">{rowData.failedOver}</td>
      <td className="table__data">{rowData.blockingSessionStatus}</td>
      <td className="table__data">{rowData.event}</td>
      <td className="table__data">{rowData.waitClass}</td>
      <td className="table__data">{rowData.state}</td>
      <td className="table__data">{rowData.waitTimeMicro}</td>
      <td className="table__data">{rowData.timeRemainingMicro}</td>
      <td className="table__data">{rowData.serviceName}</td>
    </tr>
  );
};

export default SessionDataRow;
