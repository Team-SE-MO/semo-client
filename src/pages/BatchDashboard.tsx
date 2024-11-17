import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Plugin, ChartOptions } from 'chart.js';
import { getSessionExecutionData } from 'services/batchMonitoring';
import Text from 'components/atoms/text/Text';

import './BatchDashboard.scss';

interface SubMockDataType {
  code: number;
  message: string;
  data: {
    executionDate: {
      [key: string]: {
        storeJobDuration: number;
        retentionJobDuration: number;
      };
    };
  };
}

const subMockData: SubMockDataType = {
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

interface SessionJobDataType {
  executionTimes: {
    [executionTime: string]: number;
  };
}

const BatchDashboard = () => {
  const [sessionExecutionData, setSessionExecutionData] =
    useState<SessionJobDataType>();

  useEffect(() => {
    getSessionExecutionData(
      ({ data }) => {
        setSessionExecutionData(data.data);
      },
      (error) => {
        console.log('세션 Job 실행시간 조회 실패:', error);
      }
    );
  }, []);

  // 메인 차트용 데이터 변환 함수
  const transformMainData = (data: any) => {
    if (!data) return { labels: [], executionData: [], average: 0 }; // 데이터가 없을 때 기본값 반환
    const times = Object.keys(data.executionTimes).reverse();
    const executionData = times.map((time) => data.executionTimes[time]);

    // 평균 계산
    const average =
      executionData.reduce((acc, val) => acc + val, 0) / executionData.length;

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
      average,
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

  const mainChartData = sessionExecutionData
    ? {
        labels: transformMainData(sessionExecutionData).labels,
        datasets: [
          {
            label: 'Session Job Duration',
            data: transformMainData(sessionExecutionData).executionData,
            borderColor: '#00BCD4',
            backgroundColor: 'rgba(0, 188, 212, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: '',
            data: Array(
              transformMainData(sessionExecutionData).labels.length
            ).fill(transformMainData(sessionExecutionData).average),
            borderColor: '#FF4081',
            borderDash: [5, 5], // 점선으로 표시
            fill: false,
            tension: 0,
          },
        ],
      }
    : { labels: [], datasets: [] }; // 데이터가 없을 때 빈 차트 데이터 반환

  const subChartData = transformSubData(subMockData.data);

  const storeJobChartData = {
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

  const retentionJobChartData = {
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
                <Line data={storeJobChartData} options={subChartOptions} />
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
                <Line data={retentionJobChartData} options={subChartOptions} />
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
