import React, { useState } from 'react';
import './UserReqRow.scss';
import Button from 'components/atoms/button/Button';
import { registerUser, updateUserFormStatus } from 'services/user';
import { sendEmail } from 'services/email';
import Swal from 'sweetalert2';

interface UserReqRowProps {
  i: number;
  content: {
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
const UserReqRow = ({ i, content }: UserReqRowProps) => {
  const [rowData, setRowData] = useState(content);
  const approveForm = () => {
    updateUserFormStatus(
      rowData.formId,
      'approved',
      (response) => {
        setRowData((prev) => ({
          ...prev,
          formStatus: response.data.data.formStatus,
          approvedAt: response.data.data.approvedAt
            .replace('T', '\n')
            .split('.')[0],
        }));
        registerUser(
          rowData.company.id,
          rowData.email,
          rowData.ownerName,
          ({ data }) => {
            sendEmail(
              'REGISTER_MEMBER',
              data.data,
              () => {
                Swal.fire({
                  title: '알림',
                  text: '사용자 가입이 완료되었습니다.',
                  icon: 'success',
                  confirmButtonText: '확인',
                });
              },
              (sendEmailError) => console.log('이메일 에러:', sendEmailError)
            );
          },
          (registerError) => console.log('Register Error:', registerError)
        );
      },
      (updateStatusError) =>
        console.log('Update Status Error:', updateStatusError)
    );
  };

  const denyForm = () => {
    updateUserFormStatus(
      rowData.formId,
      'denied',
      (response) => {
        setRowData((prev) => ({
          ...prev,
          formStatus: response.data.data.formStatus,
        }));
        sendEmail(
          'FAIL_MEMBER',
          rowData.email,
          () => {
            Swal.fire({
              title: '알림',
              text: '사용자 가입 거절이 완료되었습니다.',
              icon: 'success',
              confirmButtonText: '확인',
            });
          },
          (sendEmailError) => console.log('이메일 에러:', sendEmailError)
        );
      },
      (updateStatusError) =>
        console.log('Update Status Error:', updateStatusError)
    );
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'table__row__status--pending';
      case 'APPROVED':
        return 'table__row__status--approved';
      default:
        return '';
    }
  };

  return (
    <tr className="table__row">
      <td className="table__data">{i + 1}</td>
      <td className="table__data">{rowData.company.companyName}</td>
      <td className="table__data">{rowData.ownerName}</td>
      <td className="table__data">{rowData.email}</td>
      <td className={`table__row ${getStatusClassName(rowData.formStatus)}`}>
        {rowData.formStatus}
      </td>
      <td className="table__data">{rowData.requestDate}</td>
      {rowData.formStatus === 'PENDING' ? (
        <td className="table__data">
          <div className="table__btn">
            <Button
              size="small"
              label="승인"
              color="success"
              radius="oval"
              type="button"
              onClick={approveForm}
            />
            <Button
              size="small"
              label="거절"
              color="danger"
              radius="oval"
              type="button"
              onClick={denyForm}
            />
          </div>
        </td>
      ) : (
        <td className="table__data">{rowData.approvedAt}</td>
      )}
    </tr>
  );
};

export default UserReqRow;
