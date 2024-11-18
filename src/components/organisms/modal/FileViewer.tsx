import Text from 'components/atoms/text/Text';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/esm/locale';
import React, { useEffect, useState } from 'react';
import { getCompanyFileList } from 'services/file';
import FileRow from 'components/molecules/table/FileRow';
import { format, subDays } from 'date-fns';
import { useParams } from 'react-router-dom';
import Table from '../table/Table';
import './FileViewer.scss';

interface FileData {
  key: string;
  fileName: string;
  companyId: number;
  lastModified: string;
  fileSize: number;
}

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FileViewer = ({ isOpen, onClose }: FileViewerProps) => {
  const { deviceAlias } = useParams<{ deviceAlias: string }>();

  const renderFileRow = ({
    content,
    i,
  }: {
    content: FileData | null;
    i: number;
  }) => {
    if (!content) {
      return (
        <tr>
          <td colSpan={5} className="file-viewer__message">
            해당 일자에 데이터가 없습니다.
          </td>
        </tr>
      );
    }
    return <FileRow content={content} deviceAlias={deviceAlias || ''} i={i} />;
  };

  if (!isOpen) return null;
  const headerMeta = ['No.', '파일명', '작성 일자', '파일 크기', '다운로드'];
  const colWidth = ['10%', '25%', '25%', '25%', '15%'];
  const [content, setContent] = useState<FileData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    subDays(new Date(), 1)
  );

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      getCompanyFileList(
        formattedDate,
        ({ data }) => {
          setContent(data.data || []);
        },
        (error) => {
          console.log('에러', error);
        }
      );
    }
  }, [selectedDate]);

  return (
    <div
      className="file-viewer__background"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="file-viewer__container"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="file-viewer__title">
          <Text content="File List" type="title" />
          <Text content="파일 목록" type="subtitle" />
          <div className="file-viewer__content">
            <Text content="원하시는 일자를 선택해주세요." type="info" />
            <div className="file-viewer__date-selector">
              <Text content="기준 일자" type="info" />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ko}
              >
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  format="yyyy-MM-dd"
                  slotProps={{
                    textField: {
                      size: 'small',
                      variant: 'standard',
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className="file-viewer__table">
          <Table
            colWidth={colWidth}
            headerMeta={headerMeta}
            content={content.length ? content : [null]}
            RowComponent={renderFileRow}
          />
        </div>
      </div>
    </div>
  );
};
export default FileViewer;
