import React from 'react';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import './CompanyRequests.scss';

const CompanyRequests = () => {
  const headerMeta = [
    'No.',
    '회사명',
    '성명',
    'EMAIL',
    '상태',
    '요청 일자',
    '승인 일자',
  ];

  const formContent = [
    {
      formId: 41,
      companyName: 'Test Form Company',
      taxId: '000-00-00007',
      ownerName: '홍길동',
      email: 'gogo7@ac.kr',
      formStatus: 'PENDING',
      requestDate: '2024-10-23 22:06:36',
      approvedAt: null,
    },
    {
      formId: 25,
      companyName: 'test Company3',
      taxId: '000-00-00003',
      ownerName: '황석현',
      email: 'smu_hsh@naver.com',
      formStatus: 'PENDING',
      requestDate: '2024-10-18 13:53:07',
      approvedAt: null,
    },
    {
      formId: 21,
      companyName: 'Test Form Company',
      taxId: '000-00-00001',
      ownerName: '홍길동',
      email: 'gogo3@ac.kr',
      formStatus: 'APPROVED',
      requestDate: '2024-10-18 11:03:21',
      approvedAt: '2024-10-23 22:07:46',
    },
    {
      formId: 3,
      companyName: 'test Company',
      taxId: '000-00-00002',
      ownerName: '홍길동',
      email: 'gogo1@ac.kr',
      formStatus: 'APPROVED',
      requestDate: '2024-10-18 01:06:20',
      approvedAt: '2024-10-22 13:37:49',
    },
    {
      formId: 1,
      companyName: '테스트회사 요청',
      taxId: '123-45-67891',
      ownerName: '김길동',
      email: 'gogo@ac.kr',
      formStatus: 'APPROVED',
      requestDate: '2024-10-17 23:33:46',
      approvedAt: '2024-10-22 01:17:45',
    },
  ];
  return (
    <div className="company-req__container">
      <div className="company-req__title">
        <Text content="Service Registration Request List" type="title" />
        <Text content="서비스 등록 요청 정보" type="subtitle" />
      </div>
      <div className="company-req__table">
        <table className="table">
          <thead>
            <tr>
              {headerMeta.map((item) => (
                <th className="table__head">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formContent.map((i, index) => (
              <tr className="table__row">
                <td className="table__row">{index + 1}</td>
                <td className="table__row">{i.companyName}</td>
                <td className="table__row">{i.ownerName}</td>
                <td className="table__row">{i.email}</td>
                <td className="table__row">{i.formStatus}</td>
                <td className="table__row">{i.requestDate}</td>
                {i.formStatus === 'PENDING' ? (
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
                        label="반려"
                        color="danger"
                        radius="oval"
                        type="button"
                      />
                    </div>
                  </td>
                ) : (
                  <td className="table__row">{i.approvedAt}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyRequests;
