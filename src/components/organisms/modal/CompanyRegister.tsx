import React, { useState, ChangeEvent } from 'react';
import './CompanyRegister.scss';
import { createCompanyRequest } from 'services/company';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import Input from 'components/atoms/input/Input';
import Swal from 'sweetalert2';

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
    /^[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*@[A-Za-z0-9]+([.-]?[A-Za-z0-9]+)*.[A-Za-z]{2,}$/i;
  const taxIdRegEx = /^\d{3}-\d{2}-\d{5}$/;

  const [formData, setFormData] = useState<CompanyData>({
    email: '',
    companyName: '',
    taxId: '',
    ownerName: '',
  });

  const [emailValid, setEmailValid] = useState(false);
  const [taxIdValid, setTaxIdValid] = useState(false);

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
  const taxIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taxIdValue = e.target.value;
    const formattedValue = taxIdValue
      .replace(/[^\d-]/g, '')
      .replace(/^(\d{3})(\d{2})(\d{5})$/, '$1-$2-$3')
      .slice(0, 12);

    setFormData((prev) => ({ ...prev, taxId: formattedValue }));
    setTaxIdValid(taxIdRegEx.test(formattedValue));
  };

  const handleSubmit = async () => {
    if (
      !formData.email ||
      !formData.companyName ||
      !formData.taxId ||
      !formData.ownerName
    ) {
      Swal.fire({
        title: '알림',
        text: '모든 정보를 입력해주세요',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return;
    }
    createCompanyRequest(
      formData.email,
      formData.companyName,
      formData.taxId,
      formData.ownerName,
      (responese) => {
        Swal.fire({
          title: '알림',
          text: responese.data.message,
          icon: 'success',
          confirmButtonText: '확인',
        });
        onClose();
      },
      (error) => console.log('에러', error)
    );
  };

  return (
    <div className="company-register__background">
      <div className="company-register__container">
        <div className="company-register__header">
          <Text content="Company Registration" type="title" />
          <Text content="회사 등록" type="subtitle" />
        </div>
        <div className="company-register__form">
          <div className="company-register__form__email">
            <Input
              type="email"
              placeholder="연락처(이메일)"
              value={formData.email}
              onChange={emailHandler}
              size="large"
              shape="line"
            />
            {formData.email && !emailValid && (
              <div className="company-register__form__email__warning">
                <Text
                  content="올바른 이메일 형식이 아닙니다."
                  type="info"
                  color="danger"
                />
              </div>
            )}
          </div>
          <Input
            type="text"
            placeholder="회사명"
            value={formData.companyName}
            onChange={handleInputChange('companyName')}
            size="large"
            shape="line"
          />
          <div className="company-register__form__tax-id">
            <Input
              type="text"
              placeholder="사업자 등록번호"
              value={formData.taxId}
              onChange={taxIdHandler}
              size="large"
              shape="line"
            />
            {formData.taxId && !taxIdValid && (
              <div className="company-register__form__tax-id__warning">
                <Text
                  content="올바른 사업자 등록번호 형식이 아닙니다."
                  type="info"
                  color="danger"
                />
              </div>
            )}
          </div>
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
            disabled={!emailValid || !taxIdValid}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;
