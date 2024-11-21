import React from 'react';
import Text from 'components/atoms/text/Text';
import Device from 'types/Device';
import { useNavigate } from 'react-router-dom';

import { SvgIcon } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import OracleIcon from 'assets/images/oracle_icon.svg';
import useAuthStore from 'store/useAuthStore';

interface DeviceItem extends Device {
  label: string;
}

interface DeviceCardListProps {
  deviceList: DeviceItem[];
  filteredDevice: DeviceItem[];
}
const DeviceCardList = ({
  deviceList,
  filteredDevice,
}: DeviceCardListProps) => {
  const icons = {
    active: CheckCircleOutlineOutlinedIcon,
    inactive: CancelOutlinedIcon,
    blocked: InfoOutlinedIcon,
  };

  const contents = {
    active: '활성화된 세션',
    inactive: '분전',
    blocked: '지연 대기',
  };

  const navigate = useNavigate();
  const companyId = useAuthStore((state) => state.companyId);
  const getDetails = (deviceAlias: string) => {
    navigate(`/dashboard/${companyId}/${deviceAlias}`, {
      state: { deviceList },
    });
  };
  return (
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
        <div
          key={item.deviceAlias}
          className={['device-card', `device-card--${item.status}`].join(' ')}
          onClick={() => getDetails(item.deviceAlias)}
          role="presentation"
        >
          <div className="device-card__type">
            <img src={OracleIcon} alt="oracleIcon" />
          </div>
          <div className="device-card__title">
            <Text content={item.deviceAlias} type="subtitle" bold />
            <div
              className={[
                `status--${item.status.toLowerCase()}`,
                'status',
              ].join(' ')}
            >
              <SvgIcon
                className="status__icon"
                component={
                  icons[item.status.toLowerCase() as keyof typeof icons]
                }
                inheritViewBox
              />
              <Text content={item.status} type="info" />
            </div>
          </div>
          <div className="device-card__body">
            <div className="device-card--outer-shadow">
              <div
                className={[
                  'device-card__status-value',
                  `device-card--${item.status.toLowerCase()}`,
                ].join(' ')}
              >
                <div className="device-card--inner-shadow">
                  {item.status === 'INACTIVE' ? (
                    <>
                      <div className="device-card__time">
                        <Text content={`${item.statusValue}`} type="subtitle" />
                        <Text
                          content={
                            contents[
                              item.status.toLowerCase() as keyof typeof contents
                            ]
                          }
                          type="link"
                          color="neutral"
                        />
                      </div>
                      <Text content="최근 요청" type="link" color="neutral" />
                    </>
                  ) : (
                    <>
                      <Text content={`${item.statusValue}`} type="subtitle" />
                      <Text
                        content={
                          contents[
                            item.status.toLowerCase() as keyof typeof contents
                          ]
                        }
                        type="link"
                        color="neutral"
                      />
                    </>
                  )}
                </div>
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
  );
};

export default DeviceCardList;
