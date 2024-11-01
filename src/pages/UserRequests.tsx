import React from 'react';
import Text from 'components/atoms/text/Text';
import PageButton from 'components/molecules/button/PageButton';
import Table from 'components/organisms/table/Table';
import UserReqRow from 'components/molecules/table/UserReqRow';

const UserRequests = () => {
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
  const content = [
    {
      formId: 81,
      company: {
        id: 42,
        companyName: 'test Company',
        taxId: '000-00-00002',
      },
      ownerName: '길동',
      email: 'test7@gmail.com',
      formStatus: 'DENIED',
      requestDate: '2024-10-29 21:31:10',
      approvedAt: null,
    },
    {
      formId: 62,
      company: {
        id: 42,
        companyName: 'test Company',
        taxId: '000-00-00002',
      },
      ownerName: '홍길동',
      email: 'test2@gmail.com',
      formStatus: 'PENDING',
      requestDate: '2024-10-27 00:15:21',
      approvedAt: null,
    },
    {
      formId: 61,
      company: {
        id: 42,
        companyName: 'test Company',
        taxId: '000-00-00002',
      },
      ownerName: '홍길동',
      email: 'test1@gmail.com',
      formStatus: 'APPROVED',
      requestDate: '2024-10-27 00:14:57',
      approvedAt: '2024-10-30 18:31:01',
    },
  ];
  const pageNumber = 1;
  const pageSize = 10;
  const totalPages = 1;
  const totalElement = 3;

  const changeDateFormat = (date: string) => {
    return date.replace(' ', '\n').replace('.000', '');
  };
  content.forEach((form) => {
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
        <Text
          startNumber={(pageNumber - 1) * pageSize + 1}
          endNumber={
            totalElement < pageNumber * pageSize
              ? totalElement
              : pageNumber * pageSize
          }
          totalItems={totalElement}
          type="info"
        />
      </div>
      <div className="company-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={content}
          RowComponent={UserReqRow}
        />
      </div>
      {/* TODO: 페이지 이동 기능 추가 */}
      <div className="company-req__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default UserRequests;
