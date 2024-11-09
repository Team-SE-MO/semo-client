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
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
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

// import Chart from 'components/molecules/chart/Chart';
// import Text from 'components/atoms/text/Text';
// import { Chart as ChartJS, ChartData, Plugin } from 'chart.js';

// interface BlockingWaitSessionChartProps {
//   labels: string[];
//   blockingSessions: number[];
//   waitSessions: number[];
// }

// // 평균선을 추가하는 플러그인
// const averageLinePlugin: Plugin = {
//   id: 'averageLinePlugin',
//   beforeDraw(chart: ChartJS) {
//     const { ctx, chartArea, scales } = chart;
//     const dataset = chart.data.datasets[0].data as number[];

//     if (dataset && dataset.length > 0) {
//       const average = dataset.reduce((a, b) => a + b, 0) / dataset.length;

//       ctx.save();
//       ctx.strokeStyle = 'rgba(75, 192, 192, 0.8)';
//       ctx.lineWidth = 2;
//       ctx.setLineDash([5, 5]);
//       ctx.beginPath();
//       ctx.moveTo(chartArea.left, scales.y.getPixelForValue(average));
//       ctx.lineTo(chartArea.right, scales.y.getPixelForValue(average));
//       ctx.stroke();
//       ctx.restore();
//     }
//   },
// };

// // Chart.js에 플러그인 등록
// ChartJS.register(averageLinePlugin);

// const BlockingWaitSessionChart = ({
//   labels,
//   blockingSessions,
//   waitSessions,
// }: BlockingWaitSessionChartProps) => {
//   const blockingWaitSessionOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         title: { display: true },
//         ticks: {
//           autoSkip: true,
//           maxTicksLimit: Math.ceil(labels.length / 2),
//         },
//       },
//       y: {
//         beginAtZero: true,
//         min: 0,
//         stacked: false,
//         ticks: {
//           precision: 0, // 소수점 제거
//           stepSize: 1, // 정수 간격을 1로 설정
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         align: 'end',
//         labels: {
//           usePointStyle: true,
//           boxWidth: 8,
//           boxHeight: 8,
//           padding: 15,
//         },
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//       },
//     },
//   };

//   return (
//     <div className="dashboard__chart-wrapper">
//       <div className="dashboard__chart__card dashboard__chart--large">
//         <Chart
//           labels={labels}
//           datasets={[
//             {
//               label: 'Blocking Session',
//               data: blockingSessions,
//               borderColor: 'rgba(223,0,0,1)',
//             },
//             {
//               label: 'Wait Session',
//               data: waitSessions,
//               borderColor: 'rgba(248,164,69,1)',
//             },
//           ]}
//           chartType="Line"
//           options={blockingWaitSessionOptions}
//         />
//       </div>
//       <div className="chart-subtitle">
//         <Text
//           content="Blocking / Wait Session Monitoring"
//           type="main-content"
//         />
//       </div>
//     </div>
//   );
// };

// export default BlockingWaitSessionChart;
