import React, { useEffect, useRef, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import ChartCollection from 'components/molecules/chart/ChartCollection';
import { getMonitoringData } from 'services/deviceMonitoring';
import { DeviceMetricData } from 'types/ChartData';
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
  const token = localStorage.getItem('accessToken');
  const userInfoStorage = localStorage.getItem('userInfoStorage');
  const userInfo = JSON.parse(userInfoStorage || '');
  const { companyId } = userInfo.state;

  const location = useLocation();
  const socketRef = useRef<Map<string, WebSocket>>(new Map());
  const pathMatch = matchPath(
    '/dashboard/:companyId/:deviceAlias',
    location.pathname
  );
  const initialDeviceAlias = pathMatch?.params.deviceAlias || '';

  const [deviceAlias, setDeviceAlias] = useState(initialDeviceAlias);
  const [chartData, setChartData] = useState<DeviceMetricData>({
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
  useEffect(() => {
    const loadData = () => {
      getMonitoringData(
        deviceAlias || '',
        '5s',
        '2024-11-12T21:34:00',
        '2024-11-12T21:35:00',
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
    const openNewSocket = () => {
      const ws = new WebSocket(
        `ws://localhost:8080/ws/monitoring/${companyId}/${deviceAlias}?token=${token}`
      );
      socketRef.current.set(deviceAlias, ws);
      console.log('생성', socketRef.current.get(deviceAlias));

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
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
        console.log(`WebSocket 연결 종료: ${deviceAlias}`);
        socketRef.current.delete(deviceAlias);
      };
    };

    openNewSocket();

    return () => {
      // 컴포넌트가 언마운트되거나 deviceAlias가 변경되면 기존 연결 종료
      const socket = socketRef.current.get(deviceAlias);
      console.log(socket, deviceAlias);
      if (socket) {
        socket.close();
        // socketRef.current.delete(deviceAlias);
      }
    };
  }, [deviceAlias]);

  return (
    <div className="metric-chart">
      <ChartCollection chartData={chartData} commonDate={commonDate} />
    </div>
  );
};

export default MetricChart;
