import React, { useState, ChangeEvent } from 'react';
import './CompanyForm.scss';
import Text from 'components/atoms/text/Text';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompanyData {
  email: string;
  companyName: string;
  taxId: string;
  ownerName: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<CompanyData>({
    email: '',
    companyName: '',
    taxId: '',
    ownerName: '',
  });

  if (!isOpen) return null;

  const handleInputChange =
    (field: keyof CompanyData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async () => {
    // TODO : axios 인터페이스 설정 시 해당 요청 api 연결
    console.log('입력된 데이터:', formData);
    onClose();
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <div className="modal__text-group">
          <Text content="Company Registration" type="title" />
          <Text content="회사 등록" type="subtitle" />
        </div>
        <div className="modal__form">
          <Input
            type="email"
            placeholder="연락처(이메일)"
            value={formData.email}
            onChange={handleInputChange('email')}
            size="large"
            shape="line"
          />
          <Input
            type="text"
            placeholder="회사명"
            value={formData.companyName}
            onChange={handleInputChange('companyName')}
            size="large"
            shape="line"
          />
          <Input
            type="text"
            placeholder="사업자 등록번호"
            value={formData.taxId}
            onChange={handleInputChange('taxId')}
            size="large"
            shape="line"
          />
          <Input
            type="text"
            placeholder="성명"
            value={formData.ownerName}
            onChange={handleInputChange('ownerName')}
            size="large"
            shape="line"
          />
        </div>
        <div className="modal__button-group">
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

export default Modal;
