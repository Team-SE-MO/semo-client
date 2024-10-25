import React from 'react';
import Dropdown from 'components/molecules/dropdown/Dropdown';
import './Header.scss';
import Profile from 'components/molecules/profile/Profile';

const Header = () => {
  const userName = '태연님';
  const items = [
    {
      label: '유저관리',
      route: '/user-management',
    },
    {
      label: '고객관리',
      route: '/customer-management',
    },
  ];

  return (
    <div className="header__container">
      <div className="header__logo" />
      <div className="header__menu">
        <div className="header__menu-item">
          관리자 메뉴
          <div className="header__menu-dropdown">
            <Dropdown items={items} />
          </div>
        </div>
        <Profile userName={userName} />
      </div>
    </div>
  );
};

export default Header;
