import React, { useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import MetricGrid from 'components/organisms/monitoring/MetricGrid';
import Text from 'components/atoms/text/Text';
import { Autocomplete, TextField } from '@mui/material';
import Device from 'types/Device';
import customDate from 'utils/customDate';
import MetricChart from '../components/organisms/monitoring/MetricChart';
import './Dashboard.scss';

interface DeviceItem extends Device {
  label: string;
}

const Dashboard = () => {
  const location = useLocation();
  const deviceList: DeviceItem[] = location.state?.deviceList || [];

  const userInfoStorage = localStorage.getItem('userInfoStorage');
  const userInfo = JSON.parse(userInfoStorage || '');
  const { companyId } = userInfo.state;

  const navigate = useNavigate();
  const pathMatch = matchPath(
    '/dashboard/:companyId/:deviceAlias',
    location.pathname
  );
  const initialDeviceAlias = pathMatch?.params.deviceAlias || '';
  const [deviceAlias, setDeviceAlias] = useState(initialDeviceAlias);
  return (
    <div className="dashboard__container">
      <div className="dashboard__title">
        <div className="dashboard__title__main">
          <Text content="Database Monitoring Service" type="title" />
          <Autocomplete
            disablePortal
            options={deviceList}
            size="small"
            sx={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
            filterOptions={(options, { inputValue }) =>
              options.filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              )
            }
            onChange={(event, newValue) => {
              const selectedDeviceAlias = newValue?.deviceAlias;
              if (selectedDeviceAlias) {
                setDeviceAlias(selectedDeviceAlias);
                navigate(`/dashboard/${companyId}/${selectedDeviceAlias}`);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="DATABASE ALIAS" />
            )}
          />
        </div>
        <div className="dashboard__title__sub">
          <Text content="모니터링 서비스" type="subtitle" />
          <Text content={`기준 기간: ${customDate()}`} type="info" bold />
        </div>
      </div>
      <MetricChart />
      <MetricGrid />
    </div>
  );
};

export default Dashboard;
