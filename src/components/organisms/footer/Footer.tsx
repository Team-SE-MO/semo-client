import React from 'react';
import './Footer.scss';
import Text from 'components/atoms/text/Text';

export const Footer = () => {
  const content =
    '10:00 ~ 18:00 (점심 시간 13:00 ~ 14:00 ) \n 주일, 공유일 휴무';
  return (
    <div className="footer__container">
      <div className="footer__logo" />
      <Text content={content} type="info" color="neutral" />
    </div>
  );
};
