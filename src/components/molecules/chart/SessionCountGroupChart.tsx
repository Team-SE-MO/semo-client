import Chart from 'components/molecules/chart/Chart';
import Text from 'components/atoms/text/Text';

interface SessionCountGroupChartProps {
  labels: string[];
  groupData: Record<string, number[]>;
  groupName: string;
}

const getGroupDatasets = (groupData: Record<string, number[]>) => {
  if (!groupData) {
    return [];
  }

  const colors = [
    'rgba(52, 76, 129, 1)',
    'rgba(108, 175, 201, 1)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  return Object.entries(groupData).map(([group, dataArray], index) => {
    return {
      label: group,
      data: dataArray,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      stack: 'stack1',
    };
  });
};

const SessionCountGroupChart = ({
  labels,
  groupData,
  groupName,
}: SessionCountGroupChartProps) => {
  const sessionCountGroupByOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: Math.ceil(labels.length / 3),
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
        stacked: true,
        ticks: {
          precision: 0,
          stepSize: 1,
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
    },
  };

  return (
    <div className="dashboard__chart-wrapper">
      <div className="dashboard__chart__card dashboard__chart--small">
        <Chart
          labels={labels}
          datasets={getGroupDatasets(groupData)}
          chartType="Bar"
          options={sessionCountGroupByOptions}
        />
      </div>
      <div className="chart-subtitle">
        <Text
          content={`Session Count Group By ${groupName}`}
          type="main-content"
        />
      </div>
    </div>
  );
};

export default SessionCountGroupChart;
