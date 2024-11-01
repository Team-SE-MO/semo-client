import React, { useState } from 'react';
import Button from 'components/atoms/button/Button';
import Input from 'components/atoms/input/Input';
import SelectCompany from 'components/atoms/input/SelectCompany';
import SelectInput from 'components/molecules/select/SelectInput';
import Text from 'components/atoms/text/Text';
import PageButton from 'components/molecules/button/PageButton';
import UserRow from 'components/molecules/table/UserRow';
import Table from 'components/organisms/table/Table';

const Users = () => {
  const headerMeta = ['No.', '회사명', '권한', 'ID', 'EMAIL', '성명', '삭제'];
  const colWidth = ['7%', '18%', '10%', '18%', '18%', '18%', '13%'];
  const content = [
    {
      loginId: 'A00000000022',
      role: 'ROLE_ADMIN',
      email: 'admin2@test.com',
      ownerName: 'admin계정2',
      deletedAt: null,
      company: {
        id: 42,
        companyName: 'test Company',
        taxId: '000-00-00002',
      },
    },
    {
      loginId: 'A00000000022',
      role: 'ROLE_ADMIN',
      email: 'admin2@test.com',
      ownerName: 'admin계정2',
      deletedAt: null,
      company: {
        id: 42,
        companyName: 'test Company',
        taxId: '000-00-00002',
      },
    },
  ];
  const companyList = [
    {
      id: 43,
      companyName: 'Test Form Company',
      taxId: '000-00-00001',
    },
    {
      id: 42,
      companyName: 'test Company',
      taxId: '000-00-00002',
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
  const [companyId, setCompanyId] = useState(0);
  const [companyName, setCompanyName] = useState('');
  return (
    <div className="company-req__container">
      <div className="company-req__title">
        <Text content="User Management" type="title" />
        <Text content="소속 사용자 등록 정보" type="subtitle" />
      </div>
      <div className="company-users__content">
        <div className="company-users__search">
          <Input
            size="small"
            shape="area"
            selectItems="companyList"
            value={companyName}
            placeholder="회사명"
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
          />
          <SelectInput
            listName="companyList"
            selectList={companyList}
            SelectComponent={SelectCompany}
          />
          <div className="company-users__checkbox">
            {roles.map((item) => (
              <div className="company-users__checkbox__item" key={item}>
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
            // TODO: onClick event 구현 value에서 사업자 번호 추출해야됨
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
          RowComponent={UserRow}
        />
      </div>
      {/* TODO: 페이지 이동 기능 추가 */}
      <div className="company-req__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Users;
