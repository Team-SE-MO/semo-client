import React, { useState, useEffect } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import DevicesRow from 'components/molecules/table/DevicesRow';
import PageButton from 'components/molecules/button/PageButton';
import Input from 'components/atoms/input/Input';
import SelectCompany from 'components/atoms/input/SelectCompany';
import SelectInput from 'components/molecules/select/SelectInput';
import Button from 'components/atoms/button/Button';
import './Devices.scss';

type UserRole = 'ROLE_SUPER' | 'ROLE_ADMIN' | 'ROLE_USER';
interface DeviceBase {
  deviceId: number;
  deviceAlias: string;
  type: string;
  ip: string;
  port: number;
  sid: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
interface DeviceWithCompany extends DeviceBase {
  companyName: string;
  taxId: string;
}
const Devices = () => {
  const userRole: UserRole = 'ROLE_SUPER' as UserRole;

  const headerMeta =
    userRole === 'ROLE_SUPER'
      ? [
          'No.',
          '회사명',
          'DataBase',
          'TYPE',
          'IP',
          'PORT',
          'SID',
          '연결 상태',
          '등록 일자',
          '수정 일자',
          '수정\u00a0\u00a0\u00a0|\u00a0\u00a0\u00a0삭제',
        ]
      : [
          'No.',
          'DataBase',
          'TYPE',
          'IP',
          'PORT',
          'SID',
          '연결 상태',
          '등록 일자',
          '수정 일자',
          '수정\u00a0\u00a0\u00a0|\u00a0\u00a0\u00a0삭제',
        ];

  const colWidth =
    userRole === 'ROLE_SUPER'
      ? ['7%', '15%', '7%', '7%', '7%', '7%', '7%', '5%', '10%', '10%', '13%']
      : ['7%', '7%', '7%', '7%', '7%', '7%', '5%', '10%', '10%', '13%'];

  const formContent: (DeviceBase | DeviceWithCompany)[] = [
    {
      deviceId: 1,
      companyName: 'SEMO',
      taxId: '000-00-00007',
      deviceAlias: 'LOCALHOST',
      type: 'ORACLE',
      ip: '127.0.0.1',
      port: 1521,
      sid: 'XE',
      status: true,
      createdAt: '2024-10-23 22:06:36.000',
      updatedAt: '2024-10-23 22:06:36.000',
    },
    {
      deviceId: 2,
      companyName: '(주)네모바지',
      taxId: '000-00-00002',
      deviceAlias: 'LOCALHOST',
      type: 'ORACLE',
      ip: '127.0.0.1',
      port: 1521,
      sid: 'XE',
      status: true,
      createdAt: '2024-10-23 22:06:36.000',
      updatedAt: '2024-10-23 22:06:36.000',
    },
    {
      deviceId: 3,
      companyName: '(주)네모바지',
      taxId: '000-00-00002',
      deviceAlias: 'LOCALHOST1',
      type: 'ORACLE',
      ip: '127.0.0.1',
      port: 1521,
      sid: 'XE',
      status: false,
      createdAt: '2024-10-23 22:06:36.000',
      updatedAt: '2024-10-23 22:06:36.000',
    },
  ];

  const companyList = [
    {
      id: 1,
      companyName: 'SEMO',
      taxId: '000-00-00007',
    },
    {
      id: 52,
      companyName: '(주)네모바지',
      taxId: '000-00-00002',
    },
  ];

  const pageNumber = 1;
  const pageSize = 10;
  const totalPages = 1;
  const totalElement = formContent.length;

  const changeDateFormat = (date: string) => {
    return date.replace(' ', '\n').replace('.000', '');
  };
  formContent.forEach((form) => {
    const newForm = form;
    newForm.createdAt = changeDateFormat(form.createdAt);
    newForm.updatedAt = changeDateFormat(form.updatedAt);
  });

  const [companyName, setCompanyName] = useState('');
  const [filteredContent, setFilteredContent] = useState(formContent);

  useEffect(() => {
    if (userRole === 'ROLE_SUPER') {
      const filtered = (formContent as DeviceWithCompany[]).filter((item) => {
        const normalizedCompanyName = item.companyName
          .replace(/[^\w\s]/g, '')
          .toLowerCase();
        const normalizedTaxId = item.taxId.replace(/[^0-9]/g, '');
        const normalizedInput = companyName
          .replace(/[^\w\s]/g, '')
          .toLowerCase();
        const normalizedInputTaxId = companyName.replace(/[^0-9]/g, '');

        return (
          normalizedCompanyName.includes(normalizedInput) ||
          normalizedTaxId.includes(normalizedInputTaxId)
        );
      });
      setFilteredContent(filtered);
    } else {
      setFilteredContent(formContent);
    }
  }, [companyName]);

  return (
    <div className="devices__container">
      <div className="devices__title">
        <Text content="Database Registration Information" type="title" />
        <Text content="데이터베이스 등록 정보" type="subtitle" />
      </div>
      <div className="devices__info">
        {userRole === 'ROLE_ADMIN' && (
          <div className="devices__info__register-btn">
            <Button
              size="medium"
              label="+ DB 등록"
              radius="rounded"
              shadow
              type="button"
            />
          </div>
        )}
        <div className="devices__info__row">
          {userRole === 'ROLE_SUPER' ? (
            <div className="devices__info__search">
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
            </div>
          ) : (
            <div className="devices__info__spacer" />
          )}
          <div className="devices__info__text">
            <Text
              startNumber={(pageNumber - 1) * pageSize + 1}
              endNumber={
                totalElement < pageNumber * pageSize
                  ? totalElement
                  : pageNumber * pageSize
              }
              totalItems={filteredContent.length}
              type="info"
            />
          </div>
        </div>
      </div>
      <div className="devices__table">
        <Table
          colWidth={colWidth}
          headerMeta={headerMeta}
          content={filteredContent}
          RowComponent={DevicesRow}
        />
      </div>
      <div className="devices__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Devices;
