import React, { useEffect, useState } from 'react';
import Button from 'components/atoms/button/Button';
import Input from 'components/atoms/input/Input';
import Text from 'components/atoms/text/Text';
import PageButton from 'components/molecules/button/PageButton';
import UserRow from 'components/molecules/table/UserRow';
import Table from 'components/organisms/table/Table';
import { Autocomplete, TextField } from '@mui/material';
import Company from 'types/Company';
import { deleteUser, getUserList } from 'services/user';
import { getCompanies } from 'services/company';

interface UserDetail {
  loginId: string;
  role: string;
  email: string;
  ownerName: string;
  deletedAt: null;
  company: Company;
}

const Users = () => {
  const headerMeta = ['No.', '회사명', '권한', 'ID', 'EMAIL', '성명', '삭제'];
  const colWidth = ['7%', '18%', '10%', '18%', '18%', '18%', '13%'];

  const [content, setContent] = useState<UserDetail[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  useEffect(() => {
    const keyword = '';
    getCompanies(
      keyword,
      ({ data }) => {
        setCompanyList(data.data);
      },
      (error) => console.log('에러', error)
    );
    getUserList(
      null,
      [],
      null,
      ({ data }) => {
        setContent(data.data);
      },
      (error) => console.log('에러', error)
    );
  }, []);

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

  const [companyId, setCompanyId] = useState<number | null>(null);
  useEffect(() => {
    getUserList(
      companyId,
      [...checkedRoles],
      '',
      ({ data }) => {
        setContent(data.data);
      },
      (error) => console.log('에러', error)
    );
  }, [companyId, checkedRoles]);

  const searchUsers = () => {
    getUserList(
      companyId,
      [...checkedRoles],
      keyword,
      ({ data }) => {
        setContent(data.data);
      },
      (error) => console.log('에러', error)
    );
  };

  const handleUserDelete = (loginId: string) => {
    deleteUser(
      loginId,
      () => {
        alert('삭제 성공');
        setContent((prevContent) =>
          prevContent.filter((user) => user.loginId !== loginId)
        );
      },
      (error) => console.log('에러', error)
    );
  };
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
            onChange={(event, newValue) => {
              if (newValue) {
                setCompanyId(newValue.id); // 선택된 회사의 id 값을 companyId로 설정
              } else {
                setCompanyId(null); // 선택이 해제되었을 경우
              }
            }}
            renderInput={(params) => <TextField {...params} label="회사명" />}
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
            onClick={searchUsers}
          />
        </div>
      </div>
      <div className="company-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={content as UserDetail[]}
          RowComponent={UserRow}
          onDelete={handleUserDelete}
        />
      </div>
      {/* TODO: 페이지 이동 기능 추가 */}
      {/* <div className="company-req__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div> */}
    </div>
  );
};

export default Users;
