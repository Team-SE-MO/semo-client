import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/molecules/dropdown/Dropdown';
import './Header.scss';
import Profile from 'components/molecules/profile/Profile';
import ProfileDetail from 'components/molecules/profiledetail/ProfileDropdown';
import Text from 'components/atoms/text/Text';

const Header = () => {
  const userRole = localStorage.getItem('role');
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);
  const userName = '태연님';
  const items = [
    {
      label: '유저 관리',
      route: '/user-management',
    },
    {
      label: userRole === 'super' ? '요청 관리' : 'DB관리',
      route:
        userRole === 'super' ? '/request-management' : '/customer-management',
    },
  ];
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsProfileDetailOpen(!isProfileDetailOpen);
  };

  const handleClosePopup = () => {
    setIsProfileDetailOpen(false);
  };

  const handleHomeClick = () => {
    let homePath;
    switch (userRole) {
      case 'super':
        homePath = '/super-home';
        break;
      case 'admin':
        homePath = '/admin-home';
        break;
      case 'user':
        homePath = '/user-home';
        break;
      default:
        homePath = '/';
    }
    navigate(homePath);
  };

  return (
    <div className="header__container">
      <div className="header__logo" />
      <div className="header__menu">
        <div
          onClick={handleHomeClick}
          style={{ cursor: 'pointer' }}
          role="presentation"
        >
          <Text text="홈" type="subtitle" bold />
        </div>
        <div className="header__menu-item">
          <Text text="관리자 메뉴" type="subtitle" bold />
          <div className="header__menu-dropdown">
            <Dropdown items={items} />
          </div>
        </div>
      </div>
      <div className="header__profile">
        <Profile
          userName={userName}
          arrangement="horizontal"
          onClick={handleProfileClick}
        />
        {isProfileDetailOpen && (
          <ProfileDetail
            userName={userName}
            userId="test123456"
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
