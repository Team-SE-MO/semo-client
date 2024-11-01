import React, { useState } from 'react';
import Button from 'components/atoms/button/Button';

interface UserReqRowProps {
  i: number;
  data: {
    formId: number;
    company: {
      id: number;
      companyName: string;
      taxId: string;
    };
    ownerName: string;
    email: string;
    formStatus: string;
    requestDate: string;
    approvedAt: string | null;
  };
}
// TODO: 승인, 거절 누르면 rowData 상태 변경
const UserReqRow = ({ i, data }: UserReqRowProps) => {
  const [rowData, setRowData] = useState(data);
  return (
    <tr>
      <td className="table__row">{i + 1}</td>
      <td className="table__row">{rowData.company.companyName}</td>
      <td className="table__row">{rowData.ownerName}</td>
      <td className="table__row">{rowData.email}</td>
      <td className="table__row">{rowData.formStatus}</td>
      <td className="table__row">{rowData.requestDate}</td>
      {rowData.formStatus === 'PENDING' ? (
        <td className="table__row">
          <div className="table__btn">
            <Button
              size="small"
              label="승인"
              color="success"
              radius="oval"
              type="button"
            />
            <Button
              size="small"
              label="거절"
              color="danger"
              radius="oval"
              type="button"
            />
          </div>
        </td>
      ) : (
        <td className="table__row">{rowData.approvedAt}</td>
      )}
    </tr>
  );
};

export default UserReqRow;
