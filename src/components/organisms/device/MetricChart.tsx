import { useEffect, useRef, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import ChartCollection from 'components/molecules/chart/ChartCollection';
import Text from 'components/atoms/text/Text';
import getMonitoringData from 'services/deviceMonitoring';
import { ChartData } from 'types/ChartData';
import { convertSessionCountByKey } from 'utils/convertSessionCountByKey';

const mergeCounts = (
  prevGroup: Record<string, number[]>,
  newGroup: Record<string, number[]>
) => {
  const mergedGroup = { ...prevGroup };

  Object.entries(newGroup).forEach(([key, newValues]) => {
    if (!mergedGroup[key]) {
      mergedGroup[key] = [...newValues];
    } else {
      mergedGroup[key] = [...mergedGroup[key], ...newValues];
    }
  });

  return mergedGroup;
};

const MetricChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    totalSessions: [],
    activeSessions: [],
    blockingSessions: [],
    waitSessions: [],
    sessionCountGroupByUser: {},
    sessionCountGroupByType: {},
    sessionCountGroupByCommand: {},
    sessionCountGroupByMachine: {},
  });
  const [commonDate, setCommonDate] = useState<string>('');
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0Iiwicm9sZSI6IlJPTEVfQURNSU4iLCJsb2dpbklkIjoiQTAwMDAwMDAwMDE2MSIsImNvbXBhbnlJZCI6OTk5OSwic2FsdCI6Inc5aTFBSkRZbXZHS0s0M3M4WDNRbmc9PSIsIm93bmVyTmFtZSI6IuqzoOq4uOuPmSIsImlhdCI6MTczMTI0MTI4MiwiZXhwIjoxNzM3MjQxMjgyfQ.JzUX4pJOkUiaKA8SD9tkNkkkz6qwCF0rzMJMdRYO1vo'; // 실제 token 값 사용

  const location = useLocation();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const loadData = () => {
      getMonitoringData(
        token,
        'LOCALHOST',
        '5s',
        '2024-11-10T01:10:00',
        '2024-11-10T01:11:00',
        (response) => {
          const { data } = response.data;
          const fullLabels = Object.keys(data.totalSessions);
          const commonDateValue = fullLabels[0].split('T')[0];
          const labels = fullLabels.map((label) => label.split('T')[1]);
          const convertedUserData = convertSessionCountByKey(
            data,
            'sessionCountGroupByUser'
          );
          const convertedTypeData = convertSessionCountByKey(
            data,
            'sessionCountGroupByType'
          );
          const convertedCommandData = convertSessionCountByKey(
            data,
            'sessionCountGroupByCommand'
          );
          const convertedMachineData = convertSessionCountByKey(
            data,
            'sessionCountGroupByMachine'
          );

          setChartData({
            labels,
            totalSessions: Object.values(data.totalSessions),
            activeSessions: Object.values(data.activeSessions),
            blockingSessions: Object.values(data.blockingSessions),
            waitSessions: Object.values(data.waitSessions),
            sessionCountGroupByUser: convertedUserData,
            sessionCountGroupByType: convertedTypeData,
            sessionCountGroupByCommand: convertedCommandData,
            sessionCountGroupByMachine: convertedMachineData,
          });

          setCommonDate(commonDateValue);
        },
        (error) => {
          console.error('데이터 로드 실패:', error);
        }
      );
    };

    loadData();
  }, [token]);

  useEffect(() => {
    const isDashboardPath = matchPath(
      '/dashboard/:companyId/:deviceAlias',
      location.pathname
    );

    if (isDashboardPath && !socketRef.current) {
      const ws = new WebSocket(
        `ws://localhost:8080/ws/monitoring/9999/LOCALHOST?token=${token}`
      );

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const fullLabels = Object.keys(data.totalSessions);
          const newTimestamp = fullLabels[0].split('T')[1];
          const commonDateValue = fullLabels[0].split('T')[0];
          const convertedUserData = convertSessionCountByKey(
            data,
            'sessionCountGroupByUser'
          );
          const convertedTypeData = convertSessionCountByKey(
            data,
            'sessionCountGroupByType'
          );
          const convertedCommandData = convertSessionCountByKey(
            data,
            'sessionCountGroupByCommand'
          );
          const convertedMachineData = convertSessionCountByKey(
            data,
            'sessionCountGroupByMachine'
          );

          setChartData((prevData) => {
            const updatedLabels = [...prevData.labels, newTimestamp];
            const updatedTotalSessions = [
              ...prevData.totalSessions,
              data.totalSessions[fullLabels[0]],
            ];
            const updatedActiveSessions = [
              ...prevData.activeSessions,
              data.activeSessions[fullLabels[0]],
            ];
            const updatedBlockingSessions = [
              ...prevData.blockingSessions,
              data.blockingSessions[fullLabels[0]],
            ];
            const updatedWaitSessions = [
              ...prevData.waitSessions,
              data.waitSessions[fullLabels[0]],
            ];

            const updatedSessionCountGroupByUser = mergeCounts(
              prevData.sessionCountGroupByUser,
              convertedUserData
            );
            const updatedSessionCountGroupByType = mergeCounts(
              prevData.sessionCountGroupByType,
              convertedTypeData
            );
            const updatedSessionCountGroupByCommand = mergeCounts(
              prevData.sessionCountGroupByCommand,
              convertedCommandData
            );
            const updatedSessionCountGroupByMachine = mergeCounts(
              prevData.sessionCountGroupByMachine,
              convertedMachineData
            );

            const maxDataPoints = 13;
            if (updatedLabels.length > maxDataPoints) {
              updatedLabels.shift();
              updatedTotalSessions.shift();
              updatedActiveSessions.shift();
              updatedBlockingSessions.shift();
              updatedWaitSessions.shift();

              Object.keys(updatedSessionCountGroupByUser).forEach((key) => {
                if (updatedSessionCountGroupByUser[key].length > maxDataPoints)
                  updatedSessionCountGroupByUser[key].shift();
              });

              Object.keys(updatedSessionCountGroupByType).forEach((key) => {
                if (updatedSessionCountGroupByType[key].length > maxDataPoints)
                  updatedSessionCountGroupByType[key].shift();
              });

              Object.keys(updatedSessionCountGroupByCommand).forEach((key) => {
                if (
                  updatedSessionCountGroupByCommand[key].length > maxDataPoints
                )
                  updatedSessionCountGroupByCommand[key].shift();
              });

              Object.keys(updatedSessionCountGroupByMachine).forEach((key) => {
                if (
                  updatedSessionCountGroupByMachine[key].length > maxDataPoints
                )
                  updatedSessionCountGroupByMachine[key].shift();
              });
            }

            return {
              labels: updatedLabels,
              totalSessions: updatedTotalSessions,
              activeSessions: updatedActiveSessions,
              blockingSessions: updatedBlockingSessions,
              waitSessions: updatedWaitSessions,
              sessionCountGroupByUser: updatedSessionCountGroupByUser,
              sessionCountGroupByType: updatedSessionCountGroupByType,
              sessionCountGroupByCommand: updatedSessionCountGroupByCommand,
              sessionCountGroupByMachine: updatedSessionCountGroupByMachine,
            };
          });
          setCommonDate(commonDateValue);
        } catch (error) {
          console.error('WebSocket 데이터 처리 오류:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket 오류:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket 연결 종료');
        socketRef.current = null;
      };

      socketRef.current = ws;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [location.pathname, token]);

  return (
    <div className="dashboard">
      <div className="dashboard__title">
        <Text content="Database Monitoring Service" type="title" />
        <div className="dashboard__title__sub">
          <Text content="모니터링 서비스" type="subtitle" />
          <Text content={`기준 기간: ${commonDate}`} type="info" bold />
        </div>
      </div>
      <ChartCollection chartData={chartData} commonDate={commonDate} />
    </div>
  );
};

export default MetricChart;
