import React from 'react';
import Button from 'components/atoms/button/Button';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';
import './RequestPageButtons.scss';

const RequestPageButtons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="request-page-buttons">
      <Button
        size="medium"
        type="button"
        color={location.pathname === '/user-req' ? 'primary' : 'other'}
        shadow
        icon={PersonIcon}
        label="회원"
        onClick={() => navigate('/user-req')}
      />
      <Button
        size="medium"
        type="button"
        color={location.pathname === '/company-req' ? 'primary' : 'other'}
        shadow
        icon={BusinessIcon}
        label="회사"
        onClick={() => navigate('/company-req')}
      />
    </div>
  );
};

export default RequestPageButtons;
