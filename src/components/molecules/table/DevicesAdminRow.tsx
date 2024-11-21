import React, { useState, useEffect } from 'react';
import Button from 'components/atoms/button/Button';
import { SvgIcon } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DatabaseForm from 'components/organisms/modal/DatabaseForm';
import DatabaseDelete from 'components/organisms/modal/DatabaseDelete';

interface DevicesRowProps {
  i: number;
  pageIndex?: number;
  content: {
    deviceId: number;
    companyName?: string;
    taxId?: string;
    deviceAlias: string;
    type: string;
    ip: string;
    port: number;
    sid: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

const DevicesAdminRow = ({ i, pageIndex, content }: DevicesRowProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeviceEdit = () => setIsEditModalOpen(true); // 수정 모달 열기
  const closeEditModal = () => setIsEditModalOpen(false); // 수정 모달 닫기
  const handleDeviceDelete = () => setIsDeleteModalOpen(true); // 삭제 모달 열기
  const closeDeleteModal = () => setIsDeleteModalOpen(false); // 삭제 모달 닫기

  const [rowData, setRowData] = useState(content);

  useEffect(() => {
    setRowData(content);
  }, [content]);

  const editData = {
    databaseAlias: rowData.deviceAlias,
    type: rowData.type,
    ip: rowData.ip,
    port: rowData.port,
    sid: rowData.sid,
    username: '',
    password: '',
  };

  return (
    <tr className="table__row">
      <td className="table__data">
        {pageIndex && (pageIndex - 1) * 10 + i + 1}
      </td>
      {rowData.companyName && (
        <td className="table__data">
          {rowData.companyName}
          <br />({rowData.taxId})
        </td>
      )}
      <td className="table__data">{rowData.deviceAlias}</td>
      <td className="table__data">{rowData.type}</td>
      <td className="table__data">{rowData.ip}</td>
      <td className="table__data">{rowData.port}</td>
      <td className="table__data">{rowData.sid}</td>
      <td className="table__data">
        {rowData.status ? (
          <SvgIcon
            className="devices__info--success"
            component={CheckCircleOutlineOutlinedIcon}
            inheritViewBox
          />
        ) : (
          <SvgIcon
            className="devices__info--fail"
            component={CancelOutlinedIcon}
            inheritViewBox
          />
        )}
      </td>
      <td className="table__data">
        {rowData.createdAt.replace('T', '\n').split('.')[0]}
      </td>
      <td className="table__data">
        {rowData.updatedAt.replace('T', '\n').split('.')[0]}
      </td>
      <td className="table__data">
        <div className="table__btn">
          <Button
            size="small"
            label="수정"
            color="other"
            radius="oval"
            type="button"
            onClick={handleDeviceEdit}
          />
          <DatabaseForm
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            mode="edit"
            editData={editData}
          />
          <Button
            size="small"
            label="삭제"
            color="danger"
            radius="oval"
            type="button"
            onClick={handleDeviceDelete}
          />
          <DatabaseDelete
            deviceAlias={rowData.deviceAlias}
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
        </div>
      </td>
    </tr>
  );
};

export default DevicesAdminRow;
