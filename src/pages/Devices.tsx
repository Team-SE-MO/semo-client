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
import Swal from 'sweetalert2';
import './Devices.scss';
import { getDeviceList } from 'services/device';
import useAuthStore from 'store/useAuthStore';
import DevicesAdminRow from 'components/molecules/table/DevicesAdminRow';

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
  // 테이블 헤더 및 열 너비 (권한별 정의)
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
  ];
  const colWidthSuper = [
    '5%',
    '15%',
    '15%',
    '10%',
    '10%',
    '7%',
    '8%',
    '10%',
    '10%',
    '10%',
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

  // 디바이스 데이터 (테이블에 표시할 내용)
  const [content, setContent] = useState<(DeviceBase | DeviceWithCompany)[]>(
    []
  );

  // 회사 목록 (ROLE_SUPER 사용 가능)
  const [companyList, setCompanyList] = useState<Company[]>([]);

  // 페이지네이션 관련 상태
  const [pageNumber, setPageNumber] = useState<number>(1); // 현재 페이지 번호
  const [pageIndex, setPageIndex] = useState(1); // 표시될 페이지 인덱스
  const [pageCount, setPageCount] = useState(1); // 총 페이지 수

  // 사용자 정보 및 권한
  const role = useAuthStore((state) => state.role);
  const [companyId, setCompanyId] = useState<number | null>(
    role === 'ROLE_ADMIN' ? useAuthStore((state) => state.companyId) : null
  );

  // 모달 상태 관리
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const reload = () => {
    setIsUpdated(true);
  };

  // 회사 목록 가져오기
  useEffect(() => {
    if (role === 'ROLE_SUPER') {
      const keyword = '';
      getCompanies(
        keyword,
        ({ data }) => {
          setCompanyList(data.data);
        },
        (error) => {
          Swal.fire({
            title: '알림',
            text: '회사 정보를 가져오지 못했습니다. 잠시 후 다시 시도 해주세요.',
            icon: 'error',
            confirmButtonText: '확인',
          });
          console.log('에러', error);
        }
      );
    }
  }, []);

  // 디바이스 목록 가져오기
  useEffect(() => {
    getDeviceList(
      pageNumber,
      companyId,
      ({ data }) => {
        setPageCount(data.data.pageCount);
        setContent(data.data.content);
        setIsUpdated(false);
      },
      (error) => {
        Swal.fire({
          title: '알림',
          text: '장치 정보를 가져오지 못했습니다.\n잠시 후 다시 시도 해주세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
        console.log('에러', error);
      }
    );
  }, [pageNumber, companyId, isUpdated]);

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

  // 목록 갱신 함수
  // const refreshDeviceList = () => {
  //   getDeviceList(
  //     pageNumber,
  //     companyId,
  //     ({ data }) => {
  //       setContent(data.data.content);
  //       setPageCount(data.data.pageCount);
  //     },
  //     (error) => {
  //       console.error('디바이스 목록 갱신 실패:', error);
  //     }
  //   );
  // };

  // 페이지네이션 함수
  const getPreviousPage = () => setPageNumber((prev) => prev - 1);
  const getSpecificPage = (i: number) => setPageNumber(i);
  const getNextPage = () => setPageNumber((prev) => prev + 1);

  // 모달 닫기
  const handleDeviceModalClose = () => setIsDeviceModalOpen(false);

  const handleDeviceRegistration = () => setIsDeviceModalOpen(true);

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
              onClose={handleDeviceModalClose}
              mode="register"
              reload={reload}
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
          RowComponent={role === 'ROLE_ADMIN' ? DevicesAdminRow : DevicesRow}
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
