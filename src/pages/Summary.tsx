import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Text from 'components/atoms/text/Text';
import CompanyDeviceOverview from 'components/organisms/monitoring/CompanyDeviceOverview';
import DeviceCardList from 'components/organisms/monitoring/DeviceCardList';
import { getSummaryData } from 'services/deviceMonitoring';
import './Summary.scss';

interface Device {
  deviceAlias: string;
  type: string;
  status: string;
  sid: string;
  ip: string;
  port: number;
  statusValue: number;
}

interface DeviceItem extends Device {
  label: string;
}

interface SummaryData {
  companyName: string;
  totalProcessInfo: {
    activeDeviceCnt: number;
    inActiveDeviceCnt: number;
    blockedDeviceCnt: number;
    topUsedDevices: { [deviceName: string]: number } | null;
    warnDevice: { [deviceName: string]: number } | null;
    unusedDevice: { [deviceName: string]: number } | null;
  };
  allDevices: Device[];
}

const Summary = () => {
  const [summaryData, setSummaryData] = useState<SummaryData>();
  const [deviceList, setDeviceList] = useState<DeviceItem[]>([]);
  const [filteredDevice, setFilteredDevice] = useState<DeviceItem[]>([]);

  useEffect(() => {
    getSummaryData(
      ({ data }) => {
        console.log(data.data);
        setSummaryData(data.data);
        setDeviceList(
          data.data.allDevices.map((item: Device) => ({
            label: item.deviceAlias,
            ...item,
          }))
        );
        setFilteredDevice(data.data.allDevices);
      },
      (error) => {
        console.log('에러', error);
      }
    );
  }, []);

  const companyName = summaryData?.companyName;

  const activeCnt = summaryData?.totalProcessInfo.activeDeviceCnt || 0;
  const inactiveCnt = summaryData?.totalProcessInfo.inActiveDeviceCnt || 0;
  const blockedCnt = summaryData?.totalProcessInfo.blockedDeviceCnt || 0;

  const topUsedDevices = summaryData?.totalProcessInfo.topUsedDevices || {};
  const warnDevice = summaryData?.totalProcessInfo.warnDevice || {};
  const unusedDevice = summaryData?.totalProcessInfo.unusedDevice || {};

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keyword) {
      const filtered = deviceList.filter((item) => {
        return item.deviceAlias.toLowerCase().includes(keyword.toLowerCase());
      });
      setFilteredDevice(filtered);
    } else {
      setFilteredDevice(deviceList);
    }
  }, [keyword]);

  return (
    <div className="summary__container">
      <div className="summary__title">
        <Text content="Database Overview" type="title" />
        <Text content="장비 목록 확인" type="subtitle" />
        <div className="summary__title__company-name">
          <Text content={companyName} type="title" />
          <Text content="의 장비 목록입니다." type="subtitle" />
        </div>
      </div>
      <CompanyDeviceOverview
        activeCnt={activeCnt}
        inactiveCnt={inactiveCnt}
        blockedCnt={blockedCnt}
        topUsedDevices={topUsedDevices}
        warnDevice={warnDevice}
        unusedDevice={unusedDevice}
      />
      <div className="all-devices">
        <div className="all-devices__title">
          <Text content="전체 DB" type="subtitle" bold />
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
            filterOptions={(options, state) => {
              if (state.inputValue) {
                return options.filter((option) =>
                  option.label
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                );
              }
              return options;
            }}
            onInputChange={(event, newInputValue) => {
              setKeyword(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="DATABASE ALIAS"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            )}
          />
        </div>
        <DeviceCardList
          deviceList={deviceList}
          filteredDevice={filteredDevice}
        />
      </div>
    </div>
  );
};

export default Summary;
