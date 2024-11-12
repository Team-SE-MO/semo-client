import React, { useState } from 'react';
import Button from 'components/atoms/button/Button';
// TODO: user 공통 타입 구현
interface CompanyUserRowProps {
  i: number;
  content: {
    loginId: string;
    role: string;
    email: string;
    ownerName: string;
    deletedAt: null;
    company: {
      id: number;
      companyName: string;
      taxId: string;
    };
  };
}
// TODO: 삭제 버튼 누르면 delete 요청 보내는 기능 구현
const CompanyUserRow = ({ i, content }: CompanyUserRowProps) => {
  const [rowData, setRowData] = useState(content);
  return (
    <tr>
      <td className="table__row">{i + 1}</td>
      <td className="table__row">{rowData.role.replace('ROLE_', '')}</td>
      <td className="table__row">{rowData.loginId}</td>
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
