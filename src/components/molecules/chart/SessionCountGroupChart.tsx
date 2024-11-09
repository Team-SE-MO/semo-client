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

  const colors = ['rgba(52, 76, 129, 1)', 'rgba(108, 175, 201, 1)'];

  const uniqueNames = Array.from(
    new Set(
      Object.values(groupData).flatMap((items) =>
        items.map((item) => item.name)
      )
    )
  );

  return uniqueNames.map((name, index) => ({
    label: name,
    data: labels.map((label) => {
      const fullLabel = `${commonDate}T${label}`;
      return (
        groupData[fullLabel]?.find((item) => item.name === name)?.value || 0
      );
    }),
    backgroundColor: colors[index % colors.length], // 색상 배열에서 순차적으로 색상을 할당
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
