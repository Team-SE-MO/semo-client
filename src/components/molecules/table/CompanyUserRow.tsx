import React, { useState } from 'react';
import Button from 'components/atoms/button/Button';

interface CompanyUserRowProps {
  i: number;
  data: {
    role: string;
    id: string;
    email: string;
    ownerName: string;
    deletedAt: string | null;
  };
}
// TODO: 삭제 버튼 누르면 delete 요청 보내는 기능 구현
const CompanyUserRow = ({ i, data }: CompanyUserRowProps) => {
  const [rowData, setRowData] = useState(data);
  return (
    <tr>
      <td className="table__row">{i + 1}</td>
      <td className="table__row">{rowData.role}</td>
      <td className="table__row">{rowData.id}</td>
      <td className="table__row">{rowData.email}</td>
      <td className="table__row">{rowData.ownerName}</td>
      <td className="table__row">
        <div className="table__btn">
          <Button
            size="small"
            label="삭제"
            color="danger"
            radius="oval"
            type="button"
          />
        </div>
      </td>
    </tr>
  );
};

export default CompanyUserRow;
