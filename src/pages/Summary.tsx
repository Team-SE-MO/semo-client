import React from 'react';
import Text from 'components/atoms/text/Text';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './Summary.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
  const data = {
    companyName: '테스트회사 요청',
    totalProcessInfo: {
      activeDeviceCnt: 29,
      inActiveDeviceCnt: 5,
      blockedDeviceCnt: 1,
      topUsedDevices: {
        LOCALHOST20: 26,
        LOCALHOST14: 26,
        LOCALHOST7: 26,
      },
      warnDevice: {
        // "LOCALHOST21": 3 // BLOKING SESSION 3개
      },
      unUsedDevice: {
        // "LOCALHOST22": 55 // 55분 전
      },
    },
    allDevices: {
      LOCALHOST19: {
        type: 'ORACLE',
        status: 'ACTIVE',
        sid: 'XE',
        ip: '127.0.0.1',
        port: 1521,
        statusValue: 24,
      },
      LOCALHOST18: {
        type: 'ORACLE',
        status: 'ACTIVE',
        sid: 'XE',
        ip: '127.0.0.1',
        port: 1521,
        statusValue: 24,
      },
      LOCALHOST17: {
        type: 'ORACLE',
        status: 'ACTIVE',
        sid: 'XE',
        ip: '127.0.0.1',
        port: 1521,
        statusValue: 24,
      },
      LOCALHOST16: {
        type: 'ORACLE',
        status: 'ACTIVE',
        sid: 'XE',
        ip: '127.0.0.1',
        port: 1521,
        statusValue: 24,
      },
    },
  };
  const { companyName } = data;
  const activeCnt = data.totalProcessInfo.activeDeviceCnt;
  const inactiveCnt = data.totalProcessInfo.inActiveDeviceCnt;
  const blockedCnt = data.totalProcessInfo.blockedDeviceCnt;
  const dougnutData = {
    labels: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
    datasets: [
      {
        data: [activeCnt, inactiveCnt, blockedCnt],
        backgroundColor: ['#28a745', '#777777', '#f8a445'],
      },
    ],
  };
  const dougnutOpt = {
    responsive: false,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 40,
          padding: 20,
          usePointStyle: true,
          font: {
            family: "'Pretendard', 'serif'",
            lineHeight: 1,
          },
        },
      },
    },
    layouts: {
      padding: {
        right: 40,
      },
    },
  };
  const { topUsedDevices } = data.totalProcessInfo;
  return (
    <div className="summary__container">
      <div className="summary__title">
        <Text content="Database Overview" type="title" bold />
        <Text content="장비 목록 확인" type="subtitle" />
        <div className="summary__title__company-name">
          <Text content={companyName} type="title" />
          <Text content="의 장비 목록입니다." type="subtitle" />
        </div>
      </div>
      <div className="summary__overview">
        <div className="summary__overview__total-session">
          <Text content="Total DB" type="info" />
          <div className="summary__overview__dougnut-chart">
            <Doughnut data={dougnutData} options={dougnutOpt} />
          </div>
        </div>
        <div className="summary__overview__most-used">
          <Text content="현재 가장 많이 사용되고 있는 DB" type="info" />
          {Object.keys(topUsedDevices).map((item) => (
            <div>
              <Text content={item} type="info" />
              <Text
                content={`${topUsedDevices[item as keyof typeof topUsedDevices]}`}
                type="info"
              />
            </div>
          ))}
        </div>
        <div>
          <Text content="주의 요망 DB" type="info" />
        </div>
      </div>
    </div>
  );
};

export default Summary;
