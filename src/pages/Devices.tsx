import React, { useState, useEffect } from 'react';
import Text from 'components/atoms/text/Text';
import Table from 'components/organisms/table/Table';
import Company from 'types/Company';
import { getCompanies } from 'services/company';
import DevicesRow from 'components/molecules/table/DevicesRow';
import PageButton from 'components/molecules/button/PageButton';
import DatabaseForm from 'components/organisms/modal/DatabaseForm';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from 'components/atoms/button/Button';
import './Devices.scss';
import { getDeviceList } from 'services/device';

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
  const headerMetaSuper = [
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
  ];
  const colWidthSuper = [
    '7%',
    '15%',
    '7%',
    '7%',
    '7%',
    '7%',
    '7%',
    '5%',
    '10%',
    '10%',
    '13%',
  ];
  const headerMetaAdmin = [
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
  const colWidthAdmin = [
    '7%',
    '7%',
    '7%',
    '7%',
    '7%',
    '7%',
    '5%',
    '10%',
    '10%',
    '13%',
  ];

  // RowComponent 필요
  const tableContent = {
    ROLE_SUPER: {
      headerMeta: headerMetaSuper,
      colWidth: colWidthSuper,
    },
    ROLE_ADMIN: {
      headerMeta: headerMetaAdmin,
      colWidth: colWidthAdmin,
    },
  };
  const [content, setContent] = useState<(DeviceBase | DeviceWithCompany)[]>(
    []
  );
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const userInfoStorage = localStorage.getItem('userInfoStorage');
  const userInfo = JSON.parse(userInfoStorage || '');
  const { role } = userInfo.state;
  const [companyId, setCompanyId] = useState<number | null>(
    role === 'ROLE_ADMIN' ? userInfo.state.companyId : null
  );
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (role === 'ROLE_SUPER') {
      const keyword = '';
      getCompanies(
        keyword,
        ({ data }) => {
          console.log('API 데이터:', data.data); // 데이터 확인
          setCompanyList(data.data);
        },
        (error) => console.log('에러', error)
      );
    }
  }, []);

  useEffect(() => {
    getDeviceList(
      pageNumber,
      companyId,
      ({ data }) => {
        setPageCount(data.data.pageCount);
        setContent(data.data.content);
      },
      (error) => {
        console.log('에러', error);
      }
    );
  }, [pageNumber, companyId]);

  const companies =
    companyList && companyList.length > 0
      ? companyList.map((item) => ({
          label: `${item.companyName} (${item.taxId})`,
          ...item,
        }))
      : [];

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
                  onChange={(event, newValue) => {
                    setCompanyId(newValue ? newValue.id : null);
                    setPageNumber(1);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="회사명" />
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
          colWidth={tableContent[role as keyof typeof tableContent].colWidth}
          headerMeta={
            tableContent[role as keyof typeof tableContent].headerMeta
          }
          content={content}
          pageIndex={pageIndex}
          RowComponent={DevicesRow}
        />
      </div>
      <div className="devices__page-btn">
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

export default Devices;
