import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Plugin } from 'chart.js';
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

const averageLinePlugin: Plugin<'line' | 'bar'> = {
  id: 'averageLinePlugin',
  beforeDraw(chart: any) {
    const { ctx, chartArea, scales } = chart;
    chart.data.datasets.forEach((dataset: any) => {
      const data = dataset.data as number[];
      if (data && data.length > 0) {
        const average = data.reduce((a, b) => a + b, 0) / data.length;

        ctx.save();
        ctx.strokeStyle = 'rgba(75, 0, 130, 1)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(chartArea.left, scales.y.getPixelForValue(average));
        ctx.lineTo(chartArea.right, scales.y.getPixelForValue(average));
        ctx.stroke();
        ctx.restore();
      }
    });
  },
};

ChartJS.register(averageLinePlugin);

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
