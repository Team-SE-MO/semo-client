import React, { useCallback, useEffect, useRef, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import MetricGrid from 'components/organisms/monitoring/MetricGrid';
import Text from 'components/atoms/text/Text';
import { Autocomplete, TextField } from '@mui/material';
import Device from 'types/Device';
import { getCurrentDate } from 'utils/customDate';
import { getGridData } from 'services/deviceMonitoring';
import './Dashboard.scss';
import { DeviceMetricData, SessionData } from 'types/ChartData';
import { convertSessionCountByKey } from 'utils/convertSessionCountByKey';
import useAuthStore from 'store/useAuthStore';
import MetricChart from '../components/organisms/monitoring/MetricChart';

interface DeviceItem extends Device {
  label: string;
}

const Dashboard = () => {
  const location = useLocation();
  const deviceList: DeviceItem[] = location.state?.deviceList || [];

  const companyId = useAuthStore((state) => state.companyId);

  const navigate = useNavigate();
  const pathMatch = matchPath(
    '/dashboard/:companyId/:deviceAlias',
    location.pathname
  );
  const initialDeviceAlias = pathMatch?.params.deviceAlias || '';
  const [deviceAlias, setDeviceAlias] = useState(initialDeviceAlias);
  const token = localStorage.getItem('accessToken');

  const socketRef = useRef<Map<string, WebSocket>>(new Map());
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

  const [gridData, setGridData] = useState<SessionData[]>([]);

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

  const [nextCursor, setNextCursor] = useState('');
  const isInitialDataLoadedRef = useRef(false);
  useEffect(() => {
    const openNewSocket = () => {
      const ws = new WebSocket(
        `ws://localhost:8080/ws/monitoring/${companyId}/${deviceAlias}?token=${token}`
      );
      socketRef.current.set(deviceAlias, ws);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!isInitialDataLoadedRef.current) {
            const fullLabels = Object.keys(data.totalSessions);
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

            setGridData((prev) => [...data.sessionDataInfos, ...prev]);
            setNextCursor(data.sessionDataInfos[0].collectedAt);

            isInitialDataLoadedRef.current = true;
          } else {
            const fullLabels = Object.keys(data.totalSessions);
            const newTimestamp = fullLabels[0].split('T')[1];
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
                  if (
                    updatedSessionCountGroupByUser[key].length > maxDataPoints
                  )
                    updatedSessionCountGroupByUser[key].shift();
                });

                Object.keys(updatedSessionCountGroupByType).forEach((key) => {
                  if (
                    updatedSessionCountGroupByType[key].length > maxDataPoints
                  )
                    updatedSessionCountGroupByType[key].shift();
                });

                Object.keys(updatedSessionCountGroupByCommand).forEach(
                  (key) => {
                    if (
                      updatedSessionCountGroupByCommand[key].length >
                      maxDataPoints
                    )
                      updatedSessionCountGroupByCommand[key].shift();
                  }
                );

                Object.keys(updatedSessionCountGroupByMachine).forEach(
                  (key) => {
                    if (
                      updatedSessionCountGroupByMachine[key].length >
                      maxDataPoints
                    )
                      updatedSessionCountGroupByMachine[key].shift();
                  }
                );
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
          }
        } catch (error) {
          console.error('WebSocket 데이터 처리 오류:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket 오류:', error);
      };

      ws.onclose = () => {
        socketRef.current.delete(deviceAlias);
      };
    };

    openNewSocket();

    return () => {
      // 컴포넌트가 언마운트되거나 deviceAlias가 변경되면 기존 연결 종료
      const socket = socketRef.current.get(deviceAlias);
      if (socket) {
        socket.close();
      }
    };
  }, [deviceAlias]);

  const [isLoading, setIsLoading] = useState(false);
  const loadMoreData = useCallback(() => {
    if (!isLoading && nextCursor) {
      setIsLoading(true);
      getGridData(
        deviceAlias,
        nextCursor,
        ({ data }) => {
          setGridData((prev) => [...prev, ...data.data.content]);
          setNextCursor(data.data.nextCursor);
        },
        (error) => {
          console.error('Error loading data:', error);
        }
      ).finally(() => {
        setIsLoading(false);
      });
    }
  }, [nextCursor]);

  return (
    <div className="dashboard__container">
      <div className="dashboard__title">
        <div className="dashboard__title__main">
          <Text content="Database Monitoring Service" type="title" />
          <Autocomplete
            disablePortal
            options={deviceList}
            size="small"
            sx={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
            filterOptions={(options, { inputValue }) =>
              options.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            onChange={(event, newValue) => {
              const selectedDeviceAlias = newValue?.deviceAlias;
              if (selectedDeviceAlias) {
                setDeviceAlias(selectedDeviceAlias);
                navigate(`/dashboard/${companyId}/${selectedDeviceAlias}`);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="DATABASE ALIAS" />
            )}
          />
        </div>
        <div className="dashboard__title__sub">
          <Text content="모니터링 서비스" type="subtitle" />
          <Text content={`기준 기간: ${getCurrentDate()}`} type="info" bold />
        </div>
      </div>
      <MetricChart chartData={chartData} />
      <div className="metric-grid__table">
        <MetricGrid
          gridData={gridData}
          loadMoreData={loadMoreData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
