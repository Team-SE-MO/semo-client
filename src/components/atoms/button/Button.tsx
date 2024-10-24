import React from 'react';
import './Button.scss';
import { SvgIconComponent } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

/*
  아이콘 있는 버튼 예시
  // 부모 컴포넌트에서 아이콘 import
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

  <Button
    icon={LockOutlinedIcon}
    label="&nbsp;&nbsp;비밀번호 변경"
    size="large"
    radius="rounded"
    disalbed
    color="disable"
    type="button"
  />
*/
interface ButtonProps {
  size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  label?: string;
  color?: 'primary' | 'danger' | 'success' | 'disable' | 'other';
  radius?: 'rounded' | 'pill' | 'oval';
  shadow?: boolean;
  type: 'button' | 'submit';
  icon?: SvgIconComponent;
  disalbed?: boolean;
  onClick?: () => void;
}

const Button = ({
  size = 'medium',
  label = '',
  color = 'primary',
  radius = 'pill',
  shadow = false,
  type,
  icon,
  disalbed = false,
  ...props
}: ButtonProps) => {
  const neumorphism = shadow ? 'button--shadow' : '';
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={[
        'button',
        `button--${size}`,
        `button--${color}`,
        `button--${radius}`,
        neumorphism,
      ].join(' ')}
      disabled={disalbed}
      {...props}
    >
      {icon && (
        <SvgIcon className="button__icon" component={icon} inheritViewBox />
      )}
      {label}
    </button>
  );
};

export default Button;
