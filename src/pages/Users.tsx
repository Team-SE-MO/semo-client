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
import Swal from 'sweetalert2';
import UserRegister from 'components/organisms/modal/UserRegister';
import CompanyUserRow from 'components/molecules/table/CompanyUserRow';
import './Users.scss';
import useAuthStore from 'store/useAuthStore';

interface UserDetail {
  loginId: string;
  role: string;
  email: string;
  ownerName: string;
  deletedAt: null;
  company: Company;
}

const Users = () => {
  const headerMetaSuper = [
    'No.',
    '회사명',
    '권한',
    'ID',
    'EMAIL',
    '성명',
    '삭제',
  ];
  const colWidthSuper = ['7%', '18%', '10%', '18%', '18%', '18%', '13%'];
  const headerMetaAdmin = ['No.', '권한', 'ID', 'EMAIL', '성명', '삭제'];
  const colWidthAdmin = ['10%', '15%', '22%', '22%', '18%', '13%'];

  const tableContent = {
    ROLE_SUPER: {
      headerMeta: headerMetaSuper,
      colWidth: colWidthSuper,
      RowComponent: UserRow,
    },
    ROLE_ADMIN: {
      headerMeta: headerMetaAdmin,
      colWidth: colWidthAdmin,
      RowComponent: CompanyUserRow,
    },
  };
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [content, setContent] = useState<UserDetail[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);

  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    if (role === 'ROLE_SUPER') {
      getCompanies(
        '',
        ({ data }) => {
          setCompanyList(data.data);
        },
        (error) => console.log('에러', error)
      );
    }
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
    setPageNumber(1);
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

  const [companyId, setCompanyId] = useState<number | null>(
    role === 'ROLE_ADMIN' ? useAuthStore((state) => state.companyId) : null
  );

  useEffect(() => {
    getUserList(
      pageNumber,
      companyId,
      [...checkedRoles],
      keyword,
      ({ data }) => {
        setContent(data.data.content);
        setPageCount(data.data.pageCount);
      },
      (error) => console.log('에러', error)
    );
  }, [companyId, checkedRoles, pageNumber]);

  useEffect(() => {
    setPageIndex(pageNumber);
  }, [content]);

  const getPreviousPage = () => setPageNumber((prev) => prev - 1);
  const getSpecificPage = (i: number) => setPageNumber(i);
  const getNextPage = () => setPageNumber((prev) => prev + 1);

  const searchUsers = () => {
    getUserList(
      1,
      companyId,
      [...checkedRoles],
      keyword,
      ({ data }) => {
        setPageNumber(1);
        setContent(data.data.content);
        setPageCount(data.data.pageCount);
        Swal.fire({
          title: '알림',
          text: '사용자 목록 조회가 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      },
      (error) => console.log('에러', error)
    );
  };

  const handleUserDelete = (loginId: string) => {
    deleteUser(
      loginId,
      () => {
        Swal.fire({
          title: '알림',
          text: '사용자 삭제가 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
        setContent((prevContent) =>
          prevContent.filter((user) => user.loginId !== loginId)
        );
      },
      (error) => console.log('에러', error)
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUserRegistration = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="company-users__container">
      <div className="company-users__title">
        <Text content="User Management" type="title" />
        <Text content="소속 사용자 등록 정보" type="subtitle" />
      </div>
      <div className="company-users__content">
        <div className="company-users__search">
          {role === 'ROLE_SUPER' && (
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
                setCompanyId(newValue ? newValue.id : null);
                setPageNumber(1);
              }}
              renderInput={(params) => <TextField {...params} label="회사명" />}
            />
          )}
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
        {role === 'ROLE_ADMIN' && (
          <>
            <Button
              size="medium"
              label="+ 유저 등록"
              radius="rounded"
              shadow
              type="button"
              onClick={handleUserRegistration}
            />
            <UserRegister isOpen={isModalOpen} onClose={handleCloseModal} />
          </>
        )}
      </div>
      <div className="company-users__table">
        <Table
          colWidth={tableContent[role as keyof typeof tableContent].colWidth}
          headerMeta={
            tableContent[role as keyof typeof tableContent].headerMeta
          }
          content={content as UserDetail[]}
          pageIndex={pageIndex}
          RowComponent={
            tableContent[role as keyof typeof tableContent].RowComponent
          }
          onDelete={handleUserDelete}
        />
      </div>
      {/* TODO: 페이지 이동 기능 추가 */}
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

export default Users;
