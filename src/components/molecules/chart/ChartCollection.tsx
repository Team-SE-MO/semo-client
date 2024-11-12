import { ChartWrapper } from 'types/ChartData';
import ActiveTotalSessionChart from './ActiveTotalSessionChart';
import BlockingWaitSessionChart from './BlockingWaitSessionChart';
import SessionCountGroupChart from './SessionCountGroupChart';

const ChartCollection = ({ chartData }: ChartWrapper) => {
  return (
    <div className="dashboard__charts">
      <div className="dashboard__large-charts">
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

      <div className="dashboard__small-charts">
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

export default ChartCollection;
