import React, { useEffect, useState } from 'react';
import Text from 'components/atoms/text/Text';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { SvgIcon } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import OracleIcon from 'assets/images/oracle_icon.svg';

import './Summary.scss';
import { getSummaryData } from 'services/deviceMonitoring';
import { useNavigate, useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  useEffect(() => {
    getSummaryData(
      ({ data }) => {
        setSummaryData(data.data);
        setDeviceList(
          data.data.allDevices.map((item: Device) => ({
            label: item.deviceAlias,
            ...item,
          }))
        );
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

  const doughnutData = {
    labels: ['ACTIVE', 'INACTIVE', 'BLOCKED'],
    datasets: [
      {
        data: [activeCnt, inactiveCnt, blockedCnt],
        backgroundColor: ['#28a745', '#777777', '#f8a445'],
      },
    ],
  };
  const doughnutOpt = {
    responsive: false,
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 40,
          padding: 20,
          usePointStyle: true,
          font: {
            family: "'Pretendard', 'serif'",
            lineHeight: 1,
          },
        },
      },
    },
    layouts: {
      padding: {
        right: 40,
      },
    },
  };

  const topUsedDevices = summaryData?.totalProcessInfo.topUsedDevices || {};
  const warnDevice = summaryData?.totalProcessInfo.warnDevice || {};
  const unusedDevice = summaryData?.totalProcessInfo.unusedDevice || {};

  const [keyword, setKeyword] = useState('');
  const [filteredDevice, setFilteredDevice] = useState(deviceList);

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

  const navigate = useNavigate();
  const companyId = useParams<{ companyId: string }>();
  const getDetails = (name: string) => {
    navigate(`/dashboard/${companyId}/${name}`);
  };

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
      <div className="summary__overview">
        <div className="summary__overview__total-session">
          <div className="summary__overview__total-count">
            <Text
              content={`${activeCnt + inactiveCnt + blockedCnt}`}
              type="title"
            />
          </div>
          <Text content="Total DB" type="info" bold />
          <div className="summary__overview__dougnut-chart">
            <Doughnut data={doughnutData} options={doughnutOpt} />
          </div>
        </div>
        <div className="summary__card summary--line">
          <div className="summary__card__title">
            <Text content="현재 가장 많이 사용되고 있는 DB" type="subtitle" />
          </div>
          {Object.keys(topUsedDevices).map((item) => (
            <div className="summary__card__db">
              <Text content={item} type="subtitle" />
              <Text
                content={`${topUsedDevices[item as keyof typeof topUsedDevices]}`}
                type="subtitle"
                color="success"
              />
            </div>
          ))}
        </div>
        <div className="summary__card summary--line">
          <div className="summary__card__title">
            <Text content="주의 요망 DB" type="subtitle" />
            <SvgIcon
              className="summary__card__help-icon"
              component={InfoOutlinedIcon}
              inheritViewBox
            />
          </div>
          {Object.entries(warnDevice).length > 0 ? (
            <div>
              {Object.keys(warnDevice).map((item) => (
                <div className="summary__card__db">
                  <Text content={item} type="subtitle" />
                  <Text
                    content={`${warnDevice[item as keyof typeof warnDevice]}`}
                    type="subtitle"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Text content="내역이 없습니다." type="subtitle" color="neutral" />
          )}
        </div>
        <div className="summary__card">
          <div className="summary__card__title">
            <Text content="사용한 지 오래된 DB" type="subtitle" />
            <SvgIcon
              className="summary__card__help-icon"
              component={InfoOutlinedIcon}
              inheritViewBox
            />
          </div>
          {Object.entries(unusedDevice).length > 0 ? (
            <div>
              {Object.keys(unusedDevice).map((item) => (
                <div className="summary__card__db">
                  <Text content={item} type="subtitle" />
                  <Text
                    content={`${Math.trunc(unusedDevice[item as keyof typeof unusedDevice] / 1440)}일 전`}
                    type="info"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Text content="내역이 없습니다." type="subtitle" color="neutral" />
          )}
        </div>
      </div>
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
        <div className="device-list">
          {deviceList.length === 0 && (
            <Text
              content="등록된 데이터베이스가 없습니다."
              type="subtitle"
              color="neutral"
            />
          )}
          {deviceList.length > 0 && filteredDevice.length === 0 && (
            <Text
              content="해당 데이터베이스를 찾을 수 없습니다."
              type="subtitle"
              color="neutral"
            />
          )}
          {filteredDevice.map((item) => (
            // TODO: onClick 이벤트 추가(대시보드 페이지로 이동)
            <div
              key={item.deviceAlias}
              className={['device-card', `device-card--${item.status}`].join(
                ' '
              )}
              onClick={() => getDetails(item.deviceAlias)}
              role="presentation"
            >
              <div className="device-card__type">
                <img src={OracleIcon} alt="oracleIcon" />
              </div>
              <div className="device-card__title">
                <Text content={item.deviceAlias} type="subtitle" bold />
                {item.status === 'ACTIVE' && (
                  <div className="status--active status">
                    <SvgIcon
                      className="status__icon"
                      component={CheckCircleOutlineOutlinedIcon}
                      inheritViewBox
                    />
                    <Text content={item.status} type="info" />
                  </div>
                )}
                {item.status === 'INACTIVE' && (
                  <div className="status--inactive status">
                    <SvgIcon
                      className="status__icon"
                      component={CancelOutlinedIcon}
                      inheritViewBox
                    />
                    <Text content={item.status} type="info" />
                  </div>
                )}
                {item.status === 'BLOCKED' && (
                  <div className="status--blocked status">
                    <SvgIcon
                      className="status__icon"
                      component={InfoOutlinedIcon}
                      inheritViewBox
                    />
                    <Text content={item.status} type="info" />
                  </div>
                )}
              </div>
              <div className="device-card__body">
                <div className="device-card--outer-shadow">
                  <div
                    className={[
                      'device-card__status-value',
                      `device-card--${item.status.toLowerCase()}`,
                    ].join(' ')}
                  >
                    {item.status === 'ACTIVE' && (
                      <div className="device-card--inner-shadow">
                        <Text content={`${item.statusValue}`} type="subtitle" />
                        <Text
                          content="활성화된 세션"
                          type="link"
                          color="neutral"
                        />
                      </div>
                    )}
                    {item.status === 'BLOCKED' && (
                      <div className="device-card--inner-shadow">
                        <Text content={`${item.statusValue}`} type="subtitle" />
                        <Text content="지연 대기" type="link" color="neutral" />
                      </div>
                    )}
                    {item.status === 'INACTIVE' && (
                      <div className="device-card--inner-shadow">
                        <div className="device-card__time">
                          <Text
                            content={`${item.statusValue}`}
                            type="subtitle"
                          />
                          <Text content="분전" type="link" color="neutral" />
                        </div>
                        <Text content="최근 요청" type="link" color="neutral" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="device-card__all-info">
                  <div className="device-card__info">
                    <SvgIcon
                      className="button__icon"
                      component={BadgeOutlinedIcon}
                      inheritViewBox
                    />
                    <Text content={`SID: ${item.sid}`} type="info" />
                  </div>
                  <div className="device-card__info">
                    <SvgIcon
                      className="button__icon"
                      component={LanguageOutlinedIcon}
                      inheritViewBox
                    />
                    <Text content={`IP: ${item.ip}`} type="info" />
                  </div>
                  <div className="device-card__info">
                    <SvgIcon
                      className="button__icon"
                      component={AccountTreeOutlinedIcon}
                      inheritViewBox
                    />
                    <Text content={`PORT: ${item.port}`} type="info" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summary;
