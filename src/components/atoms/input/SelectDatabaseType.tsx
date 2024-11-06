import React from 'react';

interface SelectDatabaseTypeProps {
  data: {
    id: number;
    type: string;
  };
}
const SelectDatabaseType = ({ data, ...props }: SelectDatabaseTypeProps) => {
  return (
    <option
      value={`${data.type}`}
      data-value={data.id}
      aria-label="selection"
      {...props}
    />
  );
};

export default SelectDatabaseType;
