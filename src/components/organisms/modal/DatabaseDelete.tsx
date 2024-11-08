import React, { useState, ChangeEvent } from 'react';
import './DatabaseDelete.scss';
import Text from 'components/atoms/text/Text';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';

interface DatabaseDeleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const DatabaseDelete = ({ isOpen, onClose }: DatabaseDeleteProps) => {
  const handleSubmit = async () => {
    // TODO : axios 인터페이스 설정 시 해당 요청 api 연결
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
