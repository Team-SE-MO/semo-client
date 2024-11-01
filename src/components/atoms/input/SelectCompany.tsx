import React from 'react';

interface SelectCompanyProps {
  data: {
    id: number;
    companyName: string;
    taxId: string;
  };
}
const SelectCompany = ({ data, ...props }: SelectCompanyProps) => {
  return (
    <option
      value={`${data.companyName} (${data.taxId})`}
      data-value={data.id}
      aria-label="selection"
      {...props}
    />
  );
};

export default SelectCompany;
