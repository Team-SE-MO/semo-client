import Chart from 'components/molecules/chart/Chart';
import Text from 'components/atoms/text/Text';

interface BlockingWaitSessionChartProps {
  labels: string[];
  blockingSessions: number[];
  waitSessions: number[];
}

const BlockingWaitSessionChart = ({
  labels,
  blockingSessions,
  waitSessions,
}: BlockingWaitSessionChartProps) => {
  const blockingWaitSessionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true },
        ticks: {
          autoSkip: true,
          maxTicksLimit: Math.ceil(labels.length / 2),
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        stacked: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="dashboard__chart-wrapper">
      <div className="dashboard__chart__card dashboard__chart--large">
        <Chart
          labels={labels}
          datasets={[
            {
              label: 'Blocking Session',
              data: blockingSessions,
              borderColor: 'rgba(223,0,0,1)',
            },
            {
              label: 'Wait Session',
              data: waitSessions,
              borderColor: 'rgba(248,164,69,1)',
            },
          ]}
          chartType="Line"
          options={blockingWaitSessionOptions}
        />
      </div>
      <div className="chart-subtitle">
        <Text
          content="Blocking / Wait Session Monitoring"
          type="main-content"
        />
      </div>
    </div>
  );
};

export default BlockingWaitSessionChart;
