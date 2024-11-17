import React from 'react';
import { SvgIcon } from '@mui/material';
import Text from 'components/atoms/text/Text';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface OverviewCardItemProps {
  title: 'topUsedDevices' | 'warnDevice' | 'unusedDevice';
  hasIcon?: boolean;
  hasLine?: boolean;
  content: { [key: string]: number };
}

const OverviewCardItem = ({
  title,
  hasIcon = false,
  hasLine = false,
  content,
}: OverviewCardItemProps) => {
  const cardTitle = {
    topUsedDevices: '현재 가장 많이 사용되고 있는 DB',
    warnDevice: '주의 요망 DB',
    unusedDevice: '사용한 지 오래된 DB',
  };
  const line = hasLine ? 'summary--line' : '';
  return (
    <div className={['summary__card', line].join(' ')}>
      <div className="summary__card__title">
        <Text content={cardTitle[title]} type="subtitle" />
        {hasIcon && (
          <SvgIcon
            className="summary__card__help-icon"
            component={InfoOutlinedIcon}
            inheritViewBox
          />
        )}
      </div>
      {Object.entries(content).length > 0 ? (
        <>
          {Object.keys(content).map((item) => (
            <div className="summary__card__db">
              <Text content={item} type="subtitle" />
              <Text
                content={
                  title === 'unusedDevice'
                    ? `${Math.trunc(content[item as keyof typeof content] / 1440)}일 전`
                    : `${content[item as keyof typeof content]}`
                }
                type="subtitle"
                color={title === 'topUsedDevices' ? 'success' : 'primary'}
              />
            </div>
          ))}
        </>
      ) : (
        <Text content="내역이 없습니다." type="subtitle" color="neutral" />
      )}
    </div>
  );
};

export default OverviewCardItem;
