import React, { useState, ChangeEvent } from 'react';
import './UserRegister.scss';
import Text from 'components/atoms/text/Text';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
// rafc

interface UserRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  ownerName: string;
  email: string;
}

const UserRegister = ({ isOpen, onClose }: UserRegisterProps) => {
  const [formData, setFormData] = useState<UserData>({
    ownerName: '',
    email: '',
  });

  if (!isOpen) return null;

  const handleInputChange =
    (field: keyof UserData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async () => {
    // TODO: axios 인터페이스 설정 시 해당 요청 api 연결
    console.log('입력된 데이터:', formData);
    onClose();
  };

  const title = 'User Registration';
  const subtitle = '사용자 등록';
  const content = [
    '\n\u00a0 • 하위 계정을 생성합니다.',
    '\u00a0 • 생성한 계정은 모니터링 대상 장비를 등록하여 조회할 수 있습니다.',
    '\u00a0 • 협업 생산력을 키워보세요!',
  ].join('\n');

  return (
    <div className="user-register__container">
      <div className="user-register__content">
        <div className="user-register__text-group">
          <Text content={title} type="title" bold />
          <Text content={subtitle} type="subtitle" />
          <Text type="info" content={content} />
        </div>

        <div className="user-register__form">
          <div className="user-register__input-button-group">
            <Input
              type="text"
              placeholder="성명"
              value={formData.ownerName}
              onChange={handleInputChange('ownerName')}
              size="large"
              shape="line"
            />
          </div>
          <div className="user-register__input-button-group">
            <Input
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleInputChange('email')}
              size="large"
              shape="line"
            />
            <Button
              type="button"
              label="중복확인"
              size="medium"
              color="primary"
            />
          </div>
        </div>

        <div className="user-register__button-group">
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
            label="COMPLETE"
            color="primary"
            radius="oval"
            shadow
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
