import React, { useEffect } from 'react';
import { SvgIcon } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import './Toast.scss';

interface ToastProps {
  status: 'success' | 'failed';
  visible: boolean;
  onClose: () => void;
}

const TOAST_MESSAGES = {
  success: 'successed: 접근이 가능합니다.',
  failed: 'failed: 접근할 수 없습니다.',
} as const;

const TOAST_ICONS = {
  success: (
    <SvgIcon
      component={CheckCircleOutlineOutlinedIcon}
      className="toast__icon"
    />
  ),
  failed: <SvgIcon component={CancelOutlinedIcon} className="toast__icon" />,
} as const;

const Toast = ({ status, visible, onClose }: ToastProps) => {
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
    <div className={`toast toast--${status}`}>
      {TOAST_ICONS[status]}
      <span className="toast__message">{TOAST_MESSAGES[status]}</span>
    </div>
  );
};

export default Toast;
