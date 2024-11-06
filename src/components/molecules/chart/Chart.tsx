import React from 'react';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';

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
  chartType: 'Line' | 'Bar' | 'Pie' | 'Radar';
}

const Chart = ({ labels, datasets, chartType }: ChartProps) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
      fill: dataset.fill,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const chartMap = {
    Line,
    Bar,
    Pie,
    Radar,
  };

  const ChartComponent = chartMap[chartType] || Bar;

  return (
    <div className="base-chart">
      <ChartComponent data={data} options={options} />
    </div>
  );
};

export default Chart;
