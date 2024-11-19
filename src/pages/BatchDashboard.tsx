import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import {
  getSessionExecutionData,
  getJobExecutionData,
} from 'services/batchMonitoring';
import Text from 'components/atoms/text/Text';
import './BatchDashboard.scss';

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

  const period = sessionExecutionData
    ? new Date(Object.keys(sessionExecutionData.executionTimes)[0])
        .toISOString()
        .split('T')[0]
    : '';

  useEffect(() => {
    getSessionExecutionData(
      ({ data }) => {
        setSessionExecutionData(data.data);
      },
      (error) => {
        console.log('세션 Job 실행시간 조회 실패:', error);
      }
    );

    getJobExecutionData(
      ({ data }) => {
        setDailyJobData(data.data);
      },
      (error) => {
        console.log('일별 Job 실행시간 조회 실패:', error);
      }
    );
  }, []);

  const transformSessionData = (data: any) => {
    if (!data) return { labels: [], executionData: [] };
    const times = Object.keys(data.executionTimes).reverse();
    const executionData = times.map((time) => data.executionTimes[time]);

    const formattedTimes = times.map((time) => {
      const date = time.split('T')[1];
      return date;
    });

    return {
      labels: formattedTimes,
      executionData,
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

    const storeJobAvg = Number(
      (storeJobData.reduce((a, b) => a + b, 0) / storeJobData.length).toFixed(2)
    );
    const retentionJobAvg = Number(
      (
        retentionJobData.reduce((a, b) => a + b, 0) / retentionJobData.length
      ).toFixed(2)
    );

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
                <Line data={sessionChartData} options={sessionChartOptions} />
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
