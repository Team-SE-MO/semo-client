import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Plugin, ChartOptions } from 'chart.js';
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

  // 메인 차트용 데이터 변환 함수
  const transformSessionData = (data: any) => {
    if (!data) return { labels: [], executionData: [] }; // 데이터가 없을 때 기본값 반환
    const times = Object.keys(data.executionTimes).reverse();
    const executionData = times.map((time) => data.executionTimes[time]);

    const formattedTimes = times.map((time) => {
      const date = new Date(time);
      return date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    });

    return {
      labels: formattedTimes,
      executionData,
    };
  };

  // 서브 차트용 데이터 변환 함수
  const transformJobData = (data: any) => {
    const dates = Object.keys(data.executionDate).reverse();
    const storeJobData = dates.map(
      (date) => data.executionDate[date].storeJobDuration
    );
    const retentionJobData = dates.map(
      (date) => data.executionDate[date].retentionJobDuration
    );

    return {
      labels: dates,
      storeJobData,
      retentionJobData,
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
    : { labels: [], storeJobData: [], retentionJobData: [] };

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
            // y축 값이 5의 배수일 때 진한 색상 사용
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
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="batch-dashboard">
      <div className="batch-dashboard__title">
        <Text
          content="Batch System Performance Monitoring Service"
          type="title"
        />
        <Text content="배치 시스템 성능 모니터링 서비스 " type="subtitle" />
      </div>
      <div className="batch-dashboard__charts">
        {/* 메인 차트 영역 */}
        <div className="batch-dashboard__chart-main">
          <div className="batch-dashboard__chart-wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart-large">
              <div className="base-chart chart-large">
                <Line data={sessionChartData} options={sessionChartOptions} />
              </div>
            </div>
            <div className="chart-subtitle">
              <Text
                content="Real-Time Session Data Collection Performance"
                type="main-content"
              />
            </div>
          </div>
        </div>

        {/* 서브 차트 영역 */}
        <div className="batch-dashboard__chart-sub">
          <div className="batch-dashboard__chart-wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart-small">
              <div className="base-chart chart-small">
                <Line data={storeJobChartData} options={dailyJobChartOptions} />
              </div>
            </div>
            <div className="chart-subtitle">
              <Text
                content="CSV Export Performance for Session Data "
                type="main-content"
              />
            </div>
          </div>
          <div className="batch-dashboard__chart-wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart-small">
              <div className="base-chart chart-small">
                <Line
                  data={retentionJobChartData}
                  options={dailyJobChartOptions}
                />
              </div>
            </div>
            <div className="chart-subtitle">
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
