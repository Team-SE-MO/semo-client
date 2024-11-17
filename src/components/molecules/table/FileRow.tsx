import Button from 'components/atoms/button/Button';
import React from 'react';
import { downloadFile } from 'services/file';

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
  const formatFileSize = (bytes: number) => {
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  const formatDate = (dateString: string) => {
    return dateString.replace('T', ' ').split('.')[0];
  };

  const handleDownload = () => {
    downloadFile(
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
      },
      (error) => {
        console.error('파일 다운로드 실패:', error);
      },
      deviceAlias
    );
  };

  return (
    <tr className="table__row">
      <td className="table__data">{i + 1}</td>
      <td className="table__data">{content.fileName}</td>
      <td className="table__data">{formatDate(content.lastModified)}</td>
      <td className="table__data">{formatFileSize(content.fileSize)}</td>
      <td className="table__data">
        <div className="table__btn">
          <Button
            size="small"
            label="다운로드"
            color="primary"
            radius="oval"
            type="button"
            onClick={handleDownload}
          />
        </div>
      </td>
    </tr>
  );
};

export default FileRow;
