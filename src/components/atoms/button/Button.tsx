import React from 'react';
import './Button.scss';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  label: string;
  color?: 'primary' | 'danger' | 'success' | 'other';
  radius?: 'rounded' | 'pill' | 'oval';
  shadow?: boolean;
  type: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({
  size = 'medium',
  label,
  color = 'primary',
  radius = 'pill',
  shadow = false,
  type,
  ...props
}: ButtonProps) => {
  const neumorphism = shadow ? 'button--shadow' : null;
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
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
