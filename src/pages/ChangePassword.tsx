import React, { useState } from 'react';
import Text from 'components/atoms/text/Text';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import './ChangePassword.scss';

const ChangePassword = () => {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [code, setCode] = useState('');

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailRegEx.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const title = '비밀번호 재설정';
  const content1 =
    '가입한 이메일을 입력해주세요.\n이메일을 통해 비밀번호 인증코드가 전송됩니다.';
  const content2 = '변경할 비밀번호를 입력해 주세요.';

  return (
    <div className="change-pwd__container">
      <Text text={title} type="title" bold />
      {step === 1 && (
        <div className="email-authentication__container">
          <Text text={content1} type="subtitle" />
          <div className="email-authentication__input">
            <div className="email-authentication__email">
              <Input
                size="medium"
                type="text"
                shape="line"
                value={email}
                placeholder="이메일을 입력해 주세요."
                onChange={emailHandler}
              />
              <Button
                size="medium"
                type="button"
                label="인증요청"
                radius="rounded"
              />
              {email && emailValid === false && (
                <div className="email-authentication__warning">
                  <Text
                    text="올바른 이메일 형식이 아닙니다."
                    type="info"
                    color="danger"
                  />
                </div>
              )}
            </div>
            <div className="email-authentication__code">
              <Input
                size="medium"
                type="text"
                shape="line"
                value={code}
                placeholder="인증 코드를 입력해 주세요."
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
              <Button
                size="medium"
                type="button"
                label="인증확인"
                radius="rounded"
              />
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="set-password__container">
          <Text text={content2} type="subtitle" />
          <form className="set-password__form">
            <div>
              <Input
                size="medium"
                type="password"
                shape="line"
                value={pwd}
                placeholder="새 비밀번호를 입력해 주세요."
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
            </div>
            <div className="set-password__confirm-pwd">
              <Input
                size="medium"
                type="password"
                shape="line"
                value={confirmPwd}
                placeholder="새 비밀번호를 입력해 주세요."
                onChange={(e) => {
                  setConfirmPwd(e.target.value);
                }}
              />
              {pwd && confirmPwd && pwd !== confirmPwd && (
                <div className="set-password__warning">
                  <Text
                    text="비밀번호가 일치하지 않습니다. 다시 입력해 주세요"
                    type="info"
                    color="danger"
                  />
                </div>
              )}
            </div>
            <Button
              size="xlarge"
              type="submit"
              label="비밀번호 변경하기"
              radius="oval"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
