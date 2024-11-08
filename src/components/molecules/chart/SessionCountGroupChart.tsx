import Chart from 'components/molecules/chart/Chart';
import Text from 'components/atoms/text/Text';

interface SessionCountGroupChartProps {
  labels: string[];
  groupData: Record<string, { name: string; value: number }[]>;
  groupName: string;
  commonDate: string;
}

const getGroupDatasets = (
  groupData: Record<string, { name: string; value: number }[]>,
  labels: string[],
  commonDate: string
) => {
  if (!groupData) {
    return [];
  }
  const uniqueNames = Array.from(
    new Set(
      Object.values(groupData).flatMap((items) =>
        items.map((item) => item.name)
      )
    )
  );

  return uniqueNames.map((name) => ({
    label: name,
    data: labels.map((label) => {
      const fullLabel = `${commonDate}T${label}`;
      return (
        groupData[fullLabel]?.find((item) => item.name === name)?.value || 0
      );
    }),
    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    stack: 'stack1',
  }));
};

const SessionCountGroupChart = ({
  labels,
  groupData,
  groupName,
  commonDate,
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
      },
      y: {
        min: 0,
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="dashboard__chart-wrapper">
      <div className="dashboard__chart__card dashboard__chart--small">
        <Chart
          labels={labels}
          datasets={getGroupDatasets(groupData, labels, commonDate)}
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
