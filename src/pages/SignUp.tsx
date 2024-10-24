import React, { useState } from 'react';
import Modal from 'components/organisms/modal/Modal';
import Text from '../components/atoms/text/Text';
import Input from '../components/atoms/input/Input';
import Button from '../components/atoms/button/Button';
import './SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO : 제출로직 추가
    console.log('제출된 데이터:', { email, companyName, managerName });
  };

  const title = 'Sevice Registration Request';
  const subtitle = '서비스 등록 요청하기';
  const content =
    '\n\u00a0\u00a0• 요청 정보를 작성하여 메세지를 보내시면 빠른 시일 내에 검토하여\n \u00a0\u00a0\u00a0\u00a0 작성하신 연락처(이메일)로 승인여부를 알려 드립니다.\n\n \u00a0 • 서비스를 이용하실 아이디는 작성해주신 이메일을 등록해 드릴 예정입니다.\n\n \u00a0\u00a0• 이미 SEMO 서비스를 이용하고 계신 이메일로 서비스 등록 요청을 주실 경우,\n \u00a0\u00a0\u00a0\u00a0 등록 가능의 사유가 될 수 있습니다.';

  const handleCompanyRegistration = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCompleteRegistration = (data: any) => {
    console.log('회사 등록 데이터:', data);
    setIsModalOpen(false);
  };

  return (
    <div className="signup__container">
      <div className="signup__image" />
      <div className="signup__content">
        <div className="signup__text-group">
          <Text text={title} type="title" />
          <Text text={subtitle} type="subtitle" />
          <Text type="info" text={content} />
        </div>
        <div className="signup__item-group">
          <div className="signup__input-button-group">
            <Input
              type="email"
              placeholder="연락처(이메일)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              shape="line"
            />
            <Button
              type="button"
              label="중복확인"
              size="small"
              color="primary"
            />
          </div>
          <div className="signup__input-button-group">
            <Input
              type="text"
              placeholder="회사명"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              size="large"
              shape="line"
            />
            <Button
              type="button"
              label="회사등록"
              size="small"
              color="primary"
              onClick={handleCompanyRegistration}
            />
          </div>
          <Input
            type="text"
            placeholder="관리자 성명"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            size="large"
            shape="line"
          />
          <div className="signup__submit-button">
            <Button
              type="submit"
              label="SEND MESSAGE"
              size="xlarge"
              color="primary"
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onComplete={handleCompleteRegistration}
      />
    </div>
  );
};

export default SignUp;
