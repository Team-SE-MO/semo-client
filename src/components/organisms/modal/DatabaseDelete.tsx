import React from 'react';
import './DatabaseDelete.scss';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import Swal from 'sweetalert2';
import { deleteDevice } from 'services/device';

interface DatabaseDeleteProps {
  deviceAlias: string;
  isOpen: boolean;
  onClose: () => void;
}

const DatabaseDelete = ({
  deviceAlias,
  isOpen,
  onClose,
}: DatabaseDeleteProps) => {
  const handleSubmit = async () => {
    if (!deviceAlias) {
      console.error('삭제할 데이터베이스 별칭이 없습니다.');
      Swal.fire({
        title: '알림',
        text: '장치 정보를 가져오지 못했습니다.\n잠시 후 다시 시도 해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
      });
      return;
    }

    await deleteDevice(
      deviceAlias,
      ({ data }) => {
        console.log(data.data);
        Swal.fire({
          title: '삭제 완료',
          text: '장치가 성공적으로 삭제되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      },
      (error) => {
        console.error('삭제 실패:', error);
        Swal.fire({
          title: '알림',
          text: '장치 정보를 가져오지 못했습니다.\n잠시 후 다시 시도 해주세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    );
    onClose();
  };

  if (!isOpen) return null;

  const title = 'Delete the Database';
  const subtitle = '데이터베이스 삭제';

  return (
    <div className="database-delete__background">
      <div className="database-delete__modal-container">
        <div className="database-delete__title">
          <Text content={title} type="title" bold />
          <Text content={subtitle} type="subtitle" />
        </div>
        <div className="database-delete__content">
          <div className="database-delete__brief">
            <Text
              content="• 데이터베이스 삭제 시, 모든 정보가 영구적으로 사라집니다."
              type="subtitle"
            />
            <Text
              content="• 이 작업은 되돌릴 수 없어 삭제된 데이터는 복구할 수 없습니다."
              type="subtitle"
            />
            <Text
              content="&nbsp;&nbsp;그래도 삭제하시겠습니까?"
              type="subtitle"
              bold
              color="danger"
            />
          </div>
          <div className="database-delete__button-group">
            <Button
              size="large"
              type="button"
              label="CANCEL"
              color="other"
              radius="oval"
              shadow
              onClick={onClose}
            />
            <Button
              size="large"
              type="button"
              label="DELETE"
              color="danger"
              radius="oval"
              shadow
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseDelete;
