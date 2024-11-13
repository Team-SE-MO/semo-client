import React, { useEffect, useState } from 'react';
import Text from 'components/atoms/text/Text';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import './ChangePassword.scss';
import { sendAuthCode, verifyEmail } from 'services/email';
import { updatePassword } from 'services/user';
import { useNavigate } from 'react-router-dom';

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

  const [codeSent, setCodeSent] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);

  const handleRequestAuthCode = () => {
    if (!email) {
      alert('이메일 입력 필요');
      return;
    }
    if (!emailValid) {
      alert('이메일 인증 필요');
      return;
    }
    sendAuthCode(
      email,
      () => {
        alert('이메일을 발송했습니다.');
        setCodeSent((prev) => prev + 1);
        setResetTimer((prev) => prev + 1);
      },
      (error) => {
        console.log('에러', error);
      }
    );
  };

  const handleEmailVerification = () => {
    verifyEmail(
      email,
      code,
      () => {
        setStep(2);
      },
      (verifyError) => {
        console.log('에러', verifyError);
      }
    );
  };
  const navigate = useNavigate();
  const changePassword = () => {
    if (!pwd || !confirmPwd) {
      alert('비밀번호를 입력하세요');
      return;
    }
    if (pwd && confirmPwd && pwd !== confirmPwd) {
      alert('일치하지 않습니다.');
      return;
    }
    updatePassword(
      email,
      pwd,
      () => {
        alert('성공적으로 변경했습니다.');
        navigate('/login');
      },
      (changePwdError) => console.log('비밀번호 변경 에러', changePwdError)
    );
  };
  return (
    <div className="change-pwd__container">
      <Text content={title} type="title" bold />
      {step === 1 && (
        <div className="email-authentication__container">
          <Text content={content1} type="subtitle" />
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
                onClick={handleRequestAuthCode}
              />
              {email && emailValid === false && (
                <div className="email-authentication__warning">
                  <Text
                    content="올바른 이메일 형식이 아닙니다."
                    type="info"
                    color="danger"
                  />
                </div>
              )}
            </div>
            <div
              className={`email-authentication__code ${codeSent > 0 ? 'visible' : ''}`}
            >
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
                onClick={handleEmailVerification}
              />
              <div className="email-authentication__code__timer">
                <Text
                  resetTimer={resetTimer}
                  initialTime={300}
                  type="subtitle"
                  color="danger"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="set-password__container">
          <Text content={content2} type="subtitle" />
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
                    content="비밀번호가 일치하지 않습니다. 다시 입력해 주세요"
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
              onClick={changePassword}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
