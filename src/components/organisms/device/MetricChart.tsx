import { useEffect, useState } from 'react';
import ChartCollection from 'components/molecules/chart/ChartCollection';
import Text from 'components/atoms/text/Text';
import getMonitoringData from 'services/deviceMonitoring';
import { ChartData } from 'types/ChartData';

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
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NCIsInJvbGUiOiJST0xFX0FETUlOIiwibG9naW5JZCI6IkExMjM0NTY3ODkxNDQiLCJjb21wYW55SWQiOjQxLCJzYWx0IjoiUkRRQzFOaGhlK21GWiswUHdPV2V4UT09IiwiaWF0IjoxNzMxMDg3MjY4LCJleHAiOjE3MzEwOTMyNjh9.HGfQTQ73PIdWJOrDL-4w96rHG0A8uq_baTT6jgJv9JM';

  useEffect(() => {
    const loadData = () => {
      if (!token) {
        console.error('토큰이 없습니다. 로그인이 필요합니다.');
        return;
      }

      getMonitoringData(
        token,
        'LOCALHOST', // deviceAlias
        '5s', // interval
        '2024-11-08T15:47:40', // startTime
        '2024-11-08T15:48:40', // endTime
        (response) => {
          const { data } = response.data;
          const fullLabels = Object.keys(data.totalSessions);
          const commonDateValue = fullLabels[0].split('T')[0];
          const labels = fullLabels.map((label) => label.split('T')[1]);

          setChartData({
            labels,
            totalSessions: Object.values(data.totalSessions),
            activeSessions: Object.values(data.activeSessions),
            blockingSessions: Object.values(data.blockingSessions),
            waitSessions: Object.values(data.waitSessions),
            sessionCountGroupByUser: data.sessionCountGroupByUser,
            sessionCountGroupByType: data.sessionCountGroupByType,
            sessionCountGroupByCommand: data.sessionCountGroupByCommand,
            sessionCountGroupByMachine: data.sessionCountGroupByMachine,
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

  return (
    <div className="dashboard">
      <div className="dashboard__title">
        <Text content="Database Monitoring Service" type="title" />
        <div className="dashboard__title__sub">
          <Text content="모니터링 서비스" type="subtitle" />
          <Text content={`기준 기간: ${commonDate}`} type="info" />
        </div>
      </div>
      <ChartCollection chartData={chartData} commonDate={commonDate} />
    </div>
  );
};

export default MetricChart;
