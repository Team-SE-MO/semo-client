import React, { useEffect, useState } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import CompanyReqRow from 'components/molecules/table/CompanyReqRow';
import PageButton from 'components/molecules/button/PageButton';
import './CompanyRequests.scss';
import { getCompanyFormList } from 'services/company';

interface Form {
  formId: number;
  companyName: string;
  taxId: string;
  ownerName: string;
  email: string;
  formStatus: string;
  requestDate: string;
  approvedAt: string;
}

const CompanyRequests = () => {
  const headerMeta = [
    'No.',
    '회사명',
    '사업자 등록번호',
    '성명',
    'EMAIL',
    '상태',
    '요청 일자',
    '승인 일자',
  ];

  const colWidth = ['7%', '15%', '10%', '7%', '16%', '13%', '16%', '16%'];

  const [formContent, setFormContent] = useState<Form[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    getCompanyFormList(
      ({ data }) => {
        setFormContent(data.data.content);
        setPageNumber(data.data.pageable.pageNumber + 1);
        setTotalPages(data.data.totalPages);
      },
      (error) => {
        console.log('에러', error);
      }
    );
  }, []);

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
