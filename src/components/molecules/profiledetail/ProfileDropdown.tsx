import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.scss';
import Button from 'components/atoms/button/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import Text from 'components/atoms/text/Text';
import Profile from '../profile/Profile';

interface ProfileDropdownProps {
  userName: string;
  userId: string;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  userName,
  userId,
  onClose,
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="profile-dropdown__container" ref={dropdownRef}>
      <div className="profile-dropdown__close">
        <CloseIcon onClick={onClose} fontSize="medium" />
      </div>
      <div className="profile-detail__header">
        <Profile arrangement="vertical" userName={userName} />
        <div className="profile-dropdown__info">
          <Text content={userId} type="info" color="neutral" />
        </div>
      </div>
      <div className="profile-dropdown__buttons">
        <Button
          icon={LockOutlinedIcon}
          label=" 비밀번호 변경"
          size="large"
          radius="pill"
          color="other"
          type="button"
          onClick={handleChangePassword}
        />
        <Button
          icon={LogoutIcon}
          label=" 로그아웃"
          size="large"
          radius="pill"
          color="other"
          type="button"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default ProfileDropdown;
