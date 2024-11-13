import Button from 'components/atoms/button/Button';
import React, { useState } from 'react';
import { registerCompany, updateCompanyFormStatus } from 'services/company';
import { sendEmail } from 'services/email';

interface CompanyReqRowProps {
  i: number;
  content: {
    formId: number;
    companyName: string;
    taxId: string;
    ownerName: string;
    email: string;
    formStatus: string;
    requestDate: string;
    approvedAt: string | null;
  };
}
// TODO: 승인, 거절 누르면 rowData 상태 변경
const CompanyReqRow = ({ i, content }: CompanyReqRowProps) => {
  const [rowData, setRowData] = useState(content);
  const approveForm = () => {
    updateCompanyFormStatus(
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
        registerCompany(
          rowData.formId,
          ({ data }) => {
            sendEmail(
              'REGISTER_COMPANY',
              rowData.formId,
              () => {
                alert('승인 처리 완료');
              },
              (sendEmailError) => console.log('이메일 에러:', sendEmailError)
            );
          },
          (registerError) => console.log('등록 에러:', registerError)
        );
      },
      (updateStatusError) =>
        console.log('상태 업데이트 에러:', updateStatusError)
    );
  };

  const denyForm = () => {
    updateCompanyFormStatus(
      rowData.formId,
      'denied',
      (response) => {
        setRowData((prev) => ({
          ...prev,
          formStatus: response.data.data.formStatus,
        }));
        sendEmail(
          'FAIL_COMPANY',
          rowData.email,
          () => {
            alert('거절 처리 완료');
          },
          (sendEmailError) => console.log('이메일 에러:', sendEmailError)
        );
      },
      (updateStatusError) =>
        console.log('상태 업데이트 에러:', updateStatusError)
    );
  };
  return (
    <tr>
      <td className="table__row">{i + 1}</td>
      <td className="table__row">{rowData.companyName}</td>
      <td className="table__row">{rowData.taxId}</td>
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
        <td className="table__row">{rowData.approvedAt}</td>
      )}
    </tr>
  );
};

export default CompanyReqRow;
