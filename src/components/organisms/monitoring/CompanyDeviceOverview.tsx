import React from 'react';
import Text from 'components/atoms/text/Text';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import OverviewCardItem from 'components/molecules/monitoring/OverviewCardItem';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CompanyDeviceOverviewProps {
  activeCnt: number;
  inactiveCnt: number;
  blockedCnt: number;
  topUsedDevices: { [key: string]: number };
  warnDevice: { [key: string]: number };
  unusedDevice: { [key: string]: number };
}

const CompanyDeviceOverview = ({
  activeCnt,
  inactiveCnt,
  blockedCnt,
  topUsedDevices,
  warnDevice,
  unusedDevice,
}: CompanyDeviceOverviewProps) => {
  const doughnutData = {
    labels: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
    datasets: [
      {
        data: [activeCnt, inactiveCnt, blockedCnt],
        backgroundColor: ['#28a745', '#777777', '#f8a445'],
      },
    ],
  };
  const doughnutOpt = {
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
  return (
    <div className="summary__overview">
      <div className="summary__overview__total-session">
        <div className="summary__overview__total-count">
          <Text
            content={`${activeCnt + inactiveCnt + blockedCnt}`}
            type="title"
          />
        </div>
        <div className="summary__overview__chart__title">
          <Text content="Total DB" type="info" bold />
        </div>
        <div className="summary__overview__dougnut-chart">
          <Doughnut data={doughnutData} options={doughnutOpt} />
        </div>
      </div>
      <OverviewCardItem
        title="topUsedDevices"
        hasLine
        content={topUsedDevices}
      />
      <OverviewCardItem
        title="warnDevice"
        hasIcon
        hasLine
        content={warnDevice}
      />
      <OverviewCardItem title="unusedDevice" hasIcon content={unusedDevice} />
    </div>
  );
};

export default CompanyDeviceOverview;
