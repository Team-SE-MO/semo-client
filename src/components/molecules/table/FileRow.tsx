import Button from 'components/atoms/button/Button';
import DownloadIcon from '@mui/icons-material/Download';
import React, { useState } from 'react';
import { getDownloadFile } from 'services/file';
import './FileRow.scss';
import Swal from 'sweetalert2';
import Text from 'components/atoms/text/Text';

interface FileRowProps {
  i: number;
  deviceAlias: string;
  content: {
    key: string;
    fileName: string;
    companyId: number;
    lastModified: string;
    fileSize: number;
  };
}

const FileRow = ({ i, content, deviceAlias }: FileRowProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString: string) => {
    return dateString.replace('T', ' ').split('.')[0];
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    getDownloadFile(
      content.key,
      (response) => {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const downloadElement = document.createElement('a');
        downloadElement.href = url;
        downloadElement.download = content.fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(downloadElement);
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
        }, 500);
      },
      (error) => {
        Swal.fire({
          title: '알림',
          text: '파일 다운로드에 실패하였습니다',
          icon: 'warning',
          confirmButtonText: '확인',
        });
        setIsDownloading(false);
        setDownloadProgress(0);
      },
      (progress) => {
        setDownloadProgress(progress);
      },
      deviceAlias,
      content.fileSize
    );
  };

  return (
    <>
      <tr className="table__row">
        <td className="table__data">{i + 1}</td>
        <td className="table__data">{content.fileName}</td>
        <td className="table__data">{formatDate(content.lastModified)}</td>
        <td className="table__data">{formatFileSize(content.fileSize)}</td>
        <td className="table__data">
          <div className="table__btn">
            <Button
              icon={DownloadIcon}
              size="small"
              color="other"
              radius="pill"
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
            />
          </div>
        </td>
      </tr>
      {isDownloading && (
        <tr className="progress__row">
          <td colSpan={5}>
            <div className="progress__container">
              <div
                className="progress__bar"
                style={{ width: `${downloadProgress}%` }}
              />
              <div className="progress__text">
                <Text
                  content={`${downloadProgress}%`}
                  type="info"
                  color="primary"
                />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default FileRow;
