import React, { useEffect, useState } from 'react';
import Text from 'components/atoms/text/Text';
import PageButton from 'components/molecules/button/PageButton';
import Table from 'components/organisms/table/Table';
import UserReqRow from 'components/molecules/table/UserReqRow';
import { getUserFormList } from 'services/user';
import Company from 'types/Company';
import RequestPageButtons from 'components/molecules/button/RequestPageButtons';
import './UserRequests.scss';

interface Form {
  formId: number;
  company: Company;
  ownerName: string;
  email: string;
  formStatus: string;
  requestDate: string;
  approvedAt: string;
}
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
  const [content, setContent] = useState<Form[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    getUserFormList(
      pageNumber,
      ({ data }) => {
        console.log(data.data);
        setContent(data.data.content);
        setPageCount(data.data.pageCount);
      },
      (error) => {
        console.log('에러', error);
      }
    );
  }, [pageNumber]);

  useEffect(() => {
    setPageIndex(pageNumber);
  }, [content]);

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
  content.forEach((form) => {
    const newForm = form;
    newForm.requestDate = changeDateFormat(form.requestDate);
    if (form.approvedAt) {
      newForm.approvedAt = changeDateFormat(form.approvedAt);
    }
  });
  return (
    <div className="user-req__container">
      <div className="user-req__title">
        <Text content="Service Registration Request List" type="title" />
        <Text content="서비스 등록 요청 정보" type="subtitle" />
      </div>
      <RequestPageButtons />
      <div className="user-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={content}
          pageIndex={pageIndex}
          RowComponent={UserReqRow}
        />
      </div>
      <div className="user-req__page-btn">
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

export default UserRequests;
