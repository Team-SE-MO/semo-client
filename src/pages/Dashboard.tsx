import React from 'react';
import { useLocation } from 'react-router-dom';
import MetricChart from '../components/organisms/device/MetricChart';

import './Dashboard.scss';

const Dashboard = () => {
  const location = useLocation();
  const deviceList = location.state?.deviceList || [];
  return <MetricChart />;
};

export default Dashboard;
