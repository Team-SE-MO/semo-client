import React from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import CompanyReqRow from 'components/molecules/table/CompanyReqRow';
import './CompanyRequests.scss';
import PageButton from 'components/molecules/button/PageButton';

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

  const colWidth = ['10%', '15%', '10%', '20%', '13%', '16%', '16%'];

  const formContent = [
    {
      formId: 41,
      companyName: 'Test Form Company',
      taxId: '000-00-00007',
      ownerName: '홍길동',
      email: 'gogo7@ac.kr',
      formStatus: 'PENDING',
      requestDate: '2024-10-23 22:06:36.000',
      approvedAt: null,
    },
    {
      formId: 25,
      companyName: 'test Company3',
      taxId: '000-00-00003',
      ownerName: '황석현',
      email: 'smu_hsh@naver.com',
      formStatus: 'PENDING',
      requestDate: '2024-10-18 13:53:07.000',
      approvedAt: null,
    },
    {
      formId: 21,
      companyName: 'Test Form Company',
      taxId: '000-00-00001',
      ownerName: '홍길동',
      email: 'gogo3@ac.kr',
      formStatus: 'APPROVED',
      requestDate: '2024-10-18 11:03:21.000',
      approvedAt: '2024-10-23 22:07:46.000',
    },
    {
      formId: 3,
      companyName: 'test Company',
      taxId: '000-00-00002',
      ownerName: '홍길동',
      email: 'gogo1@ac.kr',
      formStatus: 'APPROVED',
      requestDate: '2024-10-18 01:06:20.000',
      approvedAt: '2024-10-22 13:37:49.000',
    },
    {
      formId: 1,
      companyName: '테스트회사 요청',
      taxId: '123-45-67891',
      ownerName: '김길동',
      email: 'gogo@ac.kr',
      formStatus: 'APPROVED',
      requestDate: '2024-10-17 23:33:46.000',
      approvedAt: '2024-10-22 01:17:45.000',
    },
  ];

  const pageNumber = 1;
  const totalPages = 1;

  const changeDateFormat = (date: string) => {
    return date.replace(' ', '\n').replace('.000', '');
  };
  formContent.forEach((form) => {
    const newForm = form;
    newForm.requestDate = changeDateFormat(form.requestDate);
    if (form.approvedAt) {
      newForm.approvedAt = changeDateFormat(form.approvedAt);
    }
  });

  return (
    <div className="company-req__container">
      <div className="company-req__title">
        <Text content="Service Registration Request List" type="title" />
        <Text content="서비스 등록 요청 정보" type="subtitle" />
      </div>
      <div className="company-req__info">
        <Text startNumber={1} endNumber={5} totalItems={5} type="info" />
      </div>
      <div className="company-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={formContent}
          RowComponent={CompanyReqRow}
        />
      </div>
      {/* TODO: 페이지 이동 기능 추가 */}
      <div className="company-req__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CompanyRequests;
