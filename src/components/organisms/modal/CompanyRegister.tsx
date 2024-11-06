import React, { useState, ChangeEvent } from 'react';
import './CompanyRegister.scss';
import Text from 'components/atoms/text/Text';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';

interface CompanyRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompanyData {
  email: string;
  companyName: string;
  taxId: string;
  ownerName: string;
}

const CompanyRegister = ({ isOpen, onClose }: CompanyRegisterProps) => {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const [formData, setFormData] = useState<CompanyData>({
    email: '',
    companyName: '',
    taxId: '',
    ownerName: '',
  });

  const [emailValid, setEmailValid] = useState(false);

  if (!isOpen) return null;

  const handleInputChange =
    (field: keyof CompanyData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value; // 입력값을 변수에 저장
    setFormData((prev) => ({ ...prev, email: emailValue })); // formData 업데이트
    setEmailValid(emailRegEx.test(emailValue)); // 정규식 검사
  };

  const handleSubmit = async () => {
    // TODO : axios 인터페이스 설정 시 해당 요청 api 연결
    console.log('입력된 데이터:', formData);
    setFormData({
      email: '',
      companyName: '',
      taxId: '',
      ownerName: '',
    });
    onClose();
  };

  return (
    <div className="company-register__container">
      <div className="company-register__content">
        <div className="company-register__text-group">
          <Text content="Company Registration" type="title" />
          <Text content="회사 등록" type="subtitle" />
        </div>
        <div className="company-register__form">
          <Input
            type="email"
            placeholder="연락처(이메일)"
            value={formData.email}
            onChange={emailHandler} // 이메일 입력 시 정규식 검사
            size="large"
            shape="line"
          />
          {formData.email &&
            !emailValid && ( // emailValid가 false일 때 경고 메시지 출력
              <div className="company-register__email-auth__warning">
                <Text
                  content="올바른 이메일 형식이 아닙니다."
                  type="info"
                  color="danger"
                />
              </div>
            )}
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
        <div className="company-register__button-group">
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
            type="submit"
            label="COMPLETE"
            color="primary"
            radius="oval"
            shadow
            onClick={handleSubmit}
            disabled={!emailValid}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
