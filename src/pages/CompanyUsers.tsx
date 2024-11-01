import React, { useState } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import CompanyUserRow from 'components/molecules/table/CompanyUserRow';
import PageButton from 'components/molecules/button/PageButton';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import './CompanyUsers.scss';

const CompanyUsers = () => {
  const headerMeta = ['No.', '권한', 'ID', 'EMAIL', '성명', '삭제'];
  const colWidth = ['7%', '12%', '18%', '18%', '15%', '10%'];
  const content = [
    {
      role: 'ADMIN',
      id: 'U123412341201',
      email: 'gogo7@ac.kr',
      ownerName: '정다빈',
      deletedAt: null,
    },
    {
      role: 'ADMIN',
      id: 'U123412341201',
      email: 'gogo7@ac.kr',
      ownerName: '정다빈',
      deletedAt: null,
    },
  ];
  const pageNumber = 1;
  const pageSize = 10;
  const totalPages = 1;
  const totalElement = 2;

  const roles = ['ADMIN', 'USER'];
  const [checkedRoles, setCheckedRoles] = useState<Set<string>>(new Set());
  const checkedRoleHandler = (value: string, isChecked: boolean) => {
    const newCheckedItems = new Set(checkedRoles);
    if (isChecked) {
      newCheckedItems.add(value);
    } else {
      newCheckedItems.delete(value);
    }
    setCheckedRoles(newCheckedItems);
  };

  const [keyword, setKeyword] = useState('');
  return (
    <div className="company-req__container">
      <div className="company-req__title">
        <Text content="User Management" type="title" />
        <Text content="소속 사용자 등록 정보" type="subtitle" />
      </div>
      <div className="company-users__content">
        <div className="company-users__search">
          <div className="company-users__checkbox">
            {roles.map((item) => (
              <div className="company-users__checkbox__item">
                <Input
                  type="checkbox"
                  value={item}
                  onChange={(e) => checkedRoleHandler(item, e.target.checked)}
                />
                <Text content={item} type="info" />
              </div>
            ))}
          </div>
          <Input
            size="small"
            type="text"
            shape="area"
            value={keyword}
            placeholder="유저ID"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            size="medium"
            label="검색"
            radius="rounded"
            shadow
            type="button"
            // TODO: onClick event 구현
          />
        </div>
        <div className="company-users__summary">
          <div className="company-users__summary__btn">
            <Button
              size="medium"
              label="+ 유저 등록"
              radius="rounded"
              shadow
              type="button"
              // TODO: onClick event 모달 띄우기 구현
            />
          </div>
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
      </div>
      <div className="company-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={content}
          RowComponent={CompanyUserRow}
        />
      </div>
      {/* TODO: 페이지 이동 기능 추가 */}
      <div className="company-req__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CompanyUsers;
