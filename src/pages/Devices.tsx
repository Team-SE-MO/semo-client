import React, { useState, useEffect } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import DevicesRow from 'components/molecules/table/DevicesRow';
import PageButton from 'components/molecules/button/PageButton';
import DatabaseForm from 'components/organisms/modal/DatabaseForm';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'components/atoms/button/Button';
import './Devices.scss';

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
  const userInfoStorage = localStorage.getItem('userInfoStorage');
  const userInfo = JSON.parse(userInfoStorage || '');
  const { role } = userInfo.state;

  const headerMeta =
    role === 'ROLE_SUPER'
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
    role === 'ROLE_SUPER'
      ? ['7%', '15%', '7%', '7%', '7%', '7%', '7%', '5%', '10%', '10%', '13%']
      : ['7%', '7%', '7%', '7%', '7%', '7%', '5%', '10%', '10%', '13%'];

  const formContent: (DeviceBase | DeviceWithCompany)[] = [
    {
      deviceId: 1,
      // companyName: 'SEMO',
      // taxId: '000-00-00007',
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
      // companyName: '(주)네모바지',
      // taxId: '000-00-00002',
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
      // companyName: '(주)네모바지',
      // taxId: '000-00-00002',
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
    if (role === 'ROLE_SUPER') {
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

  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

  const handleDeviceRegistration = () => {
    setIsDeviceModalOpen(true);
  };
  const handleDeviceCloseModal = () => {
    setIsDeviceModalOpen(false);
  };

  return (
    <div className="devices__container">
      <div className="devices__title">
        <Text content="Database Registration Information" type="title" />
        <Text content="데이터베이스 등록 정보" type="subtitle" />
      </div>
      <div className="devices__info">
        {role === 'ROLE_ADMIN' && (
          <>
            <Button
              size="medium"
              label="+ DB 등록"
              radius="rounded"
              shadow
              type="button"
              onClick={handleDeviceRegistration}
            />
            <DatabaseForm
              isOpen={isDeviceModalOpen}
              onClose={handleDeviceCloseModal}
              mode="register"
            />
          </>
        )}
        <div className="devices__info__row">
          {role === 'ROLE_SUPER' ? (
            <div className="devices__info__search">
              {companies && (
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
              )}
            </div>
          ) : (
            <div className="devices__info__spacer" />
          )}
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
      {/* <div className="devices__page-btn">
        <PageButton pageNumber={pageNumber} totalPages={totalPages} />
      </div> */}
    </div>
  );
};

export default Devices;
