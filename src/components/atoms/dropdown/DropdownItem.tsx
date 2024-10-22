import React from 'react';
import Company from 'types/Company';
import Device from 'types/Device';

interface DropdownItemProps {
  selectItems: Array<Company> | Array<Device>;
}

const DropdownItem = ({ selectItems, ...props }: DropdownItemProps) => {
  return (
    <datalist>
      {selectItems &&
        selectItems.map((item) => (
          <option
            value={item.target}
            key={item.target}
            aria-label="select"
            {...props}
          />
        ))}
    </datalist>
  );
};

export default DropdownItem;
