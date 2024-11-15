import React, { useEffect, useState } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import CompanyUserRow from 'components/molecules/table/CompanyUserRow';
import PageButton from 'components/molecules/button/PageButton';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import './CompanyUsers.scss';
import { getUserList } from 'services/user';
import Company from 'types/Company';
import UserRegister from 'components/organisms/modal/UserRegister';
import Swal from 'sweetalert2';

interface UserDetail {
  loginId: string;
  role: string;
  email: string;
  ownerName: string;
  deletedAt: null;
  company: Company;
}
const CompanyUsers = () => {
  const headerMeta = ['No.', '권한', 'ID', 'EMAIL', '성명', '삭제'];
  const colWidth = ['10%', '15%', '22%', '22%', '18%', '13%'];
  const userInfoStorage = localStorage.getItem('userInfoStorage');
  const userInfo = JSON.parse(userInfoStorage || '');
  const { companyId } = userInfo.state;
  const [content, setContent] = useState<UserDetail[]>([]);
  // const pageNumber = 1;
  // const pageSize = 10;
  // const totalPages = 1;
  // const totalElement = 2;

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

  useEffect(() => {
    getUserList(
      companyId,
      [...checkedRoles],
      keyword,
      ({ data }) => {
        setContent(data.data);
      },
      (error) => console.log('에러', error)
    );
  }, [checkedRoles]);

  const searchUsers = () => {
    getUserList(
      companyId,
      [...checkedRoles],
      keyword,
      ({ data }) => {
        setContent(data.data);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleUserRegistration = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
        <Button
          size="medium"
          label="+ 유저 등록"
          radius="rounded"
          shadow
          type="button"
          onClick={handleUserRegistration}
        />
        <UserRegister isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      <div className="company-req__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={content as UserDetail[]}
          RowComponent={CompanyUserRow}
        />
      </div>
      {/* TODO: 페이지 이동 기능 추가 */}
      {/* <div className="company-req__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div> */}
    </div>
  );
};

export default CompanyUsers;
