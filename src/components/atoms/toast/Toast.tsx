import React, { useEffect } from 'react';
import { SvgIcon } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Text from 'components/atoms/text/Text';
import './Toast.scss';

interface ToastProps {
  type: 'success' | 'failure' | 'info';
  message: string;
  visible: boolean;
  onClose: () => void;
}

const icons = {
  success: CheckCircleOutlineOutlinedIcon,
  failure: CancelOutlinedIcon,
  info: InfoOutlinedIcon,
};

const Toast = ({ type = 'failure', message, visible, onClose }: ToastProps) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast toast__icon--${type}`}>
      <SvgIcon component={icons[type]} className="toast__icon" />
      <Text type="info" color="light" content={message} />
    </div>
  );
};

export default Toast;
