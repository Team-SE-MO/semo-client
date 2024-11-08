import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface DatasetProps {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  fill?: boolean;
}

interface ChartProps {
  labels: string[];
  datasets: DatasetProps[];
  chartType: 'Line' | 'Bar';
  options?: any;
}

const Chart = ({ labels, datasets, chartType, options }: ChartProps) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
      fill: dataset.fill,
      stack: 'stack1',
    })),
  };

  const chartMap = {
    Line,
    Bar,
  };

  const ChartComponent = chartMap[chartType] || Bar;

  return (
    <div className="base-chart">
      <ChartComponent data={data} options={options} />
    </div>
  );
};

export default Chart;
