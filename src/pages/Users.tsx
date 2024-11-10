import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/button/Button';
import Input from 'components/atoms/input/Input';
import Text from 'components/atoms/text/Text';
import PageButton from 'components/molecules/button/PageButton';
import UserRegister from 'components/organisms/modal/UserRegister';
import UserRow from 'components/molecules/table/UserRow';
import Table from 'components/organisms/table/Table';
import { Autocomplete, TextField } from '@mui/material';

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

  const roles = ['ROLE_ADMIN', 'ROLE_USER'];
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
  const [companyName, setCompanyName] = useState('');
  const [filteredContent, setFilteredContent] = useState(content);

  const companies =
    companyList && companyList.length > 0
      ? companyList.map((item) => {
          const temp = {
            label: `${item.companyName} (${item.taxId})`,
            ...item,
          };
          return temp;
        })
      : [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUserRegistration = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const filtered = content.filter((item) => {
      const normalizedCompanyName = item.company.companyName
        .replace(/[^\w\s]/g, '')
        .toLowerCase();
      const normalizedTaxId = item.company.taxId.replace(/[^0-9]/g, '');
      const normalizedInput = companyName.replace(/[^\w\s]/g, '').toLowerCase();
      const normalizedInputTaxId = companyName.replace(/[^0-9]/g, '');

      return (
        normalizedCompanyName.includes(normalizedInput) ||
        normalizedTaxId.includes(normalizedInputTaxId)
      );
    });
    setFilteredContent(filtered);
  }, [companyName]);

  return (
    <div className="company-req__container">
      <div className="company-req__title">
        <Text content="User Management" type="title" />
        <Text content="소속 사용자 등록 정보" type="subtitle" />
      </div>
      <div className="company-users__content">
        <div className="company-users__search">
          <Autocomplete
            disablePortal
            options={companies}
            size="small"
            sx={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
            filterOptions={(options, state) => {
              if (state.inputValue) {
                return options.filter((option) =>
                  option.label
                    .toLowerCase()
                    .includes(state.inputValue.toLowerCase())
                );
              }
              return options;
            }}
            onInputChange={(event, newInputValue) => {
              setCompanyName(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="회사명"
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            )}
          />
          <div className="company-users__checkbox">
            {roles.map((item) => (
              <div className="company-users__checkbox__item" key={item}>
                <Input
                  type="checkbox"
                  value={item}
                  onChange={(e) => checkedRoleHandler(item, e.target.checked)}
                />
                <Text content={item.replace('ROLE_', '')} type="info" />
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
          {/* TODO: api 연동후 사용자가 super일때는 hidden 처리 . admin일때는 보여줘야함 */}
          <Button
            size="medium"
            label="+ 유저 추가"
            radius="rounded"
            shadow
            type="button"
            onClick={handleUserRegistration}
          />
          <UserRegister isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
      <div className="company-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={filteredContent}
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
