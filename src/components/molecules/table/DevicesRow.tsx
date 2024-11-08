import React, { useState, useEffect } from 'react';
import Button from 'components/atoms/button/Button';
import { SvgIcon } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DatabaseForm from 'components/organisms/modal/DatabaseForm';
import DatabaseDelete from 'components/organisms/modal/DatabaseDelete';

interface DevicesRowProps {
  i: number;
  data: {
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

const DevicesRow = ({ i, data }: DevicesRowProps) => {
  const [rowData, setRowData] = useState(data);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeviceEdit = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeviceDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    setRowData(data);
  }, [data]);
  return (
    <tr>
      <td className="table__row">{i + 1}</td>
      {rowData.companyName && (
        <td className="table__row">
          {rowData.companyName}
          <br />({rowData.taxId})
        </td>
      )}
      <td className="table__row">{rowData.deviceAlias}</td>
      <td className="table__row">{rowData.type}</td>
      <td className="table__row">{rowData.ip}</td>
      <td className="table__row">{rowData.port}</td>
      <td className="table__row">{rowData.sid}</td>
      <td className="table__row">
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
      <td className="table__row">{rowData.createdAt}</td>
      <td className="table__row">{rowData.updatedAt}</td>
      <td className="table__row">
        <div className="table__btn">
          {/* TODO: api 연결 필요 */}
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
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />
        </div>
      </td>
    </tr>
  );
};

export default DevicesRow;
