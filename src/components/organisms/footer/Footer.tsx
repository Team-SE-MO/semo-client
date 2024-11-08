import React from 'react';
import './Footer.scss';
import Text from 'components/atoms/text/Text';
import logo from 'assets/images/semo_logo_footer.svg';

export const Footer = () => {
  const content =
    '운영시간 : 10:00 ~ 18:00 (점심 시간 13:00 ~ 14:00) \n 주일, 공유일 휴무';
  const copyright = 'Copyright ⓒ 2024. All rights reserved.';
  return (
    <div className="footer__container">
      <div className="footer__logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="footer__content">
        <Text content={content} type="info" color="neutral" />
        <Text content={copyright} type="info" color="neutral" />
      </div>
    </div>
  );
};
