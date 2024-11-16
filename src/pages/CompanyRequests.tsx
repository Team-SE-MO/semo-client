import React, { useEffect, useState } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import CompanyReqRow from 'components/molecules/table/CompanyReqRow';
import PageButton from 'components/molecules/button/PageButton';
import { getCompanyFormList } from 'services/company';
import RequestPageButtons from 'components/molecules/button/RequestPageButtons';
import './CompanyRequests.scss';

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
  const [pageIndex, setPageIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getCompanyFormList(
      pageNumber,
      ({ data }) => {
        setFormContent(data.data.content);
        setPageCount(data.data.pageCount);
      },
      (error) => {
        console.log('에러', error);
      }
    );
  }, [pageNumber]);

  useEffect(() => {
    setPageIndex(pageNumber);
  }, [formContent]);

  const getPreviousPage = () => {
    setPageNumber((prev) => prev - 1);
  };

  const getSpecificPage = (i: number) => {
    setPageNumber(i);
  };

  const getNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

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
      <RequestPageButtons />
      <div className="company-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={formContent}
          pageIndex={pageIndex}
          RowComponent={CompanyReqRow}
        />
      </div>
      <div className="company-req__page-btn">
        <PageButton
          pageNumber={pageNumber}
          pageCount={pageCount}
          getPreviousPage={getPreviousPage}
          getSpecificPage={getSpecificPage}
          getNextPage={getNextPage}
        />
      </div>
    </div>
  );
};

export default CompanyRequests;
