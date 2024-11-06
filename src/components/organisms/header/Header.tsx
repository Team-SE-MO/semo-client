import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/molecules/dropdown/Dropdown';
import './Header.scss';
import Profile from 'components/molecules/profile/Profile';
import ProfileDetail from 'components/molecules/profiledetail/ProfileDropdown';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import logo from '../../../assets/images/semo_logo_header.svg';

const Header = () => {
  // const token = localStorage.getItem('token');
  // 테스트용 임시 토큰 - true, false 로 테스트!
  const token = true;
  // const userRole = jwt토큰 decode 진행해서 얻기;
  // 테스트용 임시 유저 권한 - super, admin, user 로 테스트!
  type UserRole = 'ROLE_SUPER' | 'ROLE_ADMIN' | 'ROLE_USER';
  const userRole: UserRole = 'ROLE_SUPER';
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);
  // 테스트용 임시 유저 이름
  const userName = '태연님';
  const items = [
    {
      label: '유저 관리',
      route: '/user-management',
    },
    {
      label: 'DB관리',
      route: '/database-management',
    },
    ...(userRole === 'ROLE_SUPER'
      ? [
          {
            label: '요청 관리',
            route: 'request-management',
          },
        ]
      : []),
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
    switch (userRole as UserRole) {
      case 'ROLE_SUPER':
        homePath = '/';
        break;
      case 'ROLE_ADMIN':
        homePath = '/';
        break;
      case 'ROLE_USER':
        homePath = '/';
        break;
      default:
        homePath = '/';
    }
    navigate(homePath);
  };

  return (
    <div className="header__container">
      <img src={logo} alt="Logo" className="header__logo" />
      {token ? (
        <>
          <div className="header__menu">
            <div
              onClick={handleHomeClick}
              style={{ cursor: 'pointer' }}
              role="presentation"
            >
              <Text content="홈" type="subtitle" bold />
            </div>
            {(userRole === 'ROLE_SUPER' || userRole === 'ROLE_ADMIN') && (
              <div className="header__menu-item">
                <Text content="관리자 메뉴" type="subtitle" bold />
                <div className="header__menu-dropdown">
                  <Dropdown items={items} />
                </div>
              </div>
            )}
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
        </>
      ) : (
        <div className="header__auth">
          <Button
            size="medium"
            label="로그인"
            type="button"
            radius="rounded"
            onClick={() => navigate('/login')}
          />
          <Button
            size="medium"
            label="회원가입"
            type="button"
            radius="rounded"
            onClick={() => navigate('/register')}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
