import Button from 'components/atoms/button/Button';
import React, { useEffect, useState } from 'react';
import Company from 'types/Company';
// TODO: user 공통 타입 구현
interface UserRowProps {
  i: number;
  content: {
    loginId: string;
    role: string;
    email: string;
    ownerName: string;
    deletedAt: null;
    company: Company;
  };
  onDelete?: (loginId: string) => void;
}
// TODO: 삭제 버튼 누르면 delete 요청 보내는 기능 구현
const UserRow = ({ i, content, onDelete }: UserRowProps) => {
  const [rowData, setRowData] = useState(content);
  useEffect(() => {
    setRowData(content);
  }, [content]);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(rowData.loginId);
    }
  };
  return (
    <tr className="table__row">
      <td className="table__data">{i + 1}</td>
      <td className="table__data">{rowData.company.companyName}</td>
      <td className="table__data">{rowData.role.replace('ROLE_', '')}</td>
      <td className="table__data">{rowData.loginId}</td>
      <td className="table__data">{rowData.email}</td>
      <td className="table__data">{rowData.ownerName}</td>
      <td className="table__data">
        <div className="table__btn">
          <Button
            size="small"
            label="삭제"
            color="danger"
            radius="oval"
            type="button"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
