import React from 'react';
import './DropdownItem.scss';

interface DropdownItemProps {
  label: string;
  onClick?: () => void;
}

const DropdownItem = ({ label, onClick }: DropdownItemProps) => {
  return (
    <button type="button" className="dropdown__item" onClick={onClick}>
      {label}
    </button>
  );
};

export default DropdownItem;
