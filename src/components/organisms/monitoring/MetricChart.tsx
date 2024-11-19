import React from 'react';
import { ChartWrapper } from 'types/ChartData';
import ActiveTotalSessionChart from 'components/molecules/chart/ActiveTotalSessionChart';
import BlockingWaitSessionChart from 'components/molecules/chart/BlockingWaitSessionChart';
import SessionCountGroupChart from 'components/molecules/chart/SessionCountGroupChart';

const MetricChart = ({ chartData }: ChartWrapper) => {
  return (
    <div className="dashboard__charts">
      <div className="dashboard__main-chart">
        <ActiveTotalSessionChart
          labels={chartData.labels}
          totalSessions={chartData.totalSessions}
          activeSessions={chartData.activeSessions}
        />
        <BlockingWaitSessionChart
          labels={chartData.labels}
          blockingSessions={chartData.blockingSessions}
          waitSessions={chartData.waitSessions}
        />
      </div>

      <div className="dashboard__sub-chart">
        {['User', 'Type', 'Command', 'Machine'].map((group) => (
          <SessionCountGroupChart
            key={group}
            labels={chartData.labels}
            groupData={chartData[`sessionCountGroupBy${group}`]}
            groupName={group}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricChart;
