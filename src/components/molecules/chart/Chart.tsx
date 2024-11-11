import { Bar, Line } from 'react-chartjs-2';
import { Plugin } from 'chart.js';
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
  applyAverageLine?: boolean; // 평균선을 적용할지 여부
}

const averageLinePlugin: Plugin<'line' | 'bar'> = {
  id: 'averageLinePlugin',
  beforeDraw(chart) {
    const { ctx, chartArea, scales } = chart;
    if (!scales || !chartArea) return;

    chart.data.datasets.forEach((dataset, index) => {
      const data = dataset.data as number[];
      if (data && data.length > 0) {
        const average = data.reduce((a, b) => a + b, 0) / data.length;

        // 각 데이터셋의 색상과 레이블 가져오기
        const color = 'rgba(66, 82, 110, 1)';
        const label = dataset.label || 'Avg';

        // 평균선 그리기
        ctx.save();
        ctx.strokeStyle = color as string;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(chartArea.left, scales.y.getPixelForValue(average));
        ctx.lineTo(chartArea.right, scales.y.getPixelForValue(average));
        ctx.stroke();

        const text = `${label} Avg: ${average.toFixed(2)}`;
        ctx.font = 'bold 14px Pretendard';
        ctx.fillStyle = color as string;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        const textX = chartArea.left + 10;
        const textY = chartArea.top - 32 + index * 15;

        ctx.fillText(text, textX, textY);
        ctx.restore();
      }
    });
  },
};

const Chart = ({
  labels,
  datasets,
  chartType,
  options,
  applyAverageLine,
}: ChartProps) => {
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
  const chartClassName = `base-chart ${chartType === 'Line' ? 'chart--large' : 'chart--small'}`;

  return (
    <div className={chartClassName}>
      <ChartComponent
        data={data}
        options={options}
        plugins={applyAverageLine ? [averageLinePlugin] : []}
      />
    </div>
  );
};

export default Chart;
