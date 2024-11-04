import React from 'react';
import Text from 'components/atoms/text/Text';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type Device from '../types/Device';
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
        // LOCALHOST21: 3,
        // BLOKING SESSION 3개
      },
      unusedDevice: {
        LOCALHOST22: 55,
        // 55분 전
      },
    },
    allDevices: [
      {
        deviceAlias: 'LOCALHOST12',
        type: 'ORACLE',
        status: 'ACTIVE',
        sid: 'XE',
        ip: '127.0.0.1',
        port: 1521,
        statusValue: 30,
      },
      {
        deviceAlias: 'LOCALHOST14',
        type: 'ORACLE',
        status: 'ACTIVE',
        sid: 'XE',
        ip: '127.0.0.1',
        port: 1521,
        statusValue: 30,
      },
      {
        deviceAlias: 'LOCALHOST3',
        type: 'ORACLE',
        status: 'ACTIVE',
        sid: 'XE',
        ip: '127.0.0.1',
        port: 1521,
        statusValue: 30,
      },
    ],
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
  const { warnDevice } = data.totalProcessInfo;
  const { unusedDevice } = data.totalProcessInfo;
  const { allDevices } = data;

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
        <div className="summary__card">
          <Text content="현재 가장 많이 사용되고 있는 DB" type="info" />
          {Object.keys(topUsedDevices).map((item) => (
            <div className="summary__card__db">
              <Text content={item} type="info" />
              <Text
                content={`${topUsedDevices[item as keyof typeof topUsedDevices]}`}
                type="info"
              />
            </div>
          ))}
        </div>
        <div className="summary__card">
          <Text content="주의 요망 DB" type="info" />
          {Object.entries(warnDevice).length > 0 ? (
            <div>
              {Object.keys(warnDevice).map((item) => (
                <div className="summary__card__db">
                  <Text content={item} type="info" />
                  <Text
                    content={`${warnDevice[item as keyof typeof warnDevice]}`}
                    type="info"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Text content="내역이 없습니다." type="info" color="neutral" />
          )}
        </div>
        <div className="summary__card">
          <Text content="사용한 지 오래된 DB" type="info" />
          {Object.entries(unusedDevice).length > 0 ? (
            <div>
              {Object.keys(unusedDevice).map((item) => (
                <div className="summary__card__db">
                  <Text content={item} type="info" />
                  <Text
                    content={`${Math.trunc(unusedDevice[item as keyof typeof unusedDevice] / 1440)}일 전`}
                    type="info"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Text content="내역이 없습니다." type="info" color="neutral" />
          )}
        </div>
      </div>
      <div>
        <Text content="전체 DB" type="subtitle" bold />
        <div className="device-list">
          {allDevices.map((item) => (
            <div
              key={item.deviceAlias}
              className={['device-card', `device-card--${item.status}`].join(
                ' '
              )}
            >
              <Text content={item.deviceAlias} type="info" />
              <Text content={item.sid} type="link" />
              <Text content={item.ip} type="link" />
              <Text content={`${item.port}`} type="link" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
