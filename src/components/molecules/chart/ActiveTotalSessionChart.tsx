import Chart from 'components/molecules/chart/Chart';
import Text from 'components/atoms/text/Text';

interface ActiveTotalSessionChartProps {
  labels: string[];
  totalSessions: number[];
  activeSessions: number[];
}

const ActiveTotalSessionChart = ({
  labels,
  totalSessions,
  activeSessions,
}: ActiveTotalSessionChartProps) => {
  const activeTotalSessionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true },
        ticks: {
          autoSkip: true,
          maxTicksLimit: Math.ceil(labels.length / 2),
        },
        grid: {
          display: false,
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
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 9,
          boxHeight: 9,
        },
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
              label: 'Total session',
              data: totalSessions,
              backgroundColor: 'rgba(108,175,201,0.3)',
              borderColor: 'rgba(108,175,201,1)',
              fill: true,
            },
            {
              label: 'Active session',
              data: activeSessions,
              backgroundColor: 'rgba(40,167,69,0.45)',
              borderColor: 'rgba(40,167,69,1)',
              fill: true,
            },
          ]}
          chartType="Line"
          options={activeTotalSessionOptions}
          applyAverageLine
        />
      </div>
      <div className="chart-subtitle">
        <Text content="Active / Total Session Monitoring" type="main-content" />
      </div>
    </div>
  );
};

export default ActiveTotalSessionChart;
