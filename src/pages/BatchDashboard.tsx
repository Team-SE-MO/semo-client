import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { getJobExecutionData } from 'services/batchMonitoring';
import Text from 'components/atoms/text/Text';
import './BatchDashboard.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const averageLinePlugin: Plugin<'line'> = {
  id: 'averageLinePlugin',
  beforeDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    if (!scales || !chartArea) return;

    chart.data.datasets.forEach((dataset) => {
      const data = dataset.data as number[];
      if (data && data.length > 0) {
        const average = data.reduce((a, b) => a + b, 0) / data.length;
        ctx.save();
        ctx.strokeStyle = 'rgba(66, 82, 110, 1)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(chartArea.left, scales.y.getPixelForValue(average));
        ctx.lineTo(chartArea.right, scales.y.getPixelForValue(average));
        ctx.stroke();
        ctx.restore();
      }
    });
  },
};

interface SessionDataType {
  executionTimes: {
    [executionTime: string]: number;
  };
}

interface DailyJobDataType {
  executionDate: {
    [executionDate: string]: {
      storeJobDuration: number;
      retentionJobDuration: number;
    };
  };
}

const BatchDashboard = () => {
  const [sessionExecutionData, setSessionExecutionData] =
    useState<SessionDataType>();
  const [dailyJobData, setDailyJobData] = useState<DailyJobDataType>();
  const token = localStorage.getItem('accessToken');
  const socketRef = useRef<WebSocket | null>(null);

  const period = sessionExecutionData
    ? new Date(Object.keys(sessionExecutionData.executionTimes)[0])
        .toISOString()
        .split('T')[0]
    : '';

  const isInitialDataLoadedRef = useRef(false);
  useEffect(() => {
    const openNewSocket = () => {
      const ws = new WebSocket(
        `ws://10.50.20.63:8080/ws/monitoring/batch?token=${token}`
      );
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket 연결 성공');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as SessionDataType;

          setSessionExecutionData((prevData = { executionTimes: {} }) => {
            const updatedExecutionTimes = {
              ...prevData.executionTimes,
              ...data.executionTimes,
            };

            const now = Date.now();
            const filteredExecutionTimes = Object.keys(updatedExecutionTimes)
              .filter(
                (timestamp) =>
                  now - new Date(timestamp).getTime() <= 3 * 60 * 1000
              )
              .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) // 시간순 정렬
              .reduce(
                (acc, timestamp) => {
                  acc[timestamp] = updatedExecutionTimes[timestamp];
                  return acc;
                },
                {} as { [key: string]: number }
              );

            return { executionTimes: filteredExecutionTimes };
          });

          if (!isInitialDataLoadedRef.current) {
            console.log('초기 데이터 로드 완료');
            isInitialDataLoadedRef.current = true;
          }
        } catch (error) {
          console.error('WebSocket 데이터 처리 오류:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket 에러:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket 연결 종료');
      };
    };

    openNewSocket();

    return () => {
      socketRef.current?.close();
    };
  }, [token]);

  useEffect(() => {
    getJobExecutionData(
      ({ data }) => {
        setDailyJobData(data.data);
      },
      (error) => {
        console.log('일별 Job 실행시간 조회 실패:', error);
      }
    );
  }, []);

  const transformSessionData = (data: SessionDataType) => {
    const times = Object.keys(data.executionTimes).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    ); // 시간 순 오름차순 정렬
    const executionData = times.map((time) => data.executionTimes[time]);

    const nonZeroData = executionData.filter((value) => value !== 0);
    const average =
      nonZeroData.length > 0
        ? nonZeroData.reduce((sum, value) => sum + value, 0) /
          nonZeroData.length
        : 0;

    const formattedTimes = times.map((time) => {
      const date = new Date(time);
      return date.toTimeString().split(' ')[0]; // HH:mm:ss 형식
    });

    return {
      labels: formattedTimes,
      executionData,
      average: parseFloat(average.toFixed(2)), // 소수점 2자리로 표시
    };
  };

  const transformJobData = (data: any) => {
    const dates = Object.keys(data.executionDate).reverse();
    const storeJobData = dates.map(
      (date) => data.executionDate[date].storeJobDuration
    );
    const retentionJobData = dates.map(
      (date) => data.executionDate[date].retentionJobDuration
    );

    const nonZeroStoreJobData = storeJobData.filter((value) => value !== 0);
    const nonZeroRetentionJobData = retentionJobData.filter(
      (value) => value !== 0
    );

    const storeJobAvg = nonZeroStoreJobData.length
      ? Number(
          (
            nonZeroStoreJobData.reduce((a, b) => a + b, 0) /
            nonZeroStoreJobData.length
          ).toFixed(2)
        )
      : 0;

    const retentionJobAvg = nonZeroRetentionJobData.length
      ? Number(
          (
            nonZeroRetentionJobData.reduce((a, b) => a + b, 0) /
            nonZeroRetentionJobData.length
          ).toFixed(2)
        )
      : 0;

    return {
      labels: dates,
      storeJobData,
      retentionJobData,
      storeJobAvg,
      retentionJobAvg,
    };
  };

  const sessionChartData = sessionExecutionData
    ? {
        labels: transformSessionData(sessionExecutionData).labels,
        datasets: [
          {
            label: 'Session Job Duration',
            data: transformSessionData(sessionExecutionData).executionData,
            borderColor: '#00BCD4',
            backgroundColor: 'rgba(0, 188, 212, 0.1)',
            fill: true,
            tension: 0.4,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const dailyJobChartData = dailyJobData
    ? transformJobData(dailyJobData)
    : {
        labels: [],
        storeJobData: [],
        retentionJobData: [],
        storeJobAvg: 0,
        retentionJobAvg: 0,
      };

  const storeJobChartData = {
    labels: dailyJobChartData.labels,
    datasets: [
      {
        label: 'Store Job Duration',
        data: dailyJobChartData.storeJobData,
        borderColor: '#2E5BFF',
        backgroundColor: 'rgba(46, 91, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const retentionJobChartData = {
    labels: dailyJobChartData.labels,
    datasets: [
      {
        label: 'Retention Job Duration',
        data: dailyJobChartData.retentionJobData,
        borderColor: '#FFA500',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const sessionChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        reverse: false,
        grid: { display: false },
        ticks: {
          autoSkip: true,
          maxTicksLimit: Math.ceil(sessionChartData.labels.length / 2),
        },
      },
      y: {
        grid: {
          display: true,
          color: (context) => {
            return context.tick.value === 5 ? '#FF0000' : 'rgba(0, 0, 0, 0.1)';
          },
          drawTicks: true,
        },
        beginAtZero: true,
        min: 0,
        suggestedMin: 5,
        suggestedMax: 10,
        ticks: {
          callback: (value: string | number) => `${value as number}s`,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}s`;
          },
        },
      },
    },
    aspectRatio: 4,
    maintainAspectRatio: true,
  };

  const dailyJobChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: {},
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        beginAtZero: true,
        min: 0,
        suggestedMax: 10,
        ticks: {
          callback: (value: string | number) => `${value as number}s`,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}s`;
          },
        },
      },
      title: {
        display: true,
        position: 'top',
        align: 'start',
        color: '#42526e',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    maintainAspectRatio: false,
  };

  const collectionJobChartOptions: ChartOptions<'line'> = {
    ...sessionChartOptions,
    plugins: {
      ...sessionChartOptions.plugins,
      title: {
        display: true,
        text: `Session Job Average Duration: ${
          transformSessionData(sessionExecutionData || { executionTimes: {} })
            .average
        }s`,
        position: 'top',
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#42526e',
      },
    },
  };

  const storeJobChartOptions: ChartOptions<'line'> = {
    ...dailyJobChartOptions,
    plugins: {
      ...dailyJobChartOptions.plugins,
      title: {
        ...dailyJobChartOptions.plugins?.title,
        text: `StoreCsvJob Time Avg: ${dailyJobChartData.storeJobAvg}s`,
      },
    },
  };

  const retentionJobChartOptions: ChartOptions<'line'> = {
    ...dailyJobChartOptions,
    plugins: {
      ...dailyJobChartOptions.plugins,
      title: {
        ...dailyJobChartOptions.plugins?.title,
        text: `Retention Job Time Avg: ${dailyJobChartData.retentionJobAvg}s`,
      },
    },
  };

  return (
    <div className="batch-dashboard__container">
      <div className="batch-dashboard__title">
        <Text
          content="Batch System Performance Monitoring Service"
          type="title"
        />
        <div className="batch-dashboard__title--sub">
          <Text content="배치 시스템 성능 모니터링 서비스 " type="subtitle" />
          <Text content={`기준 일자 : ${period}`} type="info" bold />
        </div>
      </div>

      <div className="batch-dashboard__charts">
        <div className="batch-dashboard__chart--main">
          <div className="batch-dashboard__chart__wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart--large">
              <div className="base-chart">
                <Line
                  data={sessionChartData}
                  options={collectionJobChartOptions}
                  plugins={[averageLinePlugin]}
                />
              </div>
            </div>
            <div className="batch-dashboard__chart__subtitle">
              <Text
                content="Real-Time Session Data Collection Performance"
                type="main-content"
              />
            </div>
          </div>
        </div>
        <div className="batch-dashboard__chart--sub">
          <div className="batch-dashboard__chart__wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart--small">
              <div className="base-chart">
                <Line data={storeJobChartData} options={storeJobChartOptions} />
              </div>
            </div>
            <div className="batch-dashboard__chart__subtitle">
              <Text
                content="CSV Export Performance for Session Data "
                type="main-content"
              />
            </div>
          </div>
          <div className="batch-dashboard__chart__wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart--small">
              <div className="base-chart">
                <Line
                  data={retentionJobChartData}
                  options={retentionJobChartOptions}
                />
              </div>
            </div>
            <div className="batch-dashboard__chart-subtitle">
              <Text
                content="Monitoring Database Cleanup Performance"
                type="main-content"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchDashboard;
