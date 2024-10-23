import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownItem from 'components/atoms/dropdown/DropdownItem';
import './Dropdown.scss';

interface Item {
  label: string;
  route?: string;
  onClick?: () => void;
}
interface DropdownProps {
  items: Item[];
}
const Dropdown = ({ items }: DropdownProps) => {
  const navigate = useNavigate();

  const onClick = (item: Item) => {
    if (item.route) {
      return () => {
        navigate(item.route as string);
      };
    }
    if (item.onClick) {
      return item.onClick;
    }
    return undefined;
  };

  return (
    <div className="header__dropdown-list">
      {items.map((item) => (
        <DropdownItem
          key={item.label}
          label={item.label}
          onClick={onClick(item)}
        />
      ))}
    </div>
  );
};

export default Dropdown;
