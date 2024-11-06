import React from 'react';
import Chart from 'components/molecules/chart/Chart';
import Text from 'components/atoms/text/Text';

import 'chart.js/auto';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__title">
        <Text content="Database Monitoring Service" type="title" />
        <Text content="모니터링 서비스" type="subtitle" />
      </div>

      <div className="dashboard__charts">
        <div className="dashboard__large-charts">
          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart__card dashboard__chart--large">
              <Chart
                labels={['2024-10-10 13:45', '2024-10-10 14:45']}
                datasets={[
                  {
                    label: '# of total session',
                    data: [80, 100],
                    backgroundColor: 'rgba(135,206,235,0.4)',
                  },
                  {
                    label: '# of active session',
                    data: [30, 60],
                    backgroundColor: 'rgba(60,179,113,0.4)',
                  },
                ]}
                chartType="Line"
              />
            </div>
            <div className="chart-subtitle">
              <Text
                content="Active / Total Session Monitoring"
                type="main-content"
              />
            </div>
          </div>

          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart__card dashboard__chart--large">
              <Chart
                labels={['2024-10-10 13:45', '2024-10-10 14:45']}
                datasets={[
                  {
                    label: 'Blocking Session',
                    data: [5, 15],
                    borderColor: 'rgba(255,99,71,1)',
                  },
                  {
                    label: 'Wait Session',
                    data: [10, 20],
                    borderColor: 'rgba(255,165,0,1)',
                  },
                ]}
                chartType="Line"
              />
            </div>
            <div className="chart-subtitle">
              <Text
                content="Blocking / Wait Session Monitoring"
                type="main-content"
              />
            </div>
          </div>
        </div>

        <div className="dashboard__small-charts">
          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart__card dashboard__chart--small">
              <Chart
                labels={['SYS', 'SCOTT']}
                datasets={[
                  {
                    label: 'Session Count by User',
                    data: [15, 20],
                    backgroundColor: [
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                    ],
                  },
                ]}
                chartType="Bar"
              />
            </div>
            <div className="chart-subtitle">
              <Text content="Session Count Group By User" type="main-content" />
            </div>
          </div>

          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart__card dashboard__chart--small">
              <Chart
                labels={['USER', 'BACKGROUND']}
                datasets={[
                  {
                    label: 'Session Count by Type',
                    data: [10, 25],
                    backgroundColor: [
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                    ],
                  },
                ]}
                chartType="Bar"
              />
            </div>
            <div className="chart-subtitle">
              <Text content="Session Count Group By Type" type="main-content" />
            </div>
          </div>

          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart__card dashboard__chart--small">
              <Chart
                labels={['SELECT', 'INSERT']}
                datasets={[
                  {
                    label: 'Session Count by Command',
                    data: [20, 15],
                    backgroundColor: [
                      'rgba(255,99,132,0.6)',
                      'rgba(255,159,64,0.6)',
                    ],
                  },
                ]}
                chartType="Bar"
              />
            </div>
            <div className="chart-subtitle">
              <Text
                content="Session Count Group By Command"
                type="main-content"
              />
            </div>
          </div>

          <div className="dashboard__chart-wrapper">
            <div className="dashboard__chart__card dashboard__chart--small">
              <Chart
                labels={['oraclefree', 'DESKTOP-26UEND']}
                datasets={[
                  {
                    label: 'Session Count by Machine',
                    data: [12, 18],
                    backgroundColor: [
                      'rgba(75,192,192,0.6)',
                      'rgba(153,102,255,0.6)',
                    ],
                  },
                ]}
                chartType="Bar"
              />
            </div>
            <div className="chart-subtitle">
              <Text
                content="Session Count Group By Machine"
                type="main-content"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
