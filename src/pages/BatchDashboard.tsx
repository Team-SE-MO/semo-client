import React from 'react';
import { Line } from 'react-chartjs-2';
import { Plugin, ChartOptions } from 'chart.js';
import Text from 'components/atoms/text/Text';

import './BatchDashboard.scss';

const subMockData = {
  code: 200,
  message: '성공적으로 일별 Job의 실행시간을 조회했습니다.',
  data: {
    executionDate: {
      '2024-11-15': {
        storeJobDuration: 6.2,
        retentionJobDuration: 0.0,
      },
      '2024-11-14': {
        storeJobDuration: 24.8,
        retentionJobDuration: 0.0,
      },
      '2024-11-13': {
        storeJobDuration: 42.4,
        retentionJobDuration: 0.8,
      },
      '2024-11-12': {
        storeJobDuration: 27.4,
        retentionJobDuration: 0.3,
      },
      '2024-11-11': {
        storeJobDuration: 0.0,
        retentionJobDuration: 0.0,
      },
      '2024-11-10': {
        storeJobDuration: 0.0,
        retentionJobDuration: 0.0,
      },
    },
  },
};

interface MainMockDataType {
  code: number;
  message: string;
  data: {
    executionTimes: {
      [key: string]: number;
    };
  };
}

const mainMockData: MainMockDataType = {
  code: 200,
  message: '성공적으로 현재 세션 Job의 실행시간을 조회했습니다.',
  data: {
    executionTimes: {
      '2024-11-16T22:06:25': 0.0,
      '2024-11-16T22:06:20': 1.7,
      '2024-11-16T22:06:15': 1.7,
      '2024-11-16T22:06:10': 1.7,
      '2024-11-16T22:06:05': 1.7,
      '2024-11-16T22:06:00': 1.7,
      '2024-11-16T22:05:55': 1.8,
      '2024-11-16T22:05:50': 1.6,
      '2024-11-16T22:05:45': 2.5,
      '2024-11-16T22:05:40': 1.7,
      '2024-11-16T22:05:35': 1.7,
      '2024-11-16T22:05:30': 1.6,
      '2024-11-16T22:05:25': 1.7,
      '2024-11-16T22:05:20': 1.6,
      '2024-11-16T22:05:15': 3.4,
      '2024-11-16T22:05:10': 1.7,
      '2024-11-16T22:05:05': 1.7,
      '2024-11-16T22:05:00': 1.7,
      '2024-11-16T22:04:55': 1.7,
      '2024-11-16T22:04:50': 1.7,
      '2024-11-16T22:04:45': 1.7,
      '2024-11-16T22:04:40': 1.7,
      '2024-11-16T22:04:35': 1.7,
      '2024-11-16T22:04:30': 1.7,
      '2024-11-16T22:04:25': 1.6,
      '2024-11-16T22:04:20': 1.7,
      '2024-11-16T22:04:15': 1.7,
      '2024-11-16T22:04:10': 1.7,
      '2024-11-16T22:04:05': 1.6,
      '2024-11-16T22:04:00': 1.7,
      '2024-11-16T22:03:55': 1.7,
      '2024-11-16T22:03:50': 2.1,
      '2024-11-16T22:03:45': 1.7,
      '2024-11-16T22:03:40': 1.8,
      '2024-11-16T22:03:35': 1.6,
      '2024-11-16T22:03:30': 1.7,
    },
  },
};

const BatchDashboard = () => {
  // 메인 차트용 데이터 변환 함수
  const transformMainData = (data: any) => {
    const times = Object.keys(data.executionTimes).reverse();
    const executionData = times.map((time) => data.executionTimes[time]);
    
    // 평균 계산
    const average = executionData.reduce((acc, val) => acc + val, 0) / executionData.length;

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
  const transformSubData = (data: any) => {
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

  const mainChartData = {
    labels: transformMainData(mainMockData.data).labels,
    datasets: [
      {
        label: 'Session Job Duration',
        data: transformMainData(mainMockData.data).executionData,
        borderColor: '#00BCD4',
        backgroundColor: 'rgba(0, 188, 212, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const subChartData = transformSubData(subMockData.data);

  const subChart1Data = {
    labels: subChartData.labels,
    datasets: [
      {
        label: 'Store Job Duration',
        data: subChartData.storeJobData,
        borderColor: '#2E5BFF',
        backgroundColor: 'rgba(46, 91, 255, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const subChart2Data = {
    labels: subChartData.labels,
    datasets: [
      {
        label: 'Retention Job Duration',
        data: subChartData.retentionJobData,
        borderColor: '#FFA500',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const mainChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          autoSkip: true,
          maxTicksLimit: Math.ceil(mainChartData.labels.length / 2),
        },
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
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

  const subChartOptions: ChartOptions<'line'> = {
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
                <Line data={mainChartData} options={mainChartOptions} />
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
          {/* 서브 차트 카드 1 */}
          <div className="batch-dashboard__chart-wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart-small">
              <div className="base-chart chart-small">
                <Line data={subChart1Data} options={subChartOptions} />
              </div>
            </div>
            <div className="chart-subtitle">
              <Text
                content="CSV Export Performance for Session Data "
                type="main-content"
              />
            </div>
          </div>
          {/* 서브 차트 카드 2 */}
          <div className="batch-dashboard__chart-wrapper">
            <div className="batch-dashboard__chart__card batch-dashboard__chart-small">
              <div className="base-chart chart-small">
                <Line data={subChart2Data} options={subChartOptions} />
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
