import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/molecules/dropdown/Dropdown';
import './Header.scss';
import Profile from 'components/molecules/profile/Profile';
import ProfileDetail from 'components/molecules/profiledetail/ProfileDropdown';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import logo from 'assets/images/semo_logo_header.svg';

const Header = () => {
  const userInfoStorage = localStorage.getItem('userInfoStorage');
  const userInfo = JSON.parse(userInfoStorage || '');
  const [isProfileDetailOpen, setIsProfileDetailOpen] = useState(false);
  const { isLoggedIn } = userInfo.state;
  const { role } = userInfo.state;
  const { ownerName } = userInfo.state;
  const { companyId } = userInfo.state;
  const { loginId } = userInfo.state;
  const items = [
    {
      label: '유저 관리',
      route: role === 'ROLE_SUPER' ? '/users' : `/users/${companyId}`,
    },
    {
      label: 'DB 관리',
      route: '/devices',
    },
    ...(role === 'ROLE_SUPER'
      ? [
          {
            label: '요청 관리',
            route: 'user-req',
          },
          {
            label: '대시보드',
            route: 'user-req',
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
  const homePath = {
    ROLE_SUPER: '/devices',
    ROLE_ADMIN: `/dashboard/${companyId}`,
    ROLE_USER: `/dashboard/${companyId}`,
  };
  const handleHomeClick = () => {
    navigate(!role ? '/' : homePath[role as keyof typeof homePath]);
  };

  return (
    <div className="header__container">
      <div className="header__content">
        <img src={logo} alt="Logo" className="header__logo" />
        {isLoggedIn ? (
          <>
            <div className="header__menu">
              <div
                className="header__menu__home"
                onClick={handleHomeClick}
                role="presentation"
              >
                <Text content="홈" type="subtitle" bold />
              </div>
              {(role === 'ROLE_SUPER' || role === 'ROLE_ADMIN') && (
                <div className="header__menu__item">
                  <Text content="관리자 메뉴" type="subtitle" bold />
                  <div className="header__menu__dropdown">
                    <Dropdown items={items} />
                  </div>
                </div>
              )}
            </div>
            <div className="header__profile">
              <Profile
                userName={ownerName}
                arrangement="horizontal"
                onClick={handleProfileClick}
              />
              {isProfileDetailOpen && (
                <ProfileDetail
                  userName={ownerName}
                  userId={loginId}
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
    </div>
  );
};

export default Header;
